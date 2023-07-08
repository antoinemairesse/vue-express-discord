import Api from './axios';

const END_POINT = 'servers';

export default {
    getAll() {
        return Api.get(END_POINT, {withCredentials: true});
    },
    get(id) {
        return Api.get(`${END_POINT}/${id}`, {withCredentials: true});
    },
    getChannels(id) {
        return Api.get(`${END_POINT}/${id}/channels`, {withCredentials: true});
    },
    create(data) {
        return Api.post(END_POINT, data, {withCredentials: true});
    },
    update(id, data) {
        return Api.patch(`${END_POINT}/${id}`, data, {withCredentials: true});
    },
    delete(id) {
        return Api.delete(`${END_POINT}/${id}`, {withCredentials: true});
    },
    leave(id) {
        return Api.post(`${END_POINT}/${id}/leave`, {}, {withCredentials: true});
    },
    kick(id, userId) {
        return Api.post(`${END_POINT}/${id}/kick`, {userId}, {withCredentials: true});
    },
    ban(id, userId) {
        return Api.post(`${END_POINT}/${id}/ban`, {userId}, {withCredentials: true});
    },
    isUserBanned(id, userId) {
        return Api.get(`${END_POINT}/${id}/ban/${userId}`, {withCredentials: true});
    },
};
