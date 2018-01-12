const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var BookSchema = new Schema({
    name: String,   //书名
    user: { type: ObjectId, ref: 'User'},
}, {
    versionKey: false
});

var Book = mongoose.model('book', BookSchema);
module.exports = Book;