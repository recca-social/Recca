const mongoose = require('mongoose');
const User = require('../models/user');

var connStr = 'mongodb://localhost:27017/userEncryption-test';
mongoose.connect(connStr, function (err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});


// fetch user and test password verification
User.findOne({ username: 'hairball' }, function (err, user) {
    if (err) throw err;

    // test a matching password
    user.comparePassword('testword1111', function (err, isMatch) {
        if (err) throw err;
        console.log('testword1111', isMatch);
    });

    // test a failing password
    user.comparePassword('123Password', function (err, isMatch) {
        if (err) throw err;
        console.log('123Password:', isMatch); // -> 123Password: false
    });
});
