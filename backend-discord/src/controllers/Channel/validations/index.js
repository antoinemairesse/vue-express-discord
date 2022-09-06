const Joi = require('joi');
const objectId = require('../../../utils/ObjectId');

const createChannel = {
    body: Joi.object().keys({
        name: Joi.string().regex(/^[\w\-\s]+$/).min(3).max(30).required(),
        server: Joi.string().custom(objectId).required()
    })
};

const getChannel = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required()
    })
};

const updateChannel = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required()
    }),
    body: Joi.object().keys({
        name: Joi.string().regex(/^[\w\-\s]+$/).min(3).max(30),
        server: Joi.string().custom(objectId)
    })
};

const deleteChannel = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required()
    })
};

const getMessages = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required(),
    }),
    query: Joi.object().keys({
        page: Joi.number(),
        nbOfItems: Joi.number()
    })
};

module.exports = {
    createChannel,
    getChannel,
    updateChannel,
    deleteChannel,
    getMessages
};
