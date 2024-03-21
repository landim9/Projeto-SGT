const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.json("API Gerenciamentos de tarefas")
});

const Usuario = require('./controllers/usuario');
const Tarefa = require('./controllers/tarefa');
const Login = require('./controllers/login');


routes.post('/usuarios', Usuario.addUsuario);
routes.get('/usuarios', Usuario.getUsuario);
routes.get('/usuarios/:id', Usuario.getUsuario);
routes.put('/usuarios', Usuario.updateUsuario);
routes.delete('/usuarios/:id', Usuario.deleteUsuario);

routes.post('/tarefas', Tarefa.addTarefa);
routes.get('/tarefas', Tarefa.getTarefa);
routes.get('/tarefas/:id', Tarefa.getTarefa);
routes.put('/tarefas', Tarefa.updateTarefa);
routes.delete('/tarefas/:id', Tarefa.deleteTarefa);

routes.post('/login', Login.criarUsuario);
routes.get('/login', Login.getLogin);
routes.get('/login/:id', Login.getLogin);
routes.put('/login', Login.updateLogin);
routes.delete('/login/:idUsuarios', Login.excluirUsuario);


module.exports = routes;