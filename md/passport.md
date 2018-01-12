## passprot

passport的作用主要是两个:
1、实现用户登录验证逻辑。

2、调用`passport.serializeUser`，把session信息保存到数据库中。

### 实现用户登录逻辑

1、定义策略

![lib/passport.js](../pictures/passport1.png)

定义`local`策略，其中`username`和`password`是通过`app.use(bodyParser.json())`和

`app.use(bodyParser.urlencoded({ extended: false }))`

这个两个中间件解析到`req.body`上,而passport会直接从`req.body`上获取参数。

请求头中属性`contentType:application/json`,在`app.use(bodyParser.json());`处理后，会把解析的值添加到`req.body`。
当请求头中属性为`Content-Type: application/x-www-form-urlencoded`,在`app.use(bodyParser.urlencoded({ extended: false }));`
处理后，也会把解析的值添加到`req.body`。

2、策略初始化，加入到应用中

![index.js](../pictures/passport2.png)

3、根据登录api，路由到相应的策略进行调用

![api.js](../pictures/passport3.png)