const mongoose = require('mongoose');

const serverSchema = mongoose.Schema({
    name: {type: String, required: true},
    photoURL: {type: String},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    defaultRole: {type: mongoose.Schema.Types.ObjectId, ref: 'Role'},
    channels: [{type: mongoose.Schema.Types.ObjectId, ref: 'Channel'}],
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    bans: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    members: [{
        member: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        role: {type: mongoose.Schema.Types.ObjectId, ref: 'Role'},
    }],
})

/**
 * @typedef Server
 */
const Server = mongoose.model('Server', serverSchema);

module.exports = Server;
