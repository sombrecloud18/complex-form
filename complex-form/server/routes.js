import { Router } from "express";

export const router = new Router();

const projects = [
  {
    id: 1,
    projectTitle: "Complex Form",
    projectDescription: "",
    projectAuthor: "Kate",
    projectBudget: 0,
    projectPriority: "High",
    projectStatus: "In Progress",
    tasks: []
  },
  {
    id: 2,
    projectTitle: "Sleeping",
    projectDescription: "Sleep at least 6 hours :(",
    projectAuthor: "Kate",
    projectBudget: 0,
    projectPriority: "Low",
    projectStatus: "Skipped",
    tasks: [{
        name: "Sleep",
        status: "Todo"
    }]
  }
];

router.get('/projects', (_, res) => {
    res.json(projects);
});

router.get('/projects/:id', (req, res) => {
  console.log(`Looking for project ${req.params.id}`);
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) {
    console.log('Available projects:', projects); 
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

router.post('/projects', (req, res) => {
  const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
  const project = {
    id: newId,
    ...req.body
  };
  projects.push(project);
  res.status(201).json(project);
});

router.patch('/projects/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const projectIndex = projects.findIndex(p => p.id === projectId);
  
  if (projectIndex === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }
  const updatedProject = { 
    ...projects[projectIndex], 
    ...req.body,
    id: projectId 
  };
  
  projects[projectIndex] = updatedProject;
  res.json(updatedProject);
});