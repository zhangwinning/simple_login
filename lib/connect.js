let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//连接数据库逻辑
module.exports = function (config) {
	mongoose.connect(config.db, {useMongoClient: true})
	.then(() =>  console.log('connection succesful'))
	.catch((err) => console.log(err));
}