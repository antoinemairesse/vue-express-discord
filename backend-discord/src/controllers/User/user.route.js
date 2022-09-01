const express = require('express');
const router = express.Router();
const userController = require('./index');
const validate = require('../../middlewares/validate');
const validations = require('./validations');
const auth = require("../../middlewares/auth");
const multer = require("../../middlewares/multer");

router.post('/', auth, validate(validations.getAllUsersInArray), userController.getAllUsersInArray);
router.get('/:id', auth, validate(validations.getUser), userController.getUser);
router.patch('/', auth, multer, validate(validations.updateUser), userController.updateUser);

module.exports = router;
