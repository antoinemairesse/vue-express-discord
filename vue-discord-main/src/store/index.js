import { createStore } from "vuex";
import socket from "../socket";
import auth from "./auth/index";
import channels from "./channels/index";
import messages from "./messages/index";
import servers from "./servers/index";
import users from "./users/index";

function createWebSocketPlugin(socket) {
  return (store) => {
    store.$socket = socket;
    socket.on("serverUpdate", (server) =>
      store.dispatch("servers/updateServer", server),
    );
    socket.on("serverDeletion", (server) =>
      store.dispatch("servers/deleteServer", server?._id),
    );
    socket.on("serverJoin", (data) => store.dispatch("users/addUser", data));
    socket.on("serverLeave", (data) =>
      store.dispatch("users/removeUser", data),
    );

    socket.on("typing", (data) =>
      store.dispatch("channels/addTypingUser", data),
    );
    socket.on("stopTyping", (data) =>
      store.dispatch("channels/removeTypingUser", data),
    );

    socket.on("kick", (serverId) => {
      store.dispatch("servers/deleteServer", serverId);
      // reload to remove user from the websockets rooms of the server from which he was kicked
      window.location.replace("/");
    });

    socket.on("userUpdate", (user) => store.dispatch("users/updateUser", user));

    socket.on("channelCreation", (channel) =>
      store.dispatch("channels/addChannel", channel),
    );
    socket.on("channelUpdate", (channel) =>
      store.dispatch("channels/updateChannel", channel),
    );
    socket.on("channelDeletion", (channel) =>
      store.dispatch("channels/deleteChannel", channel),
    );

    socket.on("messageSent", (message) =>
      store.dispatch("messages/addMessage", message),
    );
    socket.on("messageUpdate", (message) =>
      store.dispatch("messages/updateMessage", message),
    );
    socket.on("messageDeletion", (message) =>
      store.dispatch("messages/deleteMessage", message),
    );

    socket.on("status", (status) => store.dispatch("users/setStatus", status));
  };
}

const webSocketPlugin = createWebSocketPlugin(socket);

export default createStore({
  modules: {
    servers,
    auth,
    channels,
    messages,
    users,
  },
  plugins: [webSocketPlugin],
});
