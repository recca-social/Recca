var db = require("../models");

module.exports = {
    // method to post new media to db and update user model with event info
    create: function(req, res){
        db.User.findOne({ _id: req.user._id })
        .populate("media")
        .then(function(dbUser){
            return dbUser;
        })
        .then(function(userInfo){
            for (let i = 0; i < userInfo.media.length; i++){
                if (userInfo.media[i].apiId === req.body.apiId){
                    return{message: "Duplicate media entry"}
                }
            }
            return req.body
        })
        .then(function(returnItem){
            if(!returnItem.message){
                db.Media.create(req.body)
                .then(function(dbMedia){
                    return db.User.findOneAndUpdate({ _id: req.user._id }, {$push: { media: dbMedia._id }}, {new: true})
                })
                .then(function(dbUserInfo){
                    return dbUserInfo;
                })
                .catch(err => res.status(422).json(err));
            } else {
                return returnItem
            }
            
        })
        .then(function(finalReturn){
            console.log(finalReturn)
            res.json(finalReturn)
        })
        
        
    },
    //method to delete media from db
    delete: function(req, res) {
        db.Media
        .findById({ _id: req.params.id })
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
                return db.Media.findOneAndUpdate({_id: req.params.id}, {$set: {complete: false, active: true}}, {new: true})
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
            if (res.complete == true) {
                return db.Media.findOneAndUpdate({_id: req.params.id}, {$set: {complete: false, active: false}}, {new: true})
            } else if (res.complete == false) {
                return db.Media.findOneAndUpdate({_id: req.params.id}, {$set: {complete: true, active: false}}, {new: true})
            }

        })
        .then(dbMedia => {
            console.log(dbMedia)
            res.json(dbMedia)
        })
        .catch(err => res.status(422).json(err));
    }
}