const db = require("../models");

module.exports = {
    // this route is intended for finding users for potential friending purposes
    // returns the userId which can and should be supplied as the SECOND ID in the participatants object sent to newFriendRequest
    // via .get on /api/user/friend
    userByName: function (req, res) {
        let fullName = "" + req.user.firstName + "" + req.user.lastName + "";
        let queryArr = req.body.query.split(" ");
        if ((req.body.query.length > 0) && (req.body.query != req.user.username) && (req.body.query != fullName) && ((queryArr[0] != req.user.firstName) && (queryArr[2] != req.user.lastName))) {
            if (queryArr.length == 1) {
                let queryItem = queryArr[0];
                db.User.find({
                    $or: [
                        { username: { $regex: queryItem, $options: 'i' } },
                        { firstName: { $regex: queryItem, $options: 'i' } },
                        { lastName: { $regex: queryItem, $options: 'i' } }
                    ]
                })
                    .then(userArr => {
                        if (userArr.length > 0) {
                            return res.json(userArr)
                        } else {
                            return res.json({ message: "No users found" })
                        }
                    })
                    .catch(err => res.status(422).json(err));
            } else if (queryArr.length == 2) {
                db.User.find({
                    $or: [
                        { username: { $regex: queryArr.join(" "), $options: 'i' } },
                        { $and: [{ firstName: { $regex: queryArr[0], $options: 'i' } }, { lastName: { $regex: queryArr[1], $options: 'i' } }] }
                    ]
                })
                    .then(userArr => {
                        if (userArr.length > 0) {
                            return res.json(userArr)
                        } else {
                            return res.json({ message: "No users found" })
                        }
                    })
                    .catch(err => res.status(422).json(err));
            } else if (queryArr.length == 3) {
                db.User.find({
                    $or: [
                        { username: { $regex: queryArr.join(" "), $options: 'i' } },
                        { $and: [{ firstName: { $regex: queryArr[0], $options: 'i' } }, { lastName: { $regex: queryArr[2], $options: 'i' } }] }
                    ]
                })
                    .then(userArr => {
                        if (userArr.length > 0) {
                            return res.json(userArr)
                        } else {
                            return res.json({ message: "No users found" })
                        }
                    })
                    .catch(err => res.status(422).json(err));
            } else {
                db.User.find({ username: queryArr.join(" ") })
                    .then(userArr => {
                        if (userArr.length > 0) {
                            return res.json(userArr)
                        } else {
                            return res.json({ message: "No users found" })
                        }
                    })
                    .catch(err => res.status(422).json(err));
            }
        } else {
            res.json({ message: "No users found" });
        }
    },

    // newFriendRequest accepts an array of id's as participants!
    // The first Id should be the logged in user, the second Id should be the target of the request
    // accessed via .post on /api/user/friend
    newFriendRequest: function (req, res) {
        let participants = [req.user._id, req.body.requestTo];
        let requestTo = req.body.requestTo;
        let inverseParticipants = [req.body.requestTo, req.user._id];
        db.Friends.findOne({ $or: [{ participants: participants }, { participants: inverseParticipants }] })
            .then(result => {
                if (!result) {
                    db.Friends.create({
                        participants: participants,
                        requestTo: requestTo
                    })
                        .then(newResult => {
                            res.json(newResult);
                        })
                        .catch(err => res.status(422).json(err));
                } else {
                    res.json({
                        message: "You are already friends with that user, or have a pending request."
                    });
                }
            })
            .catch(err => res.status(422).json(err));
    },

    // handling the friend request:  This guy takes strings 'accepted' or 'rejected' as req.body.status.  A green and red button would work fine.
    // accessed via the .put on api/user/friend
    handleFriendRequest: function (req, res) {
        db.Friends.findOneAndUpdate(
            { _id: req.body.id },
            { $set: { status: req.body.status } },
            { new: true }
        )
            .then(friendReq => {
                // if the requestTo participant accepts the request
                if (friendReq.status === "accepted") {
                    let friendArr = friendReq.participants;
                    // find the accepting user A.K.A requestTo on our model
                    db.User.findById(req.user._id)
                        .then(result => {
                            // update the friends array on the User model with new friend's A.K.A initiating User's ID
                            result.friends.push(friendArr[0]);
                            result.save();
                        })
                        .catch(err => console.log(err));
                    // find the initiating User
                    db.User.findById(friendArr[0])
                        .then(result => {
                            // update the initiating User's friends array with our requestTo dudeski
                            result.friends.push(friendArr[1]);
                            result.save();
                        })
                        .catch(err => console.log(err));
                    res.json(friendReq);
                } else if (friendReq.status === "rejected") {
                    res.json(friendReq);
                }
            })
            .catch(err => res.status(422).json(err));
    },

    pendingRequest: function (req, res) {
        db.Friends.find({ requestTo: req.user._id, status: "pending" })
            .populate("participants")
            .then(results => {
                if (results) {
                    res.json(results);
                } else {
                    res.json({ message: "No pending friend requests" });
                }
            })
            .catch(err => res.status(422).json(err));
    },

    removeFriend: function (req, res) {
        db.Friends.findById({ _id: req.body.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }

}