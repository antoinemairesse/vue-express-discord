const express = require("express");
const router = express.Router();
const serverRoute = require('../controllers/Server/server.route');
const authRoute = require('../controllers/Auth/auth.route');
const channelRoute = require('../controllers/Channel/channel.route');
const messageRoute = require('../controllers/Message/message.route');
const userRoute = require('../controllers/User/user.route');
const inviteRoute = require('../controllers/Invite/invite.route');

router.use('/servers', serverRoute);
router.use('/auth', authRoute);
router.use('/channels', channelRoute);
router.use('/messages', messageRoute);
router.use('/users', userRoute);
router.use('/invites', inviteRoute);


module.exports = router;
