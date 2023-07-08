import $api from "@/api";

export const acceptInvite = ({}, code) => {
  return $api.invites.accept({ code });
};

export const getInvite = async ({ rootState, dispatch, commit }, code) => {
  let userId = rootState.auth.user?._id;
  if (!userId) {
    userId = (await dispatch("auth/getAuthUser", null, { root: true }))._id;
  }
  try {
    const invite = (await $api.invites.get(code, { userId })).data;
    commit("SET_SERVER", invite.server);
    commit("SET_SENDER", invite.sender);
    commit("SET_BANNED", invite.banned);
    commit("SET_MEMBERS", invite.members);
    commit("SET_LOADING", false);
  } catch (e) {
    commit("SET_INVALID", true);
  }
};
