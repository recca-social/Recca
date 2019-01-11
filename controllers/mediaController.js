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
            if (res.data.active) {
                db.Media.findByIdAndUpdate(req.params.id, {active: false})
            } else {
                db.Media.findByIdAndUpdate(req.params.id, {active: true})
            }
        })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
}