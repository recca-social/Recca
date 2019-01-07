const mongoose = require('mongoose');
const User = require('../models/user');


var connStr = 'mongodb://localhost:27017/recco';
mongoose.connect(connStr, function (err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

var newUser = new User ({
    username: "testGuy1",
    password: "testGuy1"
});

//should save successfully (only on first run)
newUser.save(function(err){
    if(err) throw err;
    return console.log("user saved")
})


var sameUser = new User ({
    username: "testGuy1",
    password: "testGuy1"
})
//should fail dude to duplicate username.
sameUser.save(function(err){
    if(err) throw err;
   return console.log("user saved")
})
