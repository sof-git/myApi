const express = require('express');
const router = express.Router();
const todos = require('./todos');

router.use(todos);

module.exports = router;