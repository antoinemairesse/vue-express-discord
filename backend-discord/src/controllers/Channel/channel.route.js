const express = require('express');
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const validations = require("./validations");
const channelController = require("./index");
const router = express.Router();

router.post('/', auth, validate(validations.createChannel), channelController.createChannel);
router.get('/:id', auth, validate(validations.getChannel), channelController.getChannel);
router.patch('/:id', auth, validate(validations.updateChannel), channelController.updateChannel);
router.delete('/:id', auth, validate(validations.deleteChannel), channelController.deleteChannel);
router.get('/:id/messages', auth, validate(validations.getMessages), channelController.getMessages);

module.exports = router;
