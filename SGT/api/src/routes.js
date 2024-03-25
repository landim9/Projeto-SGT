const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.json("API Gerenciamentos de tarefas")
});

const Tarefa = require('./controllers/tarefa');
const Usuario = require('./controllers/usuario');


routes.post('/tarefas', Tarefa.criarTarefa);
routes.get('/tarefas', Tarefa.getTarefa);
routes.put('/tarefas', Tarefa.atualizarTarefa);
routes.delete('/tarefas/:id', Tarefa.excluirTarefa);

routes.post('/usuario', Usuario.create);
routes.get('/usuario/:id', Usuario.read);
routes.put('/usuario', Usuario.update);
routes.delete('/usuario/:idUsuario', Usuario.del);

routes.post('/login', Usuario.login);

module.exports = routes;