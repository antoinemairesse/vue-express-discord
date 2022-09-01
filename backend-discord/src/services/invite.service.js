const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const {InternalServerError} = require("../utils/Errors");
const Server = require("../models/server.model");
const Invite = require("../models/invite.model");
const {nanoid} = require("nanoid");
const User = require("../models/user.model");
const Role = require("../models/role.model");

/**
 * Creates an invite
 * @param req
 * @returns {Promise<Invite>}
 */
module.exports.createInvite = async (req) => {
    const userId = req.auth.userId;
    const data = req.body;
    const maxAge = data.maxAge || parseInt(process.env.EXPIRATION);
    const expiration = new Date(Date.now() + maxAge);

    const server = await Server.findOne({_id: data.server})
    if (!server) throw new ApiError(httpStatus.NOT_FOUND, `No server with id : ${data.server}`);

    if(!server.members.some(e => e.member.toString() === userId))
        throw new ApiError(httpStatus.BAD_REQUEST, `You need to be a member of the server in order to invite people to it !`);

    if(data.neverExpires){
        const invite = await Invite.findOne({sender: userId, server: server._id, neverExpires: true})
        if(invite) return invite;
    }
    else{
        const invite = await Invite.findOne({
            sender: userId,
            server: server._id,
            maxAge,
            expiration: { $gte: Date.now() + (maxAge/2) },
            neverExpires: false
        })
        if(invite) return invite;
    }

    const code = nanoid(parseInt(process.env.NANOID_LENGTH));

    const invite = await Invite.create({...data, sender: userId, code, expiration})
    if (!invite) throw new InternalServerError()

    return invite
};

/**
 * Gets an invite (with code, not id)
 * @param req
 * @returns {Promise<Invite>}
 */
module.exports.getInvite = async (req) => {
    const code = req.params.code;

    const invite = await Invite.findOne({code})
    if (!invite) throw new ApiError(httpStatus.NOT_FOUND, `No invite with code : ${code}`);

    if(invite.expiration < new Date()) throw new ApiError(httpStatus.GONE, `Invite is expired !`);

    return invite
}

/**
 * Accept invite (make user join server)
 * @param req
 * @returns {Promise<Server>}
 */
module.exports.acceptInvite = async (req) => {
    const userId = req.auth.userId;
    const code = req.body.code;
    const io = req.app.get('io');

    const invite = await Invite.findOne({code})
    if (!invite) throw new ApiError(httpStatus.NOT_FOUND, `No invite with code : ${code}`);

    if(invite.expiration < new Date()) throw new ApiError(httpStatus.GONE, `Invite is expired !`);

    const serverId = invite.server;

    const server = await Server.findOne({_id: serverId});
    if (!server) throw new ApiError(httpStatus.NOT_FOUND, `No server with id : ${serverId}`);

    if(server.bans.includes(userId)) throw new ApiError(httpStatus.FORBIDDEN, `You are banned from this server !`);


    try {
        if(!server.members.some(e => e.member.toString() === userId)){
            server.members.push({
                member: userId,
                role: server.defaultRole
            })
            if(!server.users.includes(userId)) server.users.push(userId);
            await server.save();
            const user = await User.findOneAndUpdate({_id: userId}, {$addToSet: {servers: serverId}});
            user._doc.role = await Role.findOne({_id: server.defaultRole});
            io.to(`server-${serverId}`).emit('serverJoin', {user, serverId});
        }
    } catch (e) {
        throw new InternalServerError()
    }

    return server;
}