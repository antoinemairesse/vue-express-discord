const catchAsync = require("../../utils/catchAsync");
const serverService = require("../../services/server.service");
const httpStatus = require("http-status");

module.exports.createServer = catchAsync(async (req, res) => {
    const server = await serverService.createServer(req);
    res.status(httpStatus.CREATED).send(server);
});

module.exports.getServer = catchAsync(async (req, res) => {
    const server = await serverService.getServer(req);
    res.status(httpStatus.OK).send(server);
});

module.exports.updateServer = catchAsync(async (req, res) => {
    const server = await serverService.updateServer(req);
    res.status(httpStatus.OK).send(server);
});

module.exports.deleteServer = catchAsync(async (req, res) => {
    const server = await serverService.deleteServer(req);
    res.status(httpStatus.OK).send(server);
});

module.exports.joinServer = catchAsync(async (req, res) => {
    const server = await serverService.joinServer(req);
    res.status(httpStatus.OK).send(server);
});

module.exports.leaveServer = catchAsync(async (req, res) => {
    const userId = req.auth.userId;
    const serverId = req.params.id;
    const io = req.app.get('io');

    const server = await serverService.leaveServer(userId, serverId, io);
    res.status(httpStatus.OK).send(server);
});

module.exports.getServerChannels = catchAsync(async (req, res) => {
    const server = await serverService.getServerChannels(req);
    res.status(httpStatus.OK).send(server);
});

module.exports.getUserServers = catchAsync(async (req, res) => {
    const servers = await serverService.getUserServers(req);
    res.status(httpStatus.OK).send(servers);
})

module.exports.createRole = catchAsync(async (req, res) => {
    const server = await serverService.createRole(req);
    res.status(httpStatus.CREATED).send(server);
})

module.exports.kickUser = catchAsync(async (req, res) => {
    const userId = req.body.userId;
    const serverId = req.params.id;
    const io = req.app.get('io');

    const server = await serverService.kickUser(userId, serverId, io);
    res.status(httpStatus.OK).send(server);
})

module.exports.banUser = catchAsync(async (req, res) => {
    const userId = req.body.userId;
    const serverId = req.params.id;
    const io = req.app.get('io');

    const server = await serverService.banUser(userId, serverId, io);
    res.status(httpStatus.OK).send(server);
})

module.exports.isUserBanned = catchAsync(async (req, res) => {
    const userId = req.params.userId;
    const serverId = req.params.serverId;

    const isUserBanned = await serverService.isUserBanned(serverId, userId);
    res.status(httpStatus.OK).send({isUserBanned});
})
