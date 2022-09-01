const express = require('express');
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const validations = require("./validations");
const inviteController = require("./index");
const router = express.Router();

router.post('/', auth, validate(validations.createInvite), inviteController.createInvite);
router.get('/:code', auth, validate(validations.getInvite), inviteController.getInvite);
router.post('/accept', auth, validate(validations.acceptInvite), inviteController.acceptInvite);

module.exports = router;
