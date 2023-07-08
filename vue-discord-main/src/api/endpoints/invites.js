import Repository from "@/api/Repository";
export default class Invites extends Repository{
  get(code) {
    return this.$axios.get(`${this.resource}/${code}`);
  }
  accept(data) {
    return this.$axios.post(`${this.resource}/accept`, data);
  }
};
