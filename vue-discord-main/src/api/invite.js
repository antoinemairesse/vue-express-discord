import Api from './api';

const END_POINT = 'invites';

export default {
    create(data) {
        return Api.post(END_POINT, data, {withCredentials: true});
    },
    get(code) {
        return Api.get(`${END_POINT}/${code}`, {withCredentials: true});
    },
    accept(data) {
        return Api.post(`${END_POINT}/accept`, data, {withCredentials: true});
    },
};
