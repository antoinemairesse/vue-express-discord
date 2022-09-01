const express = require('express');
const router = express.Router();
const authController = require('./index');
const validate = require('../../middlewares/validate');
const validations = require('./validations');
const auth = require("../../middlewares/auth");

router.post('/signup', validate(validations.signup), authController.signup);
router.post('/login', validate(validations.login), authController.login);
router.post('/logout', authController.logout);
router.get('/', auth, authController.getAuthUser);

module.exports = router;
