const mongoose = require('mongoose');
const {roles}= require('../config/role.enum');

const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    fullName: {
        type: String, 
    },
    avatar: {
        type: String, 
        default: ''
    },
    roles: {
        type: [
          {
            type: String,
            enum: roles,
          },
        ],
        default: [roles.USER],
        required: true,
      }
},
    {timestamps: true}
);
module.exports = mongoose.model('User', UserSchema);
