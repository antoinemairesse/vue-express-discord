export const SET_EDIT_MESSAGE_ID = (state, messageId) => {
    state.editMessageId = messageId;
};

export const SET_MESSAGES = (state, {channelId, messages}) => {
    state.messages.set(channelId, messages);
};