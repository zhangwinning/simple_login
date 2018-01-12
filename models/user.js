const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    role: String
}, {
    versionKey: false
});

UserSchema.statics.userList = function (cb) {
    User.find().exec(function (err, users) {
        if (err) return cb(err);
        return cb(null, users);
    });
}

UserSchema.statics.userSave = function (user, cb) {
    var saveUser = new User(user);
    saveUser.save(user, function (err, doc) {
        if (err) return cb(err);
        return cb(null, doc);
    });
}

var User = mongoose.model('user', UserSchema);

module.exports = User;