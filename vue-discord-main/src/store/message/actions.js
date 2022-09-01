import Message from '../../api/message';

export const sendMessage = ({commit, rootState}, data) => {
    if (document.getElementById('favicon').href === window.location.origin + '/favicon-notif.png') {
        document.getElementById('favicon').href = '/favicon.png';
    } else document.getElementById('favicon').href = '/favicon-notif.png';
    const channel = rootState.channel.selectedChannel?._id;
    if (channel) return Message.send({content: data, channel});
};

export const setEditMessageId = ({commit}, messageId) => {
    commit('SET_EDIT_MESSAGE_ID', messageId);
};

export const addMessage = ({commit, state}, message) => {
    const channelId = message.channel;
    const messages = state.messages.get(channelId) || [];
    messages.push(message);
    commit('SET_MESSAGES', {channelId, messages});
};

export const updateMessage = ({commit, state}, message) => {
    const channelId = message.channel;

    let messages = state.messages.get(channelId);

    messages = messages.map((m) => {
        if (m._id === message._id) return message;
        return m;
    });

    commit('SET_MESSAGES', {channelId, messages});
};

export const deleteMessage = ({commit, state}, message) => {
    const channelId = message.channel;

    let messages = state.messages.get(channelId);

    messages = messages.filter((m) => {
        return m._id !== message._id;
    });

    commit('SET_MESSAGES', {channelId, messages});
};
