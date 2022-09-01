import Server from '../../api/server';
import socket from '../../socket';

export const getServers = ({commit, dispatch}) => {
    Server.getAll().then((response) => {
        const servers = response.data;

        // tell server that we want update on these servers
        servers.forEach((server) => {
            socket.emit('serverUpdate', server._id);
        });

        const selectedServerId = localStorage.getItem('selectedServerId');

        commit('SET_SERVERS', servers);

        let selectedServer = servers.find((server) => {
            return server._id === selectedServerId;
        });

        if (servers && servers.length > 0) {
            if (!selectedServer) selectedServer = servers[0];
            dispatch('setSelectedServer', selectedServer);
        }
    });
};

export const setSelectedServer = ({commit, dispatch, state, rootState}, server) => {
    localStorage.setItem('selectedServerId', server._id);
    socket.emit('selectServer', server._id);
    commit('SET_SELECTED_SERVER', server);
    dispatch('user/setUsers', server, {root: true});
    dispatch('channel/setChannels', server, {root: true})
};

export const createServer = ({commit, dispatch}, data) => {
    return Server.create(data).then((response) => {
        const server = response.data;
        commit('ADD_SERVER', server);
        dispatch('setSelectedServer', server);
        socket.emit('serverUpdate', server._id);
    });
};

export const updateServer = ({commit, state}, server) => {
    const index = state.servers.map((s) => {
        return s._id;
    }).indexOf(server._id);
    commit('UPDATE_SERVER', {index, server});

    if (state.selectedServer._id === server._id) {
        commit('SET_SELECTED_SERVER', server);
    }
};

export const deleteServer = ({commit, state, dispatch, rootState}, serverId) => {
    commit('DELETE_SERVER', serverId);
    commit('SET_SELECTED_SERVER', state.servers[0]);

    const channel = rootState.channel.channels.get(state.servers[0]?._id)[0];
    dispatch('channel/setSelectedChannel', channel, {root: true});
};