## 授权(Authorization)

登录验证是为了验证你的身份，有机会进入系统的大门。而授权是为了确定做的操作，都是被允许的，你有被赋予权限。系统

需要知道你是普通用户，还是论坛坛主，又或者是整个系统的管理员。

本实例中`授权(Authorization)`体现在以下这个路由
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

确定路由`/api/book/list`只符合角色为`student`

如果角色为`worker`访问进来，返回状态码是403和`你的权限不足显示图书列表`信息。