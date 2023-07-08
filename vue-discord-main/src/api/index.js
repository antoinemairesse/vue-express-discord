import Channels from "@/api/endpoints/channels";
import Auth from "@/api/endpoints/auth";
import Messages from "@/api/endpoints/messages";
import Servers from "@/api/endpoints/servers";
import Invites from "@/api/endpoints/invites";
import Users from "@/api/endpoints/users";

export default {
  auth: new Auth("auth"),
  channels: new Channels("channels"),
  messages: new Messages("messages"),
  servers: new Servers("servers"),
  invites: new Invites("invites"),
  users: new Users("users"),
};
