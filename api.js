"use strict";

module.exports = function (app, logger, passport, userModel, bookModel) {
    
    app.get("/", function(req, res) {
        return res.render('index');
    });

    var login = function (req, res, next) {
        //以下`passport.authenticate`是一个中间件函数，因此要让他自执行
        passport.authenticate('local', function(err, user, message) {
            if(user) {
                req.login(user, function(err){
                    if (err) {
                        return res.status(500).json(err);
                    }
                    return res.render('loginSuccess', {user : user});
                });
            }else {
                return res.render(message);
            }
        })(req, res, next);
    };

    var requireRole = function(role) {
        return function(req, res, next) {
            if (req.user && req.user.role === role) {
                next();
            } else {
                res.status(403).send("你的权限不足显示图书列表");
            }            
        }
    }

    app.post("/api/user/login", login);
    app.get("/api/user/login", function(req, res) {
        return res.render('login');
    });

    app.get("/api/user/register", function(req, res) {
        return res.render('register');
    });
    app.get("/api/user/logout",  function(req, res) {
        req.logout();
        return res.render('index');
    });

    app.post("/api/book/list", requireRole("student"), function(req, res) {
        let user = req.user;
        bookModel.find({user: user['_id']}).then(function(books){
            res.send(books);
        });
    });

}