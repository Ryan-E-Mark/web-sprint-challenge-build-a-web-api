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
})

router.use(errorHandler);

module.exports = router;
