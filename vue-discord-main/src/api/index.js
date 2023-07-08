import Channels from "@/api/channels";
import Auth from "@/api/auth";

export default {
  channels: new Channels("channels"),
  auth: new Auth("auth"),
};
