const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/todos', require('./todos'));

module.exports = router;
