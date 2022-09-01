const Joi = require('joi');
const objectId = require("../../../utils/ObjectId");

const getAllUsersInArray = {
    body: Joi.object().keys({
        users: Joi.array().required()
    })
};

const getUser = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required()
    })
}

const updateUser = {
    body: Joi.object().keys({
        username: Joi.string().max(30)
    })
};

module.exports = {
    getAllUsersInArray,
    getUser,
    updateUser
};
