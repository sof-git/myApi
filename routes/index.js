const express = require('express');
const router = express.Router();
const todos = require('./todos');
const users = require('./users');

router.use(todos);
router.use(users)

module.exports = router;