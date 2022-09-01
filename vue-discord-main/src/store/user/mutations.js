export const SET_USERS = (state, {serverId, users}) => {
    state.users.set(serverId, users);
};

export const SET_STATUS = (state, status) => {
    state.status = status;
};

export const UPDATE_USER = (state, newUser) => {
    state.users.forEach((users) => {
        users.map((user) => {
            if (user._id === newUser._id) Object.assign(user, newUser);
            return user;
        });
    });
};
