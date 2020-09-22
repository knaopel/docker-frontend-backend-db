const express = require('express');
const router = express.Router();

const Todo = require('../models/todo');

router.route('/').get((req, res) => {
    res.json({ result: "foo" });
})

module.exports = router;