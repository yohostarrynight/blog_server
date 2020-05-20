const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileListSchema = new Schema({
  name: {
    type: String,
    required: true
  }
},{
  collection: 'FileList',
  versionKey: false
});

module.exports = mongoose.model('FileList',FileListSchema);

