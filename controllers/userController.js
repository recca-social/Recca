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
        .findById({ _id: req.params.id })
        .populate("media")
        .populate("recommendations")
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
            return db.User.findOneAndUpdate({ _id: req.params.id }, {$push: { friends: dbFriend._id }})
        })
        .then(function(dbFriend){
            console.log(dbFriend);
            res.json(dbFriend);
        })
        .catch(err => res.status(422).json(err));
    }
}