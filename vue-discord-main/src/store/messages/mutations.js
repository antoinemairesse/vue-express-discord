export const SET_EDIT_MESSAGE_ID = (state, messageId) => {
  state.editMessageId = messageId;
};

export const SET_MESSAGES = (state, { channelId, messages }) => {
  state.messages.set(channelId, messages);
};

export const ADD_MESSAGES = (state, { channelId, messages }) => {
  let msgs = state.messages.get(channelId);
  state.messages.set(channelId, msgs.concat(messages));
};

export const SET_PAGINATION_INFO = (state, { itemCount, page, pageCount }) => {
  Object.assign(state, { itemCount, page, pageCount });
};

export const SET_LOADING = (state, loading) => {
  state.loading = loading;
};
