var db = require("../models");

module.exports = {
    create: function(req, res){
        db.Post
        .create(req.body)
        .then(function(dbPost){
            return db.User.findOneAndUpdate({ _id: req.params.id }, {$push: { posts: dbPost._id }}, {new: true})
        })
        .then(function(dbUserInfo){
            console.log(dbUserInfo);
            res.json(dbUserInfo);
        })
        .catch(err => res.status(422).json(err));
    }
}