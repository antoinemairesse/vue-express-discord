export const userWithServerContext = (state, getters, rootState) => {
  const res = rootState.servers.selectedServer?.members.find((member) => {
    return state.user?._id === member.member._id;
  });
  const user = res?.member;
  if (user) user.role = res?.role;
  return user;
};

export const permissions = (state, getters) => {
  return getters.userWithServerContext?.role.permissions;
};
