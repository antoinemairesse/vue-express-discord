const Joi = require('joi');
const objectId = require('../../../utils/ObjectId');

const createServer = {
    body: Joi.object().keys({
        name: Joi.string().regex(/^[\w\-\s]+$/).min(3).max(30).required()
    })
};

const getServer = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required()
    })
};

const updateServer = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required()
    }),
    body: Joi.object().keys({
        name: Joi.string().regex(/^[\w\-\s]+$/).min(3).max(30),
        creator: Joi.string().custom(objectId)
    })
};

const deleteServer = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required()
    })
};

const leaveServer = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required()
    })
};

const getServerChannels = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required()
    })
};

const createRole = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required()
    }),
    body: Joi.object().keys({
        name: Joi.string().regex(/^[\w\-\s]+$/).min(3).max(30).required(),
        color: Joi.string().regex(/^#[A-Fa-f0-9]{6}$/).required(),
        permissions: Joi.object().keys({
            editServer: Joi.bool().required(),
            deleteServer: Joi.bool().required(),
            createChannels: Joi.bool().required(),
            editChannels: Joi.bool().required(),
            deleteChannels: Joi.bool().required(),
            deleteMessages: Joi.bool().required(),
            kickUser: Joi.bool().required(),
            banUser: Joi.bool().required(),
            invitePeople: Joi.bool().required(),
        }).required()
    })
};

const kickUser = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required()
    }),
    body: Joi.object().keys({
        userId: Joi.string().custom(objectId).required()
    }),
}

const banUser = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required()
    }),
    body: Joi.object().keys({
        userId: Joi.string().custom(objectId).required()
    }),
}

const isUserBanned = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId).required(),
        serverId: Joi.string().custom(objectId).required()
    })
}

module.exports = {
    createServer,
    getServer,
    updateServer,
    deleteServer,
    leaveServer,
    getServerChannels,
    createRole,
    kickUser,
    banUser,
    isUserBanned
};
