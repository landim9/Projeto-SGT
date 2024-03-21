const con = require('../connection/mysql');

addTarefa = (req, res) => {};

getTarefa = (req, res) => {
    con.query('SELECT * FROM Tarefas', (err, result) => {
        err ? res.json(err).end() : res.json(result).end();
    })
};

updateTarefa = (req, res) => {};

deleteTarefa = (req, res) => {};

module.exports = {
    addTarefa,
    getTarefa,
    updateTarefa,
    deleteTarefa
};
