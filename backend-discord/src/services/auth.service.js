const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const {InternalServerError} = require("../utils/Errors");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");

/**
 * Creates a user
 * @param req
 * @returns {Promise<User>}
 */
module.exports.signup = async (req) => {
    const data = req.body;
    const hash = await bcrypt.hash(data.password, 10);
    if(!hash) throw new InternalServerError();
    return User.create({...data, password: hash});
};

/**
 * Login user
 * @param req
 * @returns {Promise<Object>}
 */
module.exports.login = async (req) => {
    const data = req.body;

    const user = await User.findOne({email: data.email});
    if(!user) throw new ApiError(httpStatus.UNAUTHORIZED, 'Wrong login/password pair');

    const valid = await bcrypt.compare(data.password, user.password);
    if(!valid) throw new ApiError(httpStatus.UNAUTHORIZED, 'Wrong login/password pair');

    const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN},
    );

    return {user, token};
};

/**
 * Returns authenticated user
 * @param req
 * @returns {Promise<User>}
 */
module.exports.getAuthUser = async (req) => {
    const userId = req.auth.userId;

    const user = await User.findOne({_id: userId})
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, `No user with id : ${userId}`);

    return user
};