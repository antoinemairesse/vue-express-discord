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

        socket.on('online', (user) => {
            socket.data.user = user;
            online.push(user._id)
            io.emit('status', online)
            socket.join(`user-${user._id}`)
        })

        socket.on('typing', ({serverId, channelId}) => {
            socket.broadcast.to(`server-${serverId}`).emit('typing', {user: socket.data.user, channelId});
        })

        socket.on('stopTyping', ({serverId, channelId}) => {
            socket.broadcast.to(`server-${serverId}`).emit('stopTyping', {user: socket.data.user, channelId});
        })

        socket.on('disconnect', () => {
            const index = online.indexOf(socket.data.user?._id)
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