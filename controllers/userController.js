const db = require("../models");

module.exports = {
  //method for creating new users
  create: function (req, res) {
    db.User.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err));
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
      .catch(err => console.log(err));
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
        if (postTotal === 0){
          res.json({message: "No posts to display, add more friends from the top right icon!"})
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
      })
      .catch(err => console.log(err));;
  },

  getFeed: function (req, res) {
    db.User.findById({ _id: req.user._id })
      .populate("friends")
      .populate("media")
      .populate("posts")
      .then(function (dbUser) {
        res.json(dbUser);
      })
      .catch(err => console.log(err));
  }
};
