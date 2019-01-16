const db = require("../models");

module.exports = {
    //method for creating new users
    create: function (req, res) {
        db.User
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    //method for finding user and populating media, recommendations, and friends
    findUser: function (req, res) {
        db.User
            .findById({ _id: req.session.userId })
            .populate("media")
            .populate("recommendations")
            .populate("friends")
            .then(function (user) {
                res.json(user)

            })
            .catch(err => res.status(422).json(err));
    },

    // this route is intended for finding users for potential friending purposes
    // returns the userId which can and should be supplied as the SECOND ID in the participatants object sent to newFriendRequest
    // via .get on /api/user/friend
    userByUserName: function(req, res){
        db.User.findOne({username: req.body.username})
        .then(user =>  res.json(user._id))
        .catch(err => res.status(422).json(err))
    },

    // newFriendRequest accepts an array of id's as participants!  
    // The first Id should be the logged in user, the second Id should be the target of the request
    // accessed via .post on /api/user/friend
    newFriendRequest: function (req, res) {
        let participants = req.body.participants;
        let requestTo = req.body.participants[1];
        db.Friends.findOne({ participants: participants }).then(result => {
            if (!result) {
                db.Friends.create({
                    participants: participants,
                    requestTo: requestTo
                }).then(newResult => {
                    res.json({ message: "Friend Request Created" })
                }).catch(err => res.status(422).json(err));
            } else {
                res.json({ message: "Hey, this person all ready got a friend request from you!" })
            }
        }
        ).catch(err => res.status(422).json(err))

    },

    // handling the friend request:  This guy takes strings 'accepted' or 'rejected' as req.body.status.  A green and red button would work fine.
    // accessed via the .put on api/user/friend
    handleFriendRequest: function (req, res) {
        db.Friends.findOneAndUpdate({ 'requestTo': req.session.userId }, { $set: { 'status': req.body.status } })
            .then(friendReq => {
                // if the requestTo participant accepts the request
                if (friendReq.status === 'accepted') {
                    let friendArr = friendReq.participants
                    // find the accepting user A.K.A requestTo on our model
                    db.User.findById(req.session.userId)
                        .then(result => {
                            // update the friends array on the User model with new friend's A.K.A initiating User's ID
                            result.friends.push(friendArr[0]);
                            result.save(console.log('saved the requestTo friends array'));
                        })
                        .catch(err => console.log(err));
                    // find the initiating User
                    db.User.findById(friendArr[0])
                        .then(result => {
                            // update the initiating User's friends array with our requestTo dudeski
                            result.friends.push(friendArr[1]);
                            result.save(console.log("saved the initiator's friends array"))
                        })
                        .catch(err => console.log(err))
                    res.json({ message: friendArr[0] + " and " + friendArr[1] + " are now friends." })
                } else {
                    res.json({ message: friendArr[0] + " and " + friendArr[1] + " are definitely not friends." })
                }
            })
            .catch(err => res.status(422).json(err));
    },

    getFeed: function(req, res){
        db.User
        .findById({ _id: req.session.userId })
        .populate("friends")
        .populate("media")
        .populate("posts")
        .then(function(dbUser){
            res.json(dbUser)
        })
    },

    getFeedItems: function(req, res){
        db.User
        .findById({ _id: req.session.userId })
        .populate("friends")
        .then(function(dbUser){
            var friendsArray = dbUser.friends
            var postsArray = [];
            for (let i = 0; i < friendsArray.length; i++){
                postsArray.push(...friendsArray[i].posts)
            }
            var postObjReturn = [];
            for (let i = 0; i < postsArray.length; i++){
                db.Post
                .findById({ _id: postsArray[i]})
                .then(function(postReturn){
                    postObjReturn.push(postReturn)
                    if (postsArray.length == postObjReturn.length){
                        postObjReturn.sort(function (a, b) {
                            return b.created_at - a.created_at;
                          });
                        res.json(postObjReturn)
                    }
                })

            }
        })
    }

    // todo: add in a delete friend request route in case of accidental rejections.


}