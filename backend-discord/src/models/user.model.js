const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    photoURL: {type: String},
    servers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
    }],
})


/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
