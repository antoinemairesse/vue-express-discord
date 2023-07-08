import $axios from "./axios";

export default class Repository {
  constructor(resource) {
    this.$axios = $axios;
    this.resource = resource;
  }

  create(data) {
    return this.$axios.post(this.resource, data);
  }
  update(id, data) {
    return this.$axios.patch(`${this.resource}/${id}`, data);
  }
  delete(id) {
    return this.$axios.delete(`${this.resource}/${id}`);
  }
  get(id, params) {
    return this.$axios.get(`${this.resource}/${id}`, { params });
  }
}
