curl -X POST http://localhost:3000/api/book/list \
-H 'Content-Type: application/json' \
-d '{"username":"liyao","password":"123456"}' \
--cookie "test=s%3AJe5-FM0yg5xdL0wjLneIDLurMow36IcX.peR7T6rKwV2jAkjj8%2BZAUUYwkZksc5fRgznovGD78w0; Path=/; Expires=Fri, 26 Jan 2018 06:29:29 GMT; HttpOnly" \
-v




curl -X POST http://localhost:3000/api/user/login \
-H 'Content-Type: application/json' \
-d '{"username":"zwn","password":"123456"}' \
-v

curl -X POST http://localhost:3000/api/book/list \
-H 'Content-Type: application/json' \
--cookie "test=s%3APkqmNLsdAA3gHSlmOkv3g0KwFVMymopY.VfoKrOaVh9woPaX0sfpH4ndb6WBVUsgCajraRud1U4Y; Path=/; Expires=Fri, 26 Jan 2018 08:05:32 GMT; HttpOnly" \
-v



