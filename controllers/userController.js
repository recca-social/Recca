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
        var postsArray = [];
        for (let i = 0; i < friendsArray.length; i++) {
          postsArray.push(...friendsArray[i].posts);
        }
        var postObjReturn = [];
        for (let i = 0; i < postsArray.length; i++) {
          db.Post.findById({ _id: postsArray[i] }).then(function (postReturn) {
            postObjReturn.push(postReturn);
            if (postsArray.length == postObjReturn.length) {
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
