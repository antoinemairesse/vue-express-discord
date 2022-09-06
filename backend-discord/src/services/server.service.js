const Server = require("../models/server.model");
const User = require("../models/user.model");
const Channel = require("../models/channel.model");
const Message = require("../models/message.model");
const Invites = require("../models/invite.model");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const {InternalServerError} = require("../utils/Errors");
const defaultRoles = require("../roles-default.json");
const Role = require("../models/role.model");
const getImageUrl = require("../utils/getImageUrl")

const populateOptions = [
    {path: 'users', model: 'User'},
    {path: 'members', populate: {path: 'role', model: 'Role'}},
    {path: 'members', populate: {path: 'member', model: 'User'}}
]

/**
 * Creates a server
 * @param req
 * @returns {Promise<Server>}
 */
module.exports.createServer = async (req) => {
    const userId = req.auth.userId;
    const data = req.body;

    if(req.file) data.photoURL = await getImageUrl(req, [150, 150, {fit: 'inside'}]);

    const user = await User.findOne({_id: userId})
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, `No user with id : ${userId}`);


    const server = await Server.create({
        ...data,
        creator: userId,
        users: [userId]
    });

    if (!server) throw new InternalServerError();
    try {
        const adminRole = await Role.create({...defaultRoles[0], server: server._id});
        const userRole = await Role.create({...defaultRoles[1], server: server._id});

        server.defaultRole = userRole._id;
        server.members.push({
            member: userId,
            role: adminRole._id
        })

        await server.save();

        user.servers.push(server._id);
        await user.save();
    } catch (e) {
        throw new InternalServerError()
    }

    return Server.findOne({_id: server._id}).populate(populateOptions)
};

/**
 * Get a server
 * @param req
 * @returns {Promise<Server>}
 */
module.exports.getServer = async (req) => {
    const serverId = req.params.id;
    const server = await Server.findOne({_id: serverId}).populate(populateOptions)
    if (!server) throw new ApiError(httpStatus.NOT_FOUND, `No server with id : ${serverId}`);
    return server;
};

/**
 * Updates a server
 * @param req
 * @returns {Promise<Server>}
 */
module.exports.updateServer = async (req) => {
    const userId = req.auth.userId;
    const serverId = req.params.id;
    const data = req.body;
    const io = req.app.get('io');

    const permissions = await getPermissions(serverId, userId);
    if(!permissions?.editServer) throw new ApiError(httpStatus.FORBIDDEN, `You don't have permission to update this server !`)

    let server = await Server.findOne({_id: serverId}).populate(populateOptions)
    if (!server) throw new ApiError(httpStatus.NOT_FOUND, `No server with id : ${serverId}`);

    if(req.file) data.photoURL = await getImageUrl(req, [150, 150, {fit: 'inside'}]);

    server = Object.assign(server, data)

    io.to(`server-${serverId}-update`).emit('serverUpdate', server);

    return server.save();
};

/**
 * Deletes a server
 * @param req
 * @returns {Promise<Server>}
 */
module.exports.deleteServer = async (req) => {
    const userId = req.auth.userId;
    const serverId = req.params.id;
    const io = req.app.get('io');

    const permissions = await getPermissions(serverId, userId);
    if(!permissions?.deleteServer) throw new ApiError(httpStatus.FORBIDDEN, `You don't have permission to delete this server !`)

    const server = await Server.findOneAndDelete({_id: serverId}).populate(populateOptions)

    if (!server) throw new ApiError(httpStatus.NOT_FOUND, `No server with id : ${serverId}`);

    const channelIds = server.channels.map(channel => {return channel._id});
    let messageIds = [];

    server.channels.forEach(channel => {
        messageIds = messageIds.concat(channel.messages);
    })

    try {
        await User.updateMany({servers: serverId}, {$pullAll: {servers: [serverId]}});
        await Invites.deleteMany({server: serverId});
        await Role.deleteMany({server: serverId});
        await Channel.deleteMany({_id: {$in: channelIds}});
        await Message.deleteMany({_id: {$in: messageIds}});
    } catch (e) {
        throw new InternalServerError()
    }

    io.to(`server-${serverId}-update`).emit('serverDeletion', server);

    return server;
};

/**
 * Makes a user leave a server
 */
