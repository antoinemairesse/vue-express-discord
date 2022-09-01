const catchAsync = require("../../utils/catchAsync");
const inviteService = require("../../services/invite.service");
const httpStatus = require("http-status");

module.exports.createInvite = catchAsync(async (req, res) => {
    const invite = await inviteService.createInvite(req);
    res.status(httpStatus.CREATED).send(invite);
});

module.exports.getInvite = catchAsync(async (req, res) => {
    const invite = await inviteService.getInvite(req);
    res.status(httpStatus.OK).send(invite);
});

module.exports.acceptInvite = catchAsync(async (req, res) => {
    const server = await inviteService.acceptInvite(req);
    res.status(httpStatus.OK).send(server);
});