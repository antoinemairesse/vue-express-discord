import Repository from "@/api/Repository";
export default class Messages extends Repository{
  send(data) {
    return this.$axios.post(this.resource, data);
  }
};
