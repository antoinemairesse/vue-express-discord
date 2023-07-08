import Repository from "@/api/Repository";
export default class Auth extends Repository {
  login(data) {
    return this.$axios.post(`${this.resource}/login`, data);
  }
  signup(data) {
    return this.$axios.post(`${this.resource}/signup`, data);
  }
  logout() {
    return this.$axios.post(`${this.resource}/logout`, {});
  }
  getAuthUser() {
    return this.$axios.get(this.resource);
  }
}
