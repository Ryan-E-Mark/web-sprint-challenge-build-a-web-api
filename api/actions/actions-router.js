const express = require('express');

const Actions = require('./actions-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const actions = Actions.get();
        if (!actions) {
            res.send([]);
        } else {
            res.status(200).json(actions);
        }
    } catch (err) {
        next(err);
    }
})

module.exports = router;