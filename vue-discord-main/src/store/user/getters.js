import _ from "lodash";

export const users = (state, getters, rootState) => {
  const selectedServer = rootState.server.selectedServer;
  if (selectedServer && state.users.get(selectedServer._id)) {
    return state.users.get(selectedServer._id);
  }
};

export const status = (state, getters) => {
  let users = getters.users;
  if (users) {
    users = users.filter((user) => {
      return !user.notInServer;
    });
  }
  users = _.partition(users, (user) => {
    return state.status.includes(user._id);
  });

  users.forEach((userArr) => {
    userArr.sort((a, b) => {
      return a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1;
    });
  });

  return { online: users[0], offline: users[1] };
};
