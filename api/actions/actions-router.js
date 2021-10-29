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
        const actions = Actions.get();
        if (!actions) {
            res.send([]);
        } else {
            res.status(200).json(actions);
        }
    } catch (err) {
        next(err);
    }
});

router.get('/:id', checkActionsId, async (req, res, next) => {
    try {
        const action = await Actions.get(req.params.id);
        res.status(200).json(action);
    } catch (err) {
        next(err);
    }
})

router.use(errorHandler);

module.exports = router;