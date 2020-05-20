const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserListSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },    
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
},{
  collection: 'UserList',
  versionKey: false
});

module.exports = mongoose.model('UserList',UserListSchema);

