import Repository from "@/api/Repository";
export default class Channels extends Repository {
  getMessages(id, page) {
    // TODO REFACTOR WITH QUERY PARAMS
    let url = `${this.resource}/${id}/messages`;
    if (page) url += `?page=${page}`;
    return this.$axios.get(url);
  }
}
