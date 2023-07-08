import Api from "./axios";

const END_POINT = "messages";

export default {
  send(data) {
    return Api.post(END_POINT, data, { withCredentials: true });
  },
  update(id, data) {
    return Api.patch(`${END_POINT}/${id}`, data, { withCredentials: true });
  },
  delete(id) {
    return Api.delete(`${END_POINT}/${id}`, { withCredentials: true });
  },
};
