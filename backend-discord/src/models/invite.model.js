const mongoose = require('mongoose');

const inviteSchema = mongoose.Schema({
    code: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    expiration: {type: Date, default: new Date(Date.now() + parseInt(process.env.EXPIRATION))},
    maxAge: {type: Number, default: parseInt(process.env.EXPIRATION)},
    neverExpires: {type: Boolean, default: false},
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    server: {type: mongoose.Schema.Types.ObjectId, ref: 'Server', required: true}
})

/**
 * @typedef Invite
 */
const Invite = mongoose.model('Invite', inviteSchema);

module.exports = Invite;
