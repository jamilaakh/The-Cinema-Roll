const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String,
     required: true
     },
  email: {
     type: String,
      required: true,
      unique: true
     },
  password_hash: {
     type: String,
      required: true 
    },
  created_at: {
     type: Date, 
     default: Date.now 
    },
  updated_at: {
     type: Date,
      default: Date.now 
    },
    
});
userSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});


module.exports = mongoose.model('User', userSchema);
