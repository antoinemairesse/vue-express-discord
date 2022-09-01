const catchAsync = require("../../utils/catchAsync");
const messageService = require("../../services/message.service");
const httpStatus = require("http-status");

module.exports.createMessage = catchAsync(async (req, res) => {
    const message = await messageService.createMessage(req);
    res.status(httpStatus.CREATED).send(message);
});

module.exports.getMessage = catchAsync(async (req, res) => {
    const message = await messageService.getMessage(req);
    res.status(httpStatus.OK).send(message);
});

module.exports.updateMessage = catchAsync(async (req, res) => {
    const message = await messageService.updateMessage(req);
    res.status(httpStatus.OK).send(message);
});

module.exports.deleteMessage = catchAsync(async (req, res) => {
    const message = await messageService.deleteMessage(req);
    res.status(httpStatus.OK).send(message);
});
