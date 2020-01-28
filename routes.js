const { Router } = require('express');
const routes     = Router();

let projects = [];

const checkPayload = (req, res, next, fields) => {
  let fieldNotFound = '';
  fields.forEach(element => {
    if (!req.body[element]) {
      fieldNotFound = element;
    }
  });
  if (!fieldNotFound) {
    next();
  } else {
    return res.status(400).json({ message: `Parameter [${fieldNotFound}] is required` });
  }
};

const checkIdProject = (req, res, next) => {
  if (!req.params.id) return res.status(400).json({ message: 'Project Id is required.' });
  const index = projects.findIndex(p => p.id == req.params.id);
  if (index === -1) return res.status(400).json({ message: 'Project Id not found.' });
  req.indexProject = index;
  next();
};

const checkExistAnotherIdProject = (req, res, next) => {
  const index = projects.findIndex(p => p.id === req.body.id);
  if (index > -1) return res.status(400).json({ message: 'Id of an existing Project.' });
  next();
};

routes.get('/projects', (req, res, next) => {
  return res.status(200).json(projects);
});

routes.post(
  '/projects',
  (req, res, next) => checkPayload(req, res, next, ['id', 'title', 'tasks']),
  checkExistAnotherIdProject,
  (req, res) => {
  projects.push(req.body);
  return res.status(200).json(req.body);
});

routes.put(
  '/projects/:id',
  (req, res, next) => checkPayload(req, res, next, ['title']),
  checkIdProject,
  (req, res) => {
    console.log(req);
  projects[req.indexProject].title = req.body.title;
  return res.status(200).json(projects);
});

routes.delete('/projects/:id', checkIdProject, (req, res) => {
  projects.splice(req.indexProject, 1);
  return res.status(200).json({ message: 'Projeto deletado com sucesso', projects });
});

routes.post(
  '/projects/:id/tasks',
  (req, res, next) => checkPayload(req, res, next, ['title']),
  checkIdProject,
  (req, res) => {
  const { title } = req.body;
  projects[req.indexProject].tasks.push(title);
  return res.status(200).json({ message: `Tarefa adicionada no projeto ${projects[req.indexProject].title}` });
});

module.exports = routes;