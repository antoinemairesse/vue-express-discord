import Channels from "@/api/endpoints/Channels";
import Auth from "@/api/endpoints/Auth";
import Messages from "@/api/endpoints/Messages";
import Servers from "@/api/endpoints/Servers";
import Invites from "@/api/endpoints/Invites";
import Users from "@/api/endpoints/Users";

export default {
  auth: new Auth("auth"),
  channels: new Channels("channels"),
  messages: new Messages("messages"),
  servers: new Servers("servers"),
  invites: new Invites("invites"),
  users: new Users("users"),
};
