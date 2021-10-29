const Actions = require('./actions-model');
const { actionsSchema, updatedActionSchema } = require('./actions-schema');

function errorHandler(err, req, res, next) {
    res.status(err.status || 500)
        .json({
            message: err.message,
            prodMessage: "Something went wrong"
        });
}

async function checkActionsId(req, res, next) {
    try {
        const potentialAction = await Actions.get(req.params.id);
        if (!potentialAction) {
            next({ status: 404, message: `Unable to retrieve the action at id ${req.params.id}`});
        } else {
            req.action = potentialAction;
            next();
        }
    } catch (err) {
        next(err);
    }
}

async function checkActionsBody(req, res, next) {
    try {
        const validatedAction = await actionsSchema.validate(
            req.body
        );
        req.body = validatedAction;
        next();
    } catch (err) {
        next({ status: 400, message: "Must provide project_id, description, and notes"});
    }
}

async function checkUpdatedActionBody(req, res, next) {
    try {
        const validatedAction = await updatedActionSchema.validate(
            req.body
        );
        req.body = validatedAction;
        next();
    } catch (err) {
        next({ status: 400, message: "Must provide project_id, description, and notes"});
    }
}

module.exports = {
    errorHandler,
    checkActionsId,
    checkActionsBody,
    checkUpdatedActionBody
}
