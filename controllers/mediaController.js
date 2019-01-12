var db = require("../models");

module.exports = {
    // method to post new media to db and update user model with event info
    create: function(req, res){
        db.Media
        .create(req.body)
        .then(function(dbMedia){
            //push to user media array
            return db.User.findOneAndUpdate({ _id: req.params.id }, {$push: { media: dbMedia._id }}, {new: true})
        })
        .then(function(dbUserInfo){
            console.log(dbUserInfo);
            res.json(dbUserInfo);
        })
        .catch(err => res.status(422).json(err));
    },
    //method to delete media from db
    delete: function(req, res) {
        db.Media
        .findById({ _id:req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    //method to toggle media active state
    toggleActive: function(req, res) {
        db.Media
        .findById( req.params.id )
        .then(res => {
            if (res.active == true) {
                return db.Media.findOneAndUpdate({_id: req.params.id}, {$set: {active: false}}, {new: true})
            } else if (res.active == false) {
                return db.Media.findOneAndUpdate({_id: req.params.id}, {$set: {active: true}}, {new: true})
            }
        })
        .then(dbMedia => {
            console.log(dbMedia)
            res.json(dbMedia)
        })
        .catch(err => res.status(422).json(err));
    },
    toggleComplete: function(req, res) {
        db.Media.findById( req.params.id )
        .then(res => {
            if (res.completed == true) {
                return db.Media.findOneAndUpdate({_id: req.params.id}, {$set: {completed: false, active: false}}, {new: true})
            } else if (res.completed == false){
                return db.Media.findOneAndUpdate({_id: req.params.id}, {$set: {completed: true, active: false}}, {new: true})
            }

        })
        .then(dbMedia => {
            console.log(dbMedia)
            res.json(dbMedia)
        })
        .catch(err => res.status(422).json(err));
    }
}