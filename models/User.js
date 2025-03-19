const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    pincode: { type: String, required: true }
});


const User = mongoose.model('User', userSchema, "users"); 

module.exports = User;
