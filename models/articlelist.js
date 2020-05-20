const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleListSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  context: {
    type: String,
    required: true
  },
  imgurl: {
    type: String,
    required: true
  },
  category: {
    type: Number,
    required: true
  },
  createtime: {
    type: Date,
    required: true
  }
},{
  collection: 'ArticleList',
  versionKey: false
});

module.exports = mongoose.model('ArticleList',ArticleListSchema);

