import Api from './api';

const END_POINT = 'users';

export default {
    get(id) {
        return Api.get(`${END_POINT}/${id}`, {withCredentials: true});
    },
    update(data) {
        return Api.patch(END_POINT, data, {withCredentials: true});
    },
};
