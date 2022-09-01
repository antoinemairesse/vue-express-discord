const express = require('express');
const router = express.Router();
const serverController = require('./index');
const validate = require('../../middlewares/validate');
const multer = require('../../middlewares/multer');
const validations = require('./validations');
const auth = require("../../middlewares/auth");

router.post('/', auth, multer, validate(validations.createServer), serverController.createServer);
router.post('/:id/leave', auth, validate(validations.leaveServer), serverController.leaveServer);
router.get('/:id', auth, validate(validations.getServer), serverController.getServer);
router.get('/:id/channels', auth, validate(validations.getServerChannels), serverController.getServerChannels);
router.patch('/:id', auth, multer, validate(validations.updateServer), serverController.updateServer);
router.delete('/:id', auth, validate(validations.deleteServer), serverController.deleteServer);
router.get('/', auth, serverController.getUserServers);
router.post('/:id/role', auth, validate(validations.createRole), serverController.createRole);
router.post('/:id/kick', auth, validate(validations.kickUser), serverController.kickUser);
router.post('/:id/ban', auth, validate(validations.banUser), serverController.banUser);
router.get('/:serverId/ban/:userId', auth, validate(validations.isUserBanned), serverController.isUserBanned);

module.exports = router;
