const Joi = require('joi');
const objectId = require('../../../utils/ObjectId');

const createMessage = {
    body: Joi.object().keys({
        content: Joi.string().required(),
        channel: Joi.string().custom(objectId).required()
    })
};

const getMessage = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required()
    })
};

const updateMessage = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required()
    }),
    body: Joi.object().keys({
        content: Joi.string()
    })
};

const deleteMessage = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required()
    })
};

module.exports = {
    createMessage,
    getMessage,
    updateMessage,
    deleteMessage
};
