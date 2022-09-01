const catchAsync = require("../../utils/catchAsync");
const authService = require("../../services/auth.service");
const httpStatus = require("http-status");

module.exports.signup = catchAsync(async (req, res) => {
    const user = await authService.signup(req);
    res.status(httpStatus.CREATED).send(user);
});

module.exports.login = catchAsync(async (req, res) => {
    const data = await authService.login(req);
    const expiration =  new Date(Date.now() + parseInt(process.env.EXPIRATION));
    res
        .status(httpStatus.OK)
        .cookie('token', data.token, {httpOnly: true, expires: expiration})
        .json(data)
});

module.exports.logout = catchAsync(async (req, res) => {
    res
        .status(httpStatus.OK)
        .cookie('token', null, {httpOnly: true, expires: new Date(0)})
        .json({})
});

module.exports.getAuthUser = catchAsync(async (req, res) => {
    const user = await authService.getAuthUser(req);
    res.status(httpStatus.OK).send(user);
});