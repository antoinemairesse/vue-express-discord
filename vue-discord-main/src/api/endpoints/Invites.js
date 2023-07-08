import Repository from "@/api/Repository";
export default class Invites extends Repository {
  accept(data) {
    return this.$axios.post(`${this.resource}/accept`, data);
  }
}
