const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const {InternalServerError} = require("../utils/Errors");
const Channel = require("../models/channel.model");
const Server = require("../models/server.model");
const Message = require("../models/message.model");
const {getPermissions} = require('./server.service');

/**
 * Creates a channel
 * @param req
 * @returns {Promise<Channel>}
 */
module.exports.createChannel = async (req) => {
    const userId = req.auth.userId;
    const data = req.body;
    const io = req.app.get('io');

    const server = await Server.findOne({_id: data.server})
    if (!server) throw new ApiError(httpStatus.NOT_FOUND, `No server with id : ${data.server}`);

    const permissions = await getPermissions(data.server, userId);
    if(!permissions?.createChannels)
        throw new ApiError(httpStatus.FORBIDDEN, `You don't have permission to create channels in this server !`)

    const channel = await Channel.create({...data, creator: userId})
    if (!channel) throw new InternalServerError()

    try {
        server.channels.push(channel._id)
        await server.save();
    } catch (e) {
        throw new InternalServerError()
    }

    io.to(`server-${server._id.toString()}`).emit('channelCreation', channel);

    return channel
};

/**
 * Get a channel
 * @param req
 * @returns {Promise<Channel>}
 */
module.exports.getChannel = async (req) => {
    const channelId = req.params.id;
    const channel = await Channel.findOne({_id: channelId})
    if (!channel) throw new ApiError(httpStatus.NOT_FOUND, `No channel with id : ${channelId}`);
    return channel;
};

/**
 * Updates a channel
 * @param req
 * @returns {Promise<Channel>}
 */
module.exports.updateChannel = async (req) => {
    const userId = req.auth.userId;
    const channelId = req.params.id;
    const io = req.app.get('io');

    let channel = await Channel.findOne({_id: channelId})
    if (!channel) throw new ApiError(httpStatus.NOT_FOUND, `No channel with id : ${channelId}`);

    const serverId = channel.server.toString();

    const permissions = await getPermissions(serverId, userId);
    if((channel.creator.toString() !== userId) && !permissions?.editChannels)
        throw new ApiError(httpStatus.FORBIDDEN, `You don't have permission to update channels in this server !`)

    channel = Object.assign(channel, req.body)
    channel = await channel.save();

    io.to(`server-${serverId}`).emit('channelUpdate', channel);

    return channel
};

/**
 * Deletes a channel
 * @param req
 * @returns {Promise<Channel>}
 */
module.exports.deleteChannel = async (req) => {
    const userId = req.auth.userId;
    const channelId = req.params.id;
    const io = req.app.get('io');

    const channel = await Channel.findOne({_id: channelId})
    if (!channel) throw new ApiError(httpStatus.NOT_FOUND, `No channel with id : ${channelId}`);

    const permissions = await getPermissions(channel.server.toString(), userId);
    if((channel.creator.toString() !== userId) && !permissions?.deleteChannels)
        throw new ApiError(httpStatus.FORBIDDEN, `You don't have permission to delete channels in this server !`)

    try{
        await Channel.deleteOne({_id: channelId});
        const server = await Server.findOneAndUpdate({channels: channelId}, {$pullAll: {channels: [channelId]}});
        const serverId = server._id.toString();

        io.to(`server-${serverId}`).emit('channelDeletion', channel);

        await Message.deleteMany({_id: {$in: channel.messages}});
    } catch (e) {
        throw new InternalServerError()
    }

    return channel;
};

/**
 * Returns all messages in channel
 * @param req
 * @returns {Promise<Channel>}
 */
module.exports.getMessages = async (req) => {
    const channelId = req.params.id;

    const channel = await Channel.findOne({_id: channelId})
    if (!channel) throw new ApiError(httpStatus.NOT_FOUND, `No channel with id : ${channelId}`);

    const messages = await Message.find({_id: {$in: channel.messages}});
    if(!messages && messages !== []) throw new InternalServerError();

    return messages;
};