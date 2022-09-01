const Joi = require('joi');
const objectId = require('../../../utils/ObjectId');

const createInvite = {
    body: Joi.object().keys({
        maxAge: Joi.number(),
        neverExpires: Joi.bool(),
        server: Joi.string().custom(objectId).required()
    })
};

const getInvite = {
    params: Joi.object().keys({
        code: Joi.string().length(parseInt(process.env.NANOID_LENGTH)).required()
    })
};

const acceptInvite = {
    body: Joi.object().keys({
        code: Joi.string().length(parseInt(process.env.NANOID_LENGTH)).required()
    })
}

module.exports = {
    createInvite,
    getInvite,
    acceptInvite
};
