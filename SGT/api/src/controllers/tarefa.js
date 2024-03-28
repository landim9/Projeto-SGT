const con = require('../connection/mysql');


getTarefa = (req, res) => {
    con.query('SELECT * FROM Tarefas', (err, result) => {
        err ? res.json(err).end() : res.json(result).end();
    })
};

// Função para criar uma tarefa
const criarTarefa = (req, res) => {
    const { descricao, DataVencimento, status } = req.body;

    const query = 'INSERT INTO Tarefas (descricao, DataVencimento, status) VALUES (?, ?, ?)';
    con.query(query, [descricao, DataVencimento, status], (err, _result) => {
        if (err) {
            console.error('Erro ao criar tarefa:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        console.log('Tarefa criada com sucesso.');
        return res.status(201).json({ message: 'Tarefa criada com sucesso' });
    });
};

// Função para atualizar uma tarefa
const atualizarTarefa = (req, res) => {
    const { idTarefas, descricao, DataVencimento, status } = req.body;
        const query = 'UPDATE Tarefas SET descricao = ?, DataVencimento = ?, status = ? WHERE idTarefas = ?';
        con.query(query, [descricao, DataVencimento, status, idTarefas], (err, _result) => {
            if (err) {
                console.error('Erro ao atualizar tarefa:', err);
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }
            console.log('Tarefa atualizada com sucesso.');
            return res.status(200).json({ message: 'Tarefa atualizada com sucesso' });
        });
};

// Função para excluir uma tarefa
const excluirTarefa = (req, res) => {
    const idTarefas = req.params.id;

    const query = 'DELETE FROM Tarefas WHERE idTarefas = ?';
    con.query(query, [idTarefas], (err, _result) => {
        if (err) {
            console.error('Erro ao excluir tarefa:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        console.log('Tarefa excluída com sucesso.');
        return res.status(200).json({ message: 'Tarefa excluída com sucesso' });
    });
};



module.exports = {
    criarTarefa,
    getTarefa,
    atualizarTarefa,
    excluirTarefa
};
