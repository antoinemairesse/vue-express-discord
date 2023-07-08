import Repository from "@/api/Repository";
export default class Channels extends Repository {
  getMessages(id, page) {
    return this.$axios.get(`${this.resource}/${id}/messages`, {
      params: {
        page,
      },
    });
  }
}
