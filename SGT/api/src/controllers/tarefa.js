const con = require('../connection/mysql');


getTarefa = (req, res) => {
    con.query('SELECT * FROM Tarefas', (err, result) => {
        err ? res.json(err).end() : res.json(result).end();
    })
};

// Função para criar um usuário
function criarTarefa(descricao, DataVencimento, status) {
    bcrypt.hash(senha, 10, function(err, hash) {
        if (err) throw err;
        
        const query = 'INSERT INTO Tarefas (descricao, DataVencimento, status) VALUES (?, ?, ?)';
        con.query(query, [descricao, DataVencimento, status], function(err, _result) {
            if (err) throw err;
            console.log('Usuário criado com sucesso.');
        });
    });
  };
  
  
  // // Função para atualizar um usuário
  function atualizarTarefa(idTarefas, nome, email, senha) {
    bcrypt.hash(senha, 10, function(err, hash) {
        if (err) throw err;
        
        const query = 'UPDATE Tarefas SET descricao =?, DataVencimento =?, status =? WHERE idTarefas =?';
        con.query(query, [nome, email, hash, idTarefas], function(err, _result) {
            if (err) throw err;
            console.log('Usuário atualizado com sucesso.');
        });
    });
  };
  
  // // Função para excluir um usuário
  function excluirTarefa(idTarefas) {
    const query = 'DELETE FROM Tarefas WHERE idTarefas =?';
    con.query(query, [idTarefas], function(err, _result) {
        if (err) throw err;
        console.log('Usuário excluído com sucesso.');
    });
  };



module.exports = {
    criarTarefa,
    getTarefa,
    atualizarTarefa,
    excluirTarefa
};
