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






// Função para criar um usuário
function criarUsuario(nome, email, senha) {
  bcrypt.hash(senha, 10, function(err, hash) {
      if (err) throw err;
      
      const query = 'INSERT INTO Usuarios (nome, email, senha) VALUES (?, ?, ?)';
      con.query(query, [nome, email, hash], function(err, result) {
          if (err) throw err;
          console.log('Usuário criado com sucesso.');
      });
  });
};

criarUsuario('João', 'joao@example.com', 'minha_senha_secreta');


function excluirUsuario(idUsuario) {
  const query = 'DELETE FROM Usuarios WHERE idUsuarios = ?';
  con.query(query, [idUsuario], function(err, _result) {
      if (err) throw err;
      console.log('Usuário excluído com sucesso.');
  });
}

// Função para verificar a senha do usuário
async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// Exemplo de uso:
// const plainPassword = 'senha123';
// hashPassword(plainPassword)
//   .then((hashedPassword) => {
//     console.log('Senha original:', plainPassword);
//     console.log('Senha criptografada:', hashedPassword);

//     // Simulando verificação da senha
//     comparePassword(plainPassword, hashedPassword)
//       .then((result) => {
//         if (result) {
//           console.log('Senha correta!');
//         } else {
//           console.log('Senha incorreta!');
//         }
//       })
//       .catch((error) => {
//         console.error('Erro ao comparar senhas:', error);
//       });
//   })
//   .catch((error) => {
//     console.error('Erro ao gerar hash da senha:', error);
//   });

  const addLogin = (req, res) => {};

  const getLogin = (req, res) => {};

  const updateLogin = (req, res) => {};
  
  const deleteLogin = (req, res) => {};


  module.exports = {
    criarUsuario,
    getLogin,
    updateLogin,
    excluirUsuario
}