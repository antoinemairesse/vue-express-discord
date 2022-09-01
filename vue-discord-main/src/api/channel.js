import Api from './api';

const END_POINT = 'channels';

export default {
    create(data) {
        return Api.post(END_POINT, data, {withCredentials: true});
    },
    update(id, data) {
        return Api.patch(`${END_POINT}/${id}`, data, {withCredentials: true});
    },
    delete(id) {
        return Api.delete(`${END_POINT}/${id}`, {withCredentials: true});
    },
    getMessages(id) {
        return Api.get(`${END_POINT}/${id}/messages`, {withCredentials: true});
    },
};
