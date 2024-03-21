const con = require('../connection/mysql');

const getUsuario = (req, res) => {
    con.query('SELECT * FROM Usuarios', (err, result) => {
        err ? res.json(err).end() : res.json(result).end();
    })
};

const addUsuario = (req, res) => {}

const updateUsuario = (req, res) => {}

const deleteUsuario = (req, res) => {}


module.exports = {
    addUsuario,
    getUsuario,
    updateUsuario,
    deleteUsuario,
}