import { createStore } from "vuex";
import socket from "../socket";
import auth from "./auth/index";
import channel from "./channel/index";
import message from "./message/index";
import server from "./server/index";
import user from "./user/index";

function createWebSocketPlugin(socket) {
  return (store) => {
    store.$socket = socket;
    socket.on("serverUpdate", (server) =>
      store.dispatch("server/updateServer", server),
    );
    socket.on("serverDeletion", (server) =>
      store.dispatch("server/deleteServer", server?._id),
    );
    socket.on("serverJoin", (data) => store.dispatch("user/addUser", data));
    socket.on("serverLeave", (data) => store.dispatch("user/removeUser", data));

    socket.on("typing", (data) =>
      store.dispatch("channel/addTypingUser", data),
    );
    socket.on("stopTyping", (data) =>
      store.dispatch("channel/removeTypingUser", data),
    );

    socket.on("kick", (serverId) => {
      store.dispatch("server/deleteServer", serverId);
      // reload to remove user from the websockets rooms of the server from which he was kicked
      window.location.replace("/");
    });

    socket.on("userUpdate", (user) => store.dispatch("user/updateUser", user));

    socket.on("channelCreation", (channel) =>
      store.dispatch("channel/addChannel", channel),
    );
    socket.on("channelUpdate", (channel) =>
      store.dispatch("channel/updateChannel", channel),
    );
    socket.on("channelDeletion", (channel) =>
      store.dispatch("channel/deleteChannel", channel),
    );

    socket.on("messageSent", (message) =>
      store.dispatch("message/addMessage", message),
    );
    socket.on("messageUpdate", (message) =>
      store.dispatch("message/updateMessage", message),
    );
    socket.on("messageDeletion", (message) =>
      store.dispatch("message/deleteMessage", message),
    );

    socket.on("status", (status) => store.dispatch("user/setStatus", status));
  };
}

const webSocketPlugin = createWebSocketPlugin(socket);

export default createStore({
  modules: {
    server,
    auth,
    channel,
    message,
    user,
  },
  plugins: [webSocketPlugin],
});
