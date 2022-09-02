const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    name: {type: String, required: true},
    color: {type: String, required: true},
    permissions: {
        editServer: {type: Boolean, required: true},
        deleteServer: {type: Boolean, required: true},
        createChannels: {type: Boolean, required: true},
        editChannels: {type: Boolean, required: true},
        deleteChannels: {type: Boolean, required: true},
        deleteMessages: {type: Boolean, required: true},
        kickUser: {type: Boolean, required: true},
        banUser: {type: Boolean, required: true},
        invitePeople: {type: Boolean, required: true}
    },
    server: {type: mongoose.Schema.Types.ObjectId, ref: 'Server'},
})

/**
 * @typedef Role
 */
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
