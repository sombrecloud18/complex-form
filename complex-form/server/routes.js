import { Router } from "express";

export const router = new Router();

const projects = [];

router.get('/projects', (_, res) => {
    res.json(projects);
});

router.get('/project/:id', (req, res) => {
    if(projects.length === 0) return res.status(404).send('Add your first project!');
    const project = projects.find(proj => proj.id === parseInt(req.params.id));
    res.json(project);
});

router.post('/projects', (req, res) => {
    const project = {
        id: projects.length + 1,
        ...req.body
    };
    projects.push(project);
    res.status(201).json(project);
});

router.patch('/projects/:id', (res, req) => {
    const project = projects.find(proj => proj.id === parseInt(req.params.id));
    Object.assign(project, req.body);
    res.json(project);
})