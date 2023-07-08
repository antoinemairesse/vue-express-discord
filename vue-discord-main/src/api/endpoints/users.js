import Repository from "@/api/Repository";
export default class Users extends Repository{
  get(id) {
    return this.$axios.get(`${this.resource}/${id}`);
  }
};
