const Projects = require('./projects-model');
const projectsSchema = require('./projects-schema');

async function checkProjectsId(req, res, next) {
    try {
        const potentialProject = await Projects.get(req.params.id);
        if (!potentialProject) {
            next({ status: 404, message: `Project at id ${req.params.id} not found`})
        } else {
            req.project = potentialProject;
            next();
        }
    } catch (err) {
        next(err);
    }
}

async function checkProjectsBody(req, res, next) {
    try {
        const validatedProject = await projectsSchema.validate(
            req.body
        );
            req.body = validatedProject;
            next();
    } catch (err) {
        next({ status: 400, message: "Needs valid name and description"})
    }
}

module.exports = {
    checkProjectsId,
    checkProjectsBody
}
