import $api from "@/api";
import socket from "../../socket";

export const setSelectedChannel = (
  { commit, dispatch, rootState, state },
  channel,
) => {
  const serverId = rootState.servers.selectedServer?._id;
  const channelId = channel?._id;

  if (state.selectedChannel?._id === channel?._id) return;

  commit("SET_SELECTED_CHANNEL", channel);
  setDocumentTitle(channel?.name, rootState.servers.selectedServer?.name);
  if (channel) socket.emit("selectChannel", channel._id);
  commit("ADD_SELECTED_CHANNEL", { serverId, channelId });
  localStorage.setItem(
    "serverSelectedChannel",
    JSON.stringify(Object.fromEntries(state.serverSelectedChannel)),
  );
  dispatch("messages/getMessages", channel, { root: true });
};

export const setChannels = async (
  { commit, dispatch, state, rootState },
  server,
) => {
  const serverSelectedChannel = state.serverSelectedChannel;

  const channelId = serverSelectedChannel.get(server._id);
  let channels = state.channels;
  let channel = channels.get(server._id)?.find((channel) => {
    return channel._id === channelId;
  });

  if (!channel) {
    channels = (await $api.servers.getChannels(server._id)).data;
    if (!channels) return;

    channel = channels[0];

    if (serverSelectedChannel.has(server._id)) {
      const channelId = serverSelectedChannel.get(server._id);
      channel = channels.find((channel) => channel._id === channelId);
    }
  }

  dispatch("setSelectedChannel", channel);
  if (!state.channels.has(server._id))
    commit("SET_CHANNELS", { serverId: server._id, channels });
};

export const createChannel = ({ rootState }, data) => {
  const server = rootState.servers.selectedServer?._id;
  return $api.channels.create({ ...data, server });
};

export const addChannel = ({ commit, state, dispatch }, channel) => {
  const serverId = channel.server;

  const channels = state.channels.get(serverId);
  channels.push(channel);

  commit("SET_CHANNELS", { serverId, channels });

  if (state.channels.get(serverId).length <= 0) {
    dispatch("setSelectedChannel", channel);
  }
};

export const updateChannel = (
  { commit, dispatch, rootState, state },
  channel,
) => {
  const serverId = channel.server;

  let channels = state.channels.get(serverId);
  channels = channels.map((c) => {
    if (c._id === channel._id) return channel;
    return c;
  });

  commit("SET_CHANNELS", { serverId, channels });

  if (channel._id === state.selectedChannel._id) {
    commit("SET_SELECTED_CHANNEL", channel);
    setDocumentTitle(channel?.name, rootState.servers.selectedServer?.name);
  }
};

export const deleteChannel = ({ commit, dispatch, state }, channel) => {
  const serverId = channel.server;

  let channels = state.channels.get(serverId);
  channels = channels.filter((c) => {
    return c._id !== channel._id;
  });

  commit("SET_CHANNELS", { serverId, channels });

  channel = state.channels.get(serverId)[0];
  dispatch("setSelectedChannel", channel);
};

export const sendTyping = ({ rootState }, typing) => {
  const serverId = rootState.servers.selectedServer._id;
  const channelId = rootState.channels.selectedChannel._id;
  const event = typing ? "typing" : "stopTyping";
  socket.emit(event, { serverId, channelId });
};

export const addTypingUser = (
  { state, commit, rootState },
  { user, channelId },
) => {
  if (user._id === rootState.auth.user._id) return;
  const users = state.usersTyping.get(channelId) || [];
  users.push(user);
  commit("SET_TYPING", { channelId, users });
};

export const removeTypingUser = ({ state, commit }, { user, channelId }) => {
  let users = state.usersTyping.get(channelId) || [];
  users = users.filter((u) => u._id !== user._id);
  commit("SET_TYPING", { channelId, users });
};

const setDocumentTitle = (channelName, serverName) => {
  const channel = channelName ? `| #${channelName}` : "";
  const server = serverName ? `| ${serverName}` : "";
  document.title = `Discord ${server} ${channel}`;
};
