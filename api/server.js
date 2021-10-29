const express = require('express');

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h1>Unit 4 Week 1 Sprint Challenge!</h1>`);
})

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.use('*', (req, res) => {
    res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!`})
})

module.exports = server;
