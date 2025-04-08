const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    
    
     email: {type: String, required: true, unique: true},
     password: {type: String, required: true},
     role: { type: String, enum: ["user", "admin"], default: 'user' },
     userName: {type: String, required: true},
     gender: { type: String, enum: ["male", "female", "others"], required: true}

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);