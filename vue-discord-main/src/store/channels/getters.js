export const channelName = (state) => {
  return state.selectedChannel?.name || "";
};

export const usersTyping = (state) => {
  return state.usersTyping.get(state.selectedChannel._id);
};

export const channels = (state, getters, rootState) => {
  const selectedServer = rootState.servers.selectedServer;
  if (selectedServer && state.channels.get(selectedServer._id)) {
    return state.channels.get(selectedServer._id);
  }
};
