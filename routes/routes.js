const express = require('express');
const controller = require('../controller/controller');
const router = express.Router();

router.get('/poll', controller.getPoll);
router.put('/login', controller.login)
module.exports = router