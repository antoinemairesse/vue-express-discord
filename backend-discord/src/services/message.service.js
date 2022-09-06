const User =  require("../models/user.model");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const {InternalServerError} = require("../utils/Errors");
const Channel = require("../models/channel.model");
const Message = require("../models/message.model");
const {getPermissions} = require('./server.service');
const getImageUrl = require("../utils/getImageUrl");
/**
 * Creates a message
 * @param req
 * @returns {Promise<Message>}
 */
module.exports.createMessage = async (req) => {
    const userId = req.auth.userId;
    const data = req.body;
    const io = req.app.get('io');

    if (!req.file && (typeof data.content !== "string" || data.content.length < 1))
        throw new ApiError(httpStatus.NOT_FOUND, `No channel with id : ${data.channel}`);

    if(req.file) data.attachment = await getImageUrl(req, [200, 200, {fit: 'inside'}]);

    const channel = await Channel.findOne({_id: data.channel})
    if (!channel) throw new ApiError(httpStatus.NOT_FOUND, `No channel with id : ${data.channel}`);

    const message = await Message.create({...data, sender: userId})
    if (!message) throw new InternalServerError()

    try {
        channel.messages.push(message._id)
        await channel.save();
    } catch (e) {
        throw new InternalServerError()
    }

    io.to(`channel-${channel._id.toString()}`).emit('messageSent', message);

    return message
};

/**
 * Get a message
 * @param req
 * @returns {Promise<Message>}
 */
module.exports.getMessage = async (req) => {
    const messageId = req.params.id;
    const message = await Message.findOne({_id: messageId})
    if (!message) throw new ApiError(httpStatus.NOT_FOUND, `No message with id : ${messageId}`);
    return message;
};

/**
 * Updates a message
 * @param req
 * @returns {Promise<Message>}
 */
module.exports.updateMessage = async (req) => {
    const userId = req.auth.userId;
    const messageId = req.params.id;
    const io = req.app.get('io');

    let message = await Message.findOne({_id: messageId})
    if (!message) throw new ApiError(httpStatus.NOT_FOUND, `No message with id : ${messageId}`);

    const channel = await Channel.findOne({_id: message.channel})
    if (!channel) throw new ApiError(httpStatus.NOT_FOUND, `No channel with id : ${message.channel}`);

    if((message.sender.toString() !== userId))
        throw new ApiError(httpStatus.FORBIDDEN, `Only the sender of the message can update the message !`)

    message = Object.assign(message, req.body)
    message.updatedAt = Date.now();

    try{
        message = await message.save();
        io.to(`channel-${message.channel.toString()}`).emit('messageUpdate', message);
    } catch (e) {throw new InternalServerError()}

    return message;
};

/**
 * Deletes a message
 * @param req
 * @returns {Promise<Message>}
 */
module.exports.deleteMessage = async (req) => {
    const userId = req.auth.userId;
    const messageId = req.params.id;
    const io = req.app.get('io');

    const message = await Message.findOne({_id: messageId})
    if (!message) throw new ApiError(httpStatus.NOT_FOUND, `No message with id : ${messageId}`);

    const channel = await Channel.findOne({_id: message.channel})
    if (!channel) throw new ApiError(httpStatus.NOT_FOUND, `No channel with id : ${message.channel}`);

    const permissions = await getPermissions(channel.server, userId);
    if((message.sender.toString() !== userId) && !permissions?.deleteMessages)
        throw new ApiError(httpStatus.FORBIDDEN, `You don't have permission to delete messages in this server !`)

    try{
        await Message.deleteOne({_id: messageId});
        await Channel.updateMany({messages: messageId}, {$pullAll: {messages: [messageId]}});
    } catch (e) {throw new InternalServerError()}

    io.to(`channel-${message.channel.toString()}`).emit('messageDeletion', message);

    return message;
};
