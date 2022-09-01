export default {
    selectedChannel: null,
    serverSelectedChannel: localStorage.getItem('serverSelectedChannel') && new Map(Object.entries(JSON.parse(localStorage.getItem('serverSelectedChannel')))) || new Map(),
    usersTyping: new Map(),
    // map serverId to array of channels
    channels: new Map(),
};
