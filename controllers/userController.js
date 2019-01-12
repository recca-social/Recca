const db = require("../models");

module.exports = {
    //method for creating new users
    create: function(req, res){
        db.User
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    
    //method for finding user and populating media, recommendations, and friends
    findUser: function(req, res){
        db.User
        .findById({ _id: req.session.userId })
        .populate("media")
        .populate("friends")
        .then(function(user){
            res.json(user)
        })
        .catch(err => res.status(422).json(err));
    },

    //method for adding friend to user friend array
    addFriend: function(req, res){
        db.User
        .findById({ _id: req.body.id })
        .then(function(dbFriend){
            console.log(dbFriend)
            return db.User.findOneAndUpdate({ _id: req.session.userId }, {$push: { friends: dbFriend._id }})
        })
        .then(function(dbFriend){
            console.log(dbFriend);
            res.json(dbFriend);
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
    }
}