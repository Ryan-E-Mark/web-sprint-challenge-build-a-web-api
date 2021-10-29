const express = require('express');

const { checkProjectsId, checkProjectsBody } = require('./projects-middleware');
const { errorHandler } = require('../actions/actions-middlware');

const Projects = require('./projects-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.get();
        if (!projects) {
            res.send([]);
        } else {
            res.status(200).json(projects);
        }
    } catch (err) {
        next(err);
    }
});

router.get('/:id', checkProjectsId, async (req, res, next) => {
    try {
        res.status(200).json(req.project);
    } catch (err) {
        next(err);
    }
});

router.post('/', checkProjectsBody, async (req, res, next) => {
    try {
        const newProject = await Projects.insert(req.body);
        res.status(201).json(newProject);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', checkProjectsBody, checkProjectsId, async (req, res, next) => {
    try {
        const updatedProject = await Projects.update(req.params.id, req.body);
        res.status(200).json(updatedProject);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', checkProjectsId, async (req, res, next) => {
    try {
        const deletedProject = await Projects.remove(req.params.id);
        res.send('Successfully deleted project');
    } catch (err) {
        next(err);
    }
});

router.get('/:id/actions', checkProjectsId, async (req, res, next) => {
    try {
        const projectActions = await Projects.getProjectActions(req.params.id);
        res.status(200).json(projectActions);
    } catch (err) {
        next(err);
    }
})

router.use(errorHandler);

module.exports = router;
