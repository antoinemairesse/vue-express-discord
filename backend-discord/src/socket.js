const socketio = require("socket.io");
const app = require("./app");

module.exports = (server) => {
    const io = socketio(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    }, '');

    app.set('io', io);
    const online = [];

    io.on('connection', async (socket) => {

        socket.on('online', (userId) => {
            socket.data.userId = userId;
            online.push(userId)
            io.emit('status', online)
            socket.join(`user-${userId}`)
        })

        socket.on('typing', ({serverId, channelId}) => {
            socket.broadcast.to(`server-${serverId}`).emit('typing', {userId: socket.data.userId, channelId});
        })

        socket.on('stopTyping', ({serverId, channelId}) => {
            socket.broadcast.to(`server-${serverId}`).emit('stopTyping', {userId: socket.data.userId, channelId});
        })

        socket.on('disconnect', () => {
            const index = online.indexOf(socket.data.userId)
            if (index > -1) online.splice(index, 1)
            io.emit('status', online)
        })

        socket.on('selectServer', (serverId) => {
            socket.join(`server-${serverId}`)
        })

        socket.on('selectChannel', (channelId) => {
            socket.join(`channel-${channelId}`)
        })

        socket.on('serverUpdate', (serverId) => {
            socket.join(`server-${serverId}-update`)
        })
    })
}