const User =  require("../models/user.model");
const {InternalServerError} = require("../utils/Errors");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const getImageUrl = require("../utils/getImageUrl")

/**
 * Returns all users with id in array
 * @param req
 * @returns {Promise<User[]>}
 */
module.exports.getAllUsersInArray = async (req) => {
    const data = req.body;

    const users = await User.find({_id: {$in: data.users}})
    if (!users && users !== []) throw new InternalServerError()

    return users
};

/**
 * Get user
 * @param req
 * @returns {Promise<User>}
 */
module.exports.getUser = async (req) => {
    const userId = req.params.id;

    const user = await User.findOne({_id: userId})
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, `No user with id : ${userId}`);

    return user
};

/**
 * Updates a user
 */
module.exports.updateUser = async (req) => {
    const userId = req.auth.userId;
    const data = req.body;
    const io = req.app.get('io');

    let user = await User.findOne({_id: userId})
        .populate({path: 'servers', model: 'Server', populate: {path: 'users', model: 'User'}})
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, `No user with id : ${userId}`);

    const userIds = [];

    user.servers.forEach(server => {
        server.users.forEach(user => {
            if(!userIds.includes(user._id)) userIds.push(user._id);
        })
    })

    if(req.file) data.photoURL = await getImageUrl(req);

    user = Object.assign(user, data)

    userIds.forEach(userId => {
        io.to(`user-${userId.toString()}`).emit('userUpdate', user);
    })

    return user.save();
};

