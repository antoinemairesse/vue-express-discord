import Auth from '../../api/auth';
import router from '../../router/index';
import socket from '../../socket';

export const login = ({commit}, data) => {
    commit('SET_LOADING', true);
    Auth.login(data)
        .then((response) => {
            commit('SET_USER', response.data.user);
            commit('SET_ERROR', false);
            window.location.replace('/');
            commit('SET_LOADING', false);
        })
        .catch(() => {
            commit('SET_ERROR', true);
            commit('SET_LOADING', false);
        });
};

export const signup = ({commit}, data) => {
    commit('SET_LOADING', true);
    Auth.signup(data)
        .then((response) => {
            router.push('login');
        })
        .finally(() => {
            commit('SET_LOADING', false);
        });
};

export const getAuthUser = ({commit}) => {
    return Auth.getAuthUser().then((response) => {
        commit('SET_USER', response.data);
        socket.emit('online', response.data._id);
        return response.data;
    });
};
