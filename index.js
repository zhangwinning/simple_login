"use strict"

module.exports = createApplication;

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const log4js = require('log4js');
const logger = log4js.getLogger('app');
const http   = require('http');
const path = require('path');

function createApplication(config, userModel, bookModel) {

    require('./lib/connect')(config);   //连接数据库

    var app = express();
    
    var server = http.createServer(app);

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(express.static(path.join(__dirname, 'public')));

    app.use(bodyParser.urlencoded({ extended: false})); 
    app.use(bodyParser.json());
 
    let sessionStore = require('./lib/sessionStore')(config);   //设置`session`信息存储位置

    app.use(session({
        secret: config.sessionName,
        name: config.sessionName,
        resave: false, 
        saveUninitialized: false, 
        cookie: {
            maxAge: 14 * 24 * 60 * 60 * 1000, // 单位毫秒
        },
        store: sessionStore
    }));

    var Passport = require('./lib/passport')(userModel);
    app.use(Passport.initialize());
    app.use(Passport.session());

    //重写listen方法，在启动前，增加默认路由
    app.listen = function () {
        require('./api')(app, logger, Passport, userModel, bookModel); 
        return server.listen.apply(server, arguments);
    };
    return app;
}


