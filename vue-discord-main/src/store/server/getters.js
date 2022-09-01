export const serverName = (state) => {
    if (state.selectedServer) return state.selectedServer.name;
    else return '';
};

export const permissionsForServer = (state, getters, rootState) => (serverId) => {
    const server = state.servers.find(server => server._id === serverId);

    const res = server?.members.find((member) => {
        return rootState.auth.user?._id === member.member._id;
    });

    const user = res?.member;
    if (user) user.role = res?.role;
    return user?.role?.permissions;
}