/**
 *  set all users for a server, including thoses who left the server
 *  (still need their info for past messages...)
 */
export const setUsers = ({ commit, state }, server) => {
  const serverId = server._id;
  if (!state.users.has(serverId)) {
    const users = server.members.map((user) => {
      const u = user.member;
      u.role = user.role;
      return u;
    });

    // get all users that are not members
    server.users.forEach((user) => {
      if (!server.members.some((e) => e.member._id.toString() === user._id)) {
        user.notInServer = true;
        users.push(user);
      }
    });
    commit("SET_USERS", { serverId, users });
  }
};

export const setStatus = ({ commit }, status) => {
  commit("SET_STATUS", status);
};

export const updateUser = ({ commit, rootState }, newUser) => {
  commit("UPDATE_USER", newUser);
  if (rootState.auth.user._id === newUser._id) {
    commit("auth/UPDATE_USER", newUser, { root: true });
  }
};

export const addUser = ({ state, commit }, { serverId, user }) => {
  const users = state.users.get(serverId) || [];
  users.push(user);
  commit("SET_USERS", { serverId, users });
};

export const removeUser = ({ state, commit }, { server, user }) => {
  const serverId = server._id;
  let users = state.users.get(serverId);
  if (!users) return;

  users = users.map((u) => {
    if (u._id === user._id) u.notInServer = true;
    return u;
  });

  commit("SET_USERS", { serverId, users });
};
