export const SET_SERVERS = (state, servers) => {
    state.servers = servers;
};

export const SET_SELECTED_SERVER = (state, server) => {
    state.selectedServer = server;
};

export const ADD_SERVER = (state, server) => {
    state.servers.push(server);
};

export const UPDATE_SERVER = (state, {index, server}) => {
    state.servers[index] = server;
};

export const DELETE_SERVER = (state, serverId) => {
    state.servers = state.servers.filter((s) => {
        return s._id !== serverId;
    });
};
