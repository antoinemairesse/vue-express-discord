import $api from "@/api";

export const sendMessage = async ({ commit, rootState }, data) => {
  const channel = rootState.channel.selectedChannel?._id;
  if(!channel) return;
  commit("SET_LOADING", true);

  const fd = new FormData();

  if (data.image) {
    const blob = await fetch(data.image).then((r) => r.blob());
    fd.append("image", blob);
  }
  fd.append("content", data.message || '');
  fd.append("channel", channel);

  await $api.messages.send(fd)
    .finally(() => commit("SET_LOADING", false));
};

export const getMessages = (
  { commit, state, rootState, dispatch },
  channel,
) => {
  if (channel && !state.messages.has(channel._id)) {
    $api.channels.getMessages(channel._id).then((response) => {
      const { itemCount, page, pageCount, messages } = response.data;
      commit("SET_MESSAGES", { channelId: channel._id, messages });
      commit("SET_PAGINATION_INFO", { itemCount, page, pageCount });
    });
  }
};

export const getMoreMessages = ({ commit, state, rootState }) => {
  if (state.loading) return;
  commit("SET_LOADING", true);
  const channel = rootState.channel.selectedChannel;
  const { page } = state;

  return $api.channels.getMessages(channel._id, page + 1)
    .then((response) => {
      const { itemCount, page, pageCount, messages } = response.data;
      commit("ADD_MESSAGES", { channelId: channel._id, messages });
      commit("SET_PAGINATION_INFO", { itemCount, page, pageCount });
    })
    .finally(() => commit("SET_LOADING", false));
};

export const setEditMessageId = ({ commit }, messageId) => {
  commit("SET_EDIT_MESSAGE_ID", messageId);
};

export const addMessage = ({ commit, state }, message) => {
  const channelId = message.channel;
  const messages = state.messages.get(channelId) || [];
  messages.push(message);
  commit("SET_MESSAGES", { channelId, messages });
};

export const updateMessage = ({ commit, state }, message) => {
  const channelId = message.channel;

  let messages = state.messages.get(channelId);

  messages = messages.map((m) => {
    if (m._id === message._id) return message;
    return m;
  });

  commit("SET_MESSAGES", { channelId, messages });
};

export const deleteMessage = ({ commit, state }, message) => {
  const channelId = message.channel;

  let messages = state.messages.get(channelId);

  messages = messages.filter((m) => {
    return m._id !== message._id;
  });

  commit("SET_MESSAGES", { channelId, messages });
};
