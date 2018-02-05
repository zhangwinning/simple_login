
![lib/passport.js](../pictures/all.png)

## node-express | 实现登录验证和授权

账号登录验证和权限设置，可以说是任何一个系统都必须具备的基本功能，而方式是从最传统的账号密码登录，到社交账号绑定不等。

1、登录验证(Authentication)

先要考虑登录有什么用?

最基本的目的是为了让系统在很多人中认得你，你上次来干什么了，做到哪一步了，一句话概括是:记得之前的你。

另外的目的是为了不让其他人冒充你。概括为:确保真的是你。

以上两个目的的实现需要两个中间件处理。

[会话(session) ---> 记得之前的你](https://github.com/WenNingZhang/simple_login/blob/master/md/session.md)

[Passport ---> 确保真的是你](https://github.com/WenNingZhang/simple_login/blob/master/md/passport.md)

2、授权（Authorization）

登录验证是为了验证你的身份，有机会进入系统的大门。而授权是为了确定做的操作，都是被允许的，你有被赋予权限。系统需要知道你是普通用户，还是论坛坛主，又或者是整个系统的管理员。

[Authorization](https://github.com/WenNingZhang/simple_login/blob/master/md/Authorization.md)

运行部署:

1、数据库用户名、密码、数据库名都是`test`，clone下来后要先建立一个数据库，或者修改连接数据库。

2、npm install	//安装依赖

3、npm start 	//启动项目

:pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: 感觉不错，star一下，谢谢啦! :pray: :pray: :pray::pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: :pray: