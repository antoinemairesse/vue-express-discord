import Channel from '../../api/channel';
import socket from '../../socket';
import Server from "../../api/server";

export const setSelectedChannel = ({commit, dispatch, rootState, state}, channel) => {
    const serverId = rootState.server.selectedServer?._id;
    const channelId = channel?._id;

    if(state.selectedChannel?._id === channel?._id) return;

    commit('SET_SELECTED_CHANNEL', channel);
    setDocumentTitle(channel?.name, rootState.server.selectedServer?.name);
    if(channel) socket.emit('selectChannel', channel._id);
    commit('ADD_SELECTED_CHANNEL', {serverId, channelId});
    localStorage.setItem('serverSelectedChannel', JSON.stringify(Object.fromEntries(state.serverSelectedChannel)));
    dispatch('message/getMessages', channel, {root: true});
};

export const setChannels = async ({commit, dispatch, state, rootState}, server) => {
    const serverSelectedChannel = state.serverSelectedChannel;

    const channelId = serverSelectedChannel.get(server._id);
    let channels = state.channels;
    let channel = channels.get(server._id)?.find((channel) => {
        return channel._id === channelId;
    });

    if(!channel){
        channels = (await Server.getChannels(server._id)).data;
        if(!channels) return;

        channel = channels[0];

        if (serverSelectedChannel.has(server._id)) {
            const channelId = serverSelectedChannel.get(server._id);
            channel = channels.find((channel) => channel._id === channelId);
        }
    }

    dispatch('setSelectedChannel', channel);
    if (!state.channels.has(server._id)) commit('SET_CHANNELS', {serverId: server._id, channels});
}

export const createChannel = ({rootState}, data) => {
    const server = rootState.server.selectedServer?._id;
    return Channel.create({...data, server});
};

export const addChannel = ({commit, state, dispatch}, channel) => {
    const serverId = channel.server;

    const channels = state.channels.get(serverId);
    channels.push(channel);

    commit('SET_CHANNELS', {serverId, channels});

    if (state.channels.get(serverId).length <= 0) {
        dispatch('setSelectedChannel', channel);
    }
};

export const updateChannel = ({commit, dispatch, rootState, state}, channel) => {
    const serverId = channel.server;

    let channels = state.channels.get(serverId);
    channels = channels.map((c) => {
        if (c._id === channel._id) return channel;
        return c;
    });

    commit('SET_CHANNELS', {serverId, channels});

    if (channel._id === state.selectedChannel._id) {
        commit('SET_SELECTED_CHANNEL', channel);
        setDocumentTitle(channel?.name, rootState.server.selectedServer?.name);
    }
};

export const deleteChannel = ({commit, dispatch, state}, channel) => {
    const serverId = channel.server;

    let channels = state.channels.get(serverId);
    channels = channels.filter((c) => {
        return c._id !== channel._id;
    });

    commit('SET_CHANNELS', {serverId, channels});

    channel = state.channels.get(serverId)[0];
    dispatch('setSelectedChannel', channel);
};

export const addTypingUser = ({state, commit}, {userId, channelId}) => {
    let users = state.usersTyping.get(channelId);
    if (!users) users = [];
    users.push(userId);
    commit('SET_TYPING', {channelId, users})
}

export const removeTypingUser = ({state, commit}, {userId, channelId}) => {
    let users = state.usersTyping.get(channelId);
    if (!users) users = [];
    users = users.filter((id) => {
        return id !== userId;
    });
    commit('SET_TYPING', {channelId, users})
}

const setDocumentTitle = (channelName, serverName) => {
    document.title = `Discord | #${channelName} | ${serverName}` || 'Discord';
}
