import Message from '../../api/message';
import Channel from "../../api/channel";

export const sendMessage = ({commit, rootState}, data) => {
    if (document.getElementById('favicon').href === window.location.origin + '/favicon-notif.png') {
        document.getElementById('favicon').href = '/favicon.png';
    } else document.getElementById('favicon').href = '/favicon-notif.png';
    const channel = rootState.channel.selectedChannel?._id;
    data.append('channel', channel);
    if (channel) return Message.send(data);
};

export const getMessages = ({commit, state, rootState, dispatch}, channel) => {
    if (channel && !state.messages.has(channel._id)) {
        Channel.getMessages(channel._id).then(response => {
            const {itemCount, page, pageCount, messages} = response.data;
            commit('SET_MESSAGES', {channelId: channel._id, messages});
            commit('SET_PAGINATION_INFO', {itemCount, page, pageCount})
        })
    }
};

export const getMoreMessages = ({commit, state, rootState}) => {
    if(state.loading) return;
    commit('SET_LOADING', true)
    const channel = rootState.channel.selectedChannel;
    const {page} = state;

    return Channel.getMessages(channel._id, (page + 1)).then(response => {
        const {itemCount, page, pageCount, messages} = response.data;
        commit('ADD_MESSAGES', {channelId: channel._id, messages});
        commit('SET_PAGINATION_INFO', {itemCount, page, pageCount})
    }).finally(() => commit('SET_LOADING', false))
}

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
