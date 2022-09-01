const catchAsync = require("../../utils/catchAsync");
const channelService = require("../../services/channel.service");
const httpStatus = require("http-status");

module.exports.createChannel = catchAsync(async (req, res) => {
    const channel = await channelService.createChannel(req);
    res.status(httpStatus.CREATED).send(channel);
});

module.exports.getChannel = catchAsync(async (req, res) => {
    const channel = await channelService.getChannel(req);
    res.status(httpStatus.OK).send(channel);
});

module.exports.updateChannel = catchAsync(async (req, res) => {
    const channel = await channelService.updateChannel(req);
    res.status(httpStatus.OK).send(channel);
});

module.exports.deleteChannel = catchAsync(async (req, res) => {
    const channel = await channelService.deleteChannel(req);
    res.status(httpStatus.OK).send(channel);
});

module.exports.getMessages = catchAsync(async (req, res) => {
    const messages = await channelService.getMessages(req);
    res.status(httpStatus.OK).send(messages);
});
