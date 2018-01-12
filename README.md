请求到来后，初始化`controller`和鉴权方式


问题1 为什么在测试用例中使用


```
var request = require('supertest');

var agent = request.agent(app);
```

这里的`supertest`是以app应用为函数进行的，实际上app应有是一个express实例



1、把连接数据库的逻辑独立出来，便于设置连接的`options`





node--登录验证和授权
账号登录验证和权限设置，可以说是任何一个系统都必须具备的基本功能，而方式是从最传统的账号密码登录，到社交账号
绑定不等。

1、登录验证(Authentication)

先要考虑登录有什么用?
最基本的目的是为了让系统在很多人中认得你，你上次来干什么了，做到哪一步了，一句话概括是:记得之前的的。
另外的目的是为了不让其他人冒充你。概括为:确保真的是你。

会话(session) ---> 记得之前的你。

Passport	 ----> 确保真的是你。

Passport的实现逻辑是
1、定义策略
2、策略初始化，加入到应用中
3、根据登录api，路由到相应的策略进行调用

https://nodejust.com/nodejs-passport-auth-tutorial/

会话(session) ---> 记得之前的你。
把session会话保存到数据库可以使得多次登录。

session中间件的目的是

curl -X POST http://localhost:3000/api/user/login \
-H 'Content-Type: application/json' \
-d '{"username":"zwn","password":"123456"}' \
-v


detail sessions
```
    Store = require('connect-mongo')(session);
    sessionStore = new Store({
        url: config.db,
        collection: 'sessions'
    });
    app.use(session({
        secret: config.sessionName,
        name: config.sessionName,
        resave: false, //  you can safely set resave: false , if store implements the touch method
        saveUninitialized: false, //Choosing false is useful for implementing login sessions, reducing server storage usage, or complying with laws that require permission before setting a cookie.
        cookie: {
            maxAge: 14 * 24 * 60 * 60 * 1000, // see below,单位毫秒
        },
        store: sessionStore
    }));
```
把session数据保存到mongodb数据库中,其中先new一个存储集合，集合名称是`sessions`,然后通过`session`中间件的store设置保存到数据库中。


http://toon.io/understanding-passportjs-authentication-flow/

这里简要说一个是在什么地方保存到数据库中的。
1、当一个用户提交`登录`表单,根据路由调用到`passport.authenticate`中间件,因为中间件是一个函数，因此需要设置函数自执行。
2、授权中间件根据之前的配置的本地策略,调用实现的本地策略。
3、Passport从req.body.username and req.body.password获取用户名和密码,执行验证函数,具体在本地策略中实现。
4、现在我们做的事情是:根据用户名在数据库中查找用户，查完之后，匹配密码是否正确
5、如果没问题的话，触发done(null, user)函数，
6、调用done(null, user)函数会调用`passport.authenticate`的回调，
7、在回调函数中调用`req.login`(这是一个中间件函数,绑定到请求函数中)
8、在`req.login`中调用`passport.serializeUser`序列化用户保存到`mongodb`数据库中


for deserializeUser
1、passport.initialize中间件对于每次请求都会触发,目的是确定session包含一个`passport.user`对象，尽管可能是空的。
2、如果序列化的用户在服务器端的数据库存在，`passport.session`中间件可以把数据库中的user这个对象获取赋值给`req.user`。而`passport.session`也会在每次请求时触发。
3、`passport.deserializeUser`这个函数由`passport.session`触发。在每次请求中可以加载`user`信息，然后把`user`对象`attach`到req.user.

http://toon.io/understanding-passportjs-authentication-flow/
注意:
1、`Local Strategy`仅仅被在特定路由上使用`passport.authenticate `被触发。
2、而仅仅`passport.serializeUser`函数被执行后,用户信息才会被存储到`sessions`中。


请求头中属性`contentType:application/json`,在`app.use(bodyParser.json());`处理后，会把解析的值添加到`req.body`。
当请求头中属性为`Content-Type: application/x-www-form-urlencoded`,在`app.use(bodyParser.urlencoded({ extended: false }));`
处理后，也会把解析的值添加到`req.body`。


请求完成之后，得到cookie值,为下面的`cookie`属性，然后下次请求后，在`curl`中通过`--cookie`属性加上次获取的cookie值，

curl -X POST http://localhost:3000/api/user/login \
-H 'Content-Type: application/json' \
-d '{"username":"zwn","password":"123456"}' \
-v
```
*   Trying ::1...
* Connected to localhost (::1) port 3000 (#0)
> POST /api/book/list HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.43.0
> Accept: */*
> Cookie: test=s%3AZL9tJenpSSIayb0niCnYR7v8L9PhOEC0.oYZzD7rzLnxl5iLtrwPlXMJexxTDIlPxjiy6vuSlagA; Path=/; Expires=Fri, 26 Jan 2018 02:45:11 GMT; HttpOnly
> Content-Type: application/json
> Content-Length: 38
>
```

curl -X POST http://localhost:3000/api/book/list \
-H 'Content-Type: application/json' \
-d '{"username":"zwn","password":"123456"}' \
--cookie "test=s%3AJe5-FM0yg5xdL0wjLneIDLurMow36IcX.peR7T6rKwV2jAkjj8%2BZAUUYwkZksc5fRgznovGD78w0; Path=/; Expires=Fri, 26 Jan 2018 06:29:29 GMT; HttpOnly" \
-v

因为配置的路由是
```
   app.post("/api/book/list", function(req, res) {
        console.log(req.user);
        //todo
    });
```
打印出来的用户信息是以下信息，所以session用户信息已经保存到`req.user`这个属性上面。
```
{ _id: '5a5423ab926460a399fdebe3',
  username: 'zwn',
  password: '123456' }
```







授权(Authorization)
登录验证是为了验证你的身份，有机会进入系统的大门。而授权是为了确定做的操作，都是被允许的，你有被赋予权限。系统

需要知道你是普通用户，还是论坛坛主，又或者是整个系统的管理员。

本实例中的体现是`授权(Authorization)`是在以下这个路由
```
    app.post("/api/book/list", requireRole("student"), function(req, res) {
        let user = req.user;
        bookModel.find({user: user['_id']}).then(function(books){
            res.send(books);
        });
    });
```

requireRole()函数实现如下:

```
    var requireRole = function(role) {
    return function(req, res, next) {
        if (req.session.user && req.session.user.role === role) {
            console.log(req.session.user);
            next();
        } else {
            res.status(403).send("你的权限不足显示图书列表");
        }            
    }
}

```

从而确定路由`/api/book/list`只符合角色为`student`
如果角色为`worker`访问进来，返回状态码是403和`你的权限不足显示图书列表`。








