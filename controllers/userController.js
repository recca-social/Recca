const db = require("../models");

module.exports = {
  //method for creating new users
  create: function (req, res) {
    db.User.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //method for finding user and populating media, recommendations, and friends
  findUser: function (req, res) {
    db.User.findById({ _id: req.user._id })
      .populate("media")
      .populate("recommendations")
      .populate("friends")
      .then(function (user) {
        res.json(user);
      })
      .catch(err => res.status(422).json(err));
  },



  getFeedItems: function (req, res) {
    db.User.findById({ _id: req.user._id })
      .populate("friends")
      .then(function (dbUser) {
        var friendsArray = dbUser.friends;
        var postTotal = 0;
        for (let i = 0; i < friendsArray.length; i++) {
          postTotal += friendsArray[i].posts.length
        }
        var postObjReturn = [];
        for (let i = 0; i < friendsArray.length; i++) {
          db.User.findById({ _id: friendsArray[i]._id })
          .populate("posts")
          .then(function (friendReturn) {
            for (let a = 0; a < friendReturn.posts.length; a++){
              postObjReturn.push(friendReturn.posts[a]);
            }
            if (postTotal === postObjReturn.length) {
              postObjReturn.sort(function (a, b) {
                return b.created_at - a.created_at;
              });
              res.json(postObjReturn);
            }
          });
        }
      });
  },

  getFeed: function (req, res) {
    db.User.findById({ _id: req.user._id })
      .populate("friends")
      .populate("media")
      .populate("posts")
      .then(function (dbUser) {
        res.json(dbUser);
      });
  },


};
