const catchAsync = require("../../utils/catchAsync");
const userService = require("../../services/user.service");
const httpStatus = require("http-status");

module.exports.getAllUsersInArray = catchAsync(async (req, res) => {
    const users = await userService.getAllUsersInArray(req);
    res.status(httpStatus.OK).send(users);
});

module.exports.getUser = catchAsync(async (req, res) => {
    const user = await userService.getUser(req);
    res.status(httpStatus.OK).send(user);
})

module.exports.updateUser = catchAsync(async (req, res) => {
    const user = await userService.updateUser(req);
    res.status(httpStatus.OK).send(user);
})