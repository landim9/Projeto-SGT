const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.json("API Transportadora XPTO 1.0")
});


routes.post('/usuarios', Cliente.addCliente);
routes.get('/usuarios', Cliente.getClientes);
routes.get('/usuarios/:id', Cliente.getClientes);
routes.put('/usuarios', Cliente.updateCliente);
routes.delete('/usuarios/:id', Cliente.deleteCliente);

routes.post('/tarefas', Cliente.addCliente);
routes.get('/tarefas', Cliente.getClientes);
routes.get('/tarefas/:id', Cliente.getClientes);
routes.put('/tarefas', Cliente.updateCliente);
routes.delete('/tarefas/:id', Cliente.deleteCliente);




module.exports = routes;