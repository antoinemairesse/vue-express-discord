const express = require('express');
const router = express.Router();
const messageController = require('./index');
const validate = require('../../middlewares/validate');
const validations = require('./validations');
const auth = require("../../middlewares/auth");

router.post('/', auth, validate(validations.createMessage), messageController.createMessage);
router.get('/:id', auth, validate(validations.getMessage), messageController.getMessage);
router.patch('/:id', auth, validate(validations.updateMessage), messageController.updateMessage);
router.delete('/:id', auth, validate(validations.deleteMessage), messageController.deleteMessage);

module.exports = router;
