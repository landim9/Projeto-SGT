const con = require('../connection/mysql');
var bcrypt = require ('bcrypt')
var salt = bcrypt.genSaltSync(10)

// Função para criar um hash da senha do usuário
async function hashPassword(password) {
  const saltRounds = 10; // Número de rounds de hashing (custo computacional)
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

// Função para visualizar os usuarios
const getUsuario = (req, res) => {
  con.query('SELECT * FROM Usuarios', (err, result) => {
      err ? res.json(err).end() : res.json(result).end();
  })
};


// Função para criar um usuário
function criarUsuario(nome, email, senha) {
  bcrypt.hash(senha, 10, function(err, hash) {
      if (err) throw err;
      
      const query = 'INSERT INTO Usuarios (nome, email, senha) VALUES (?, ?, ?)';
      con.query(query, [nome, email, hash], function(err, _result) {
          if (err) throw err;
          console.log('Usuário criado com sucesso.');
      });
  });
};


// // Função para atualizar um usuário
function atualizarUsuario(idUsuario, nome, email, senha) {
  bcrypt.hash(senha, 10, function(err, hash) {
      if (err) throw err;
      
      const query = 'UPDATE Usuarios SET nome =?, email =?, senha =? WHERE idUsuarios =?';
      con.query(query, [nome, email, hash, idUsuario], function(err, _result) {
          if (err) throw err;
          console.log('Usuário atualizado com sucesso.');
      });
  });
};

// // Função para excluir um usuário
function excluirUsuario(idUsuario) {
  const query = 'DELETE FROM Usuarios WHERE idUsuarios =?';
  con.query(query, [idUsuario], function(err, _result) {
      if (err) throw err;
      console.log('Usuário excluído com sucesso.');
  });
};

// function excluirUsuario(idUsuario) {
//   // Excluir as tarefas associadas ao usuário
//   const queryDeleteTasks = 'DELETE FROM tarefas WHERE usuario_id = ?';
//   con.query(queryDeleteTasks, [idUsuario], function(err, resultTasks) {
//     if (err) {
//       console.error('Erro ao excluir tarefas:', err);
//       return;
//     }
//     console.log('Tarefas do usuário excluídas com sucesso.');

//     // Excluir o usuário
//     const queryDeleteUser = 'DELETE FROM Usuarios WHERE idUsuarios = ?';
//     con.query(queryDeleteUser, [idUsuario], function(err, resultUser) {
//       if (err) {
//         console.error('Erro ao excluir usuário:', err);
//         return;
//       }
//       console.log('Usuário excluído com sucesso.');
//     });
//   });
// };

const login = (req, res) => {
  const { email, senha } = req.body;
  const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
  con.query(query, [email, senha], (error, results, fields) => {
    if (error) {
      console.error('Erro ao executar consulta:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    if (results.length > 0) {
      res.status(200).json({ message: 'Login bem-sucedido' });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  });
};
  


  module.exports = {
    getUsuario,
    criarUsuario,
    atualizarUsuario,
    excluirUsuario,
    login
}