const mongoose = require('mongoose');

const channelSchema = mongoose.Schema({
    name: {type: String, required: true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    server: {type: mongoose.Schema.Types.ObjectId, ref: 'Server', required: true},
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
})

/**
 * @typedef Channel
 */
const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;
