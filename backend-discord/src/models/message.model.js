const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    content: {type: String},
    channel: {type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: null},
    attachment: {type: String}
})

/**
 * @typedef Message
 */
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
