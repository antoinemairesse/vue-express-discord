export const SET_SELECTED_CHANNEL = (state, channel) => {
  state.selectedChannel = channel;
};

export const ADD_SELECTED_CHANNEL = (state, { serverId, channelId }) => {
  state.serverSelectedChannel.set(serverId, channelId);
};

export const SET_CHANNELS = (state, { serverId, channels }) => {
  state.channels.set(serverId, channels);
};

export const SET_TYPING = (state, { channelId, users }) => {
  state.usersTyping.set(channelId, users);
};
