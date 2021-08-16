const mongoose = require('mongoose');

// import Schema from mongoose
const Schema = mongoose.Schema;

// Create new UserSchema
const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than two characters.',
    },
    required: [true, 'Name is required.'],
  },
  postCount: Number,
});

// Create User model using UserSchema
// 'user' is the name of the collection
// User represents the entire collection of 'user's
const User = mongoose.model('user', UserSchema);

module.exports = User;