module.exports.leaveServer = async (userId, serverId, io) => {

    const server = await Server.findOne({_id: serverId}).populate(populateOptions)

    if (!server) throw new ApiError(httpStatus.NOT_FOUND, `No server with id : ${serverId}`);
    if (server.creator.equals(userId)) throw new ApiError(httpStatus.BAD_REQUEST, `You can't leave server ${serverId} as the creator`);

    try {
        await removeUserFromServer(server, userId, io);
    } catch (e) {
        throw new InternalServerError()
    }

    return server;
}

/**
 * Returns all channels in server
 * @param req
 * @returns {Promise<Channel[]>}
 */
module.exports.getServerChannels = async (req) => {
    const serverId = req.params.id;

    const server = await Server.findOne({_id: serverId})
    if (!server) throw new ApiError(httpStatus.NOT_FOUND, `No server with id : ${serverId}`);

    const channels = await Channel.find({_id: {$in: server.channels}});
    if (!channels && channels !== []) throw new InternalServerError();

    return channels;
}

module.exports.getUserServers = async (req) => {
    const userId = req.auth.userId;

    const user = await User.findOne({_id: userId});
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, `No user with id : ${userId}`);

    return Server.find({_id: {$in: user.servers}}).populate(populateOptions)
}

/**
 * Creates a role
 * @param req
 * @returns {Promise<Server>}
 */
module.exports.createRole = async (req) => {
    const serverId = req.params.id;
    const {name, color, permissions} = req.body;

    const server = await Server.findOne({_id: serverId}).populate(populateOptions)
    if (!server) throw new ApiError(httpStatus.NOT_FOUND, `No server with id : ${serverId}`);

    try {
        const role = await Role.create({name, color, permissions, server: server._id})
        server.roles.push(role._id)
        await server.save();
    } catch (e) {throw new InternalServerError()}

    return server
}

/**
 * Kick user from server
 */
module.exports.kickUser = async (userId, serverId, io) => {
    const server = await Server.findOne({_id: serverId}).populate(populateOptions)

    const permissions = await getPermissions(serverId, userId);
    if(!permissions?.kickUser) throw new ApiError(httpStatus.FORBIDDEN, `You don't have permission to kick users in this server !`)

    if (!server) throw new ApiError(httpStatus.NOT_FOUND, `No server with id : ${serverId}`);
    if (server.creator.equals(userId)) throw new ApiError(httpStatus.BAD_REQUEST, `You can't kick the server creator`);

    try {
        await removeUserFromServer(server, userId, io);
        io.to(`user-${userId}`).emit('kick', serverId);
    } catch (e) {
        throw new InternalServerError()
    }

    return server;
}

/**
 * Ban user from server
 */
module.exports.banUser = async (userId, serverId, io) => {
    const server = await Server.findOne({_id: serverId}).populate(populateOptions)

    const permissions = await getPermissions(serverId, userId);
    if(!permissions?.banUser) throw new ApiError(httpStatus.FORBIDDEN, `You don't have permission to ban users in this server !`)

    if (!server) throw new ApiError(httpStatus.NOT_FOUND, `No server with id : ${serverId}`);

    try{
        server.bans.push(userId);
        await server.save();
        await removeUserFromServer(server, userId, io);
        io.to(`user-${userId}`).emit('kick', serverId);
    } catch (e) {
        throw new InternalServerError()
    }

    return server;
}

const removeUserFromServer = async (server, userId, io) => {
    server.members = server.members.filter(a => {
        return a.member?._id.toString() !== userId
    })
    await server.save();
    const user = await User.findOneAndUpdate({_id: userId}, {$pull: {servers: server._id}});
    io.to(`server-${server._id}-update`).emit('serverLeave', {user, server: server});
    return user;
}

module.exports.isUserBanned = async (serverId, userId) => {
    const user = await User.findOne({_id: userId})
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, `No user with id : ${userId}`);

    const server = await Server.findOne({_id: serverId})
    if (!server) throw new ApiError(httpStatus.NOT_FOUND, `No server with id : ${serverId}`);

    return server.bans.includes(userId);
}

const getPermissions = async (serverId, userId) => {
    const server = await Server.findOne({_id: serverId}).populate(populateOptions)
    if (!server) throw new ApiError(httpStatus.NOT_FOUND, `No server with id : ${serverId}`);

    const user = server.members.find(user => {
        return user.member._id.toString() === userId
    })
    return user?.role?.permissions;
}

module.exports.getPermissions = getPermissions;