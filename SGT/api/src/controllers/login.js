const con = require('../connection/mysql');
var bcrypt = require ('bcrypt')
var salt = bcrypt.genSaltSync(10)

const bcrypt = require('bcrypt');

// Função para criar um hash da senha do usuário
async function hashPassword(password) {
  const saltRounds = 10; // Número de rounds de hashing (custo computacional)
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

// Função para verificar a senha do usuário
async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// Exemplo de uso:
const plainPassword = 'senha123';
hashPassword(plainPassword)
  .then((hashedPassword) => {
    console.log('Senha original:', plainPassword);
    console.log('Senha criptografada:', hashedPassword);

    // Simulando verificação da senha
    comparePassword(plainPassword, hashedPassword)
      .then((result) => {
        if (result) {
          console.log('Senha correta!');
        } else {
          console.log('Senha incorreta!');
        }
      })
      .catch((error) => {
        console.error('Erro ao comparar senhas:', error);
      });
  })
  .catch((error) => {
    console.error('Erro ao gerar hash da senha:', error);
  });
