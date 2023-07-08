import Repository from "@/api/Repository";

export default class Servers extends Repository{
  getAll() {
    return this.$axios.get(this.resource);
  }
  get(id) {
    return this.$axios.get(`${this.resource}/${id}`);
  }
  getChannels(id) {
    return this.$axios.get(`${this.resource}/${id}/channels`);
  }
  leave(id) {
    return this.$axios.post(`${this.resource}/${id}/leave`, {});
  }
  kick(id, userId) {
    return this.$axios.post(
      `${this.resource}/${id}/kick`,
      { userId },
    );
  }
  ban(id, userId) {
    return this.$axios.post(
      `${this.resource}/${id}/ban`,
      { userId },
    );
  }
  isUserBanned(id, userId) {
    return this.$axios.get(`${this.resource}/${id}/ban/${userId}`);
  }
};
