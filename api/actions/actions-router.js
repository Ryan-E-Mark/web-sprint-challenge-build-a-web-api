const express = require('express');

const { 
    errorHandler, 
    checkActionsId, 
    checkActionsBody 
} = require('./actions-middlware');

const Actions = require('./actions-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get();
        if (!actions) {
            res.send([]);
        } else {
            res.status(200).json(actions);
        }
    } catch (err) {
        next(err);
    }
});

router.get('/:id', checkActionsId, (req, res, next) => {
    try {
        res.status(200).json(req.action);
    } catch (err) {
        next(err);
    }
});

router.post('/', checkActionsBody, async (req, res, next) => {
    try {
        const newAction = await Actions.insert(req.body);
        res.status(201).json(newAction);
    } catch (err) {
        next(err);
    }
});

router.use(errorHandler);

module.exports = router;