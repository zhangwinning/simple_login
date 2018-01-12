"use strict";

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;


module.exports = function (userModel) {
    //定义本地策略
    passport.use('local', new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        }, function (username, password, done) {
            //通过`user`模型查询用户
            userModel.findOne({username: username})
            .then((user) => {
                if (!user) {
                    return done(null, false, { message: 'Invalid user'});
                }
                if (user.password !== password) {
                    return done(null, false, { message: 'Invalid password'});
                }
                done(null, user);
            })
            .catch(err => {
                done(null, false, { message: err});
            })
        }
    ));

    passport.serializeUser(function (user, done) { //保存user对象
        done(null, user['_id']); //可以通过数据库方式操作
    });

    passport.deserializeUser(function (userId, done) { 
        userModel.findOne({'_id': userId}).then( (user) => {
             done(null, user); //可以通过数据库方式操作
        });
    });
    return passport;
}