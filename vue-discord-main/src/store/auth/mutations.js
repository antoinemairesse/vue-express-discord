export const SET_USER = (state, user) => {
  state.user = user;
};

export const SET_ERROR = (state, error) => {
  state.error = error;
};

export const SET_LOADING = (state, loading) => {
  state.loading = loading;
};

export const UPDATE_USER = (state, newUser) => {
  Object.assign(state.user, newUser);
};
