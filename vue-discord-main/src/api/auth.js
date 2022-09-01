import Api from './api';

const END_POINT = 'auth';

export default {
    login(data) {
        return Api.post(END_POINT + '/login', data, {withCredentials: true});
    },
    signup(data) {
        return Api.post(END_POINT + '/signup', data);
    },
    logout() {
        return Api.post(`${END_POINT}/logout`, {}, {withCredentials: true});
    },
    getAuthUser() {
        return Api.get(END_POINT, {withCredentials: true});
    },
};
