const con = require("../connection/mysql");
var bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10)

// Função para criar um hash da senha do usuário
async function hashPassword(password) {
  const saltRounds = 10; // Número de rounds de hashing (custo computacional)
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

// Função para visualizar os usuarios
const read = (req, res) => {
  con.query("SELECT * FROM usuarios", (err, result) => {
    if (err) {
      console.error("Erro ao ler dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json({ data: result });
  });
};


// Função para criar um usuário
const create = (req, res) => {
  const { nome, email, senha } = req.body;

  bcrypt.hash(senha, 10, (err, hash) => {
    if (err) {
      console.error("Erro ao gerar hash de senha:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    const query = "INSERT INTO Usuarios (nome, email, senha) VALUES (?, ?, ?)";
    con.query(query, [nome, email, hash], (err, _result) => {
      if (err) {
        console.error("Erro ao criar usuário:", err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
      console.log("Usuário criado com sucesso.");
      return res.status(201).json({ message: "Usuário criado com sucesso" });
    });
  });
};



// // Função para atualizar um usuário
const update = (idUsuario, nome, email, senha) => {
  bcrypt.hash(senha, 10, (err, hash) => {
    if (err) {
      console.error("Erro ao gerar hash de senha:", err);
      throw err;
    }

    const query =
      "UPDATE Usuarios SET nome = ?, email = ?, senha = ? WHERE idUsuarios = ?";
    con.query(query, [nome, email, hash, idUsuario], (err, _result) => {
      if (err) {
        console.error("Erro ao atualizar usuário:", err);
        throw err;
      }
      console.log("Usuário atualizado com sucesso.");
    });
  });
};


// // Função para excluir um usuário
const del = (req, res) => {
  const idUsuario = req.params.id; // Supondo que o ID do usuário esteja nos parâmetros da URL
  const query = "DELETE FROM Usuarios WHERE idUsuarios = ?";
  con.query(query, [idUsuario], (err, _result) => {
    if (err) {
      console.error("Erro ao excluir usuário:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    console.log("Usuário excluído com sucesso.");
    return res.status(200).json({ message: "Usuário excluído com sucesso" });
  });
};


const login = (req, res) => {
  if (req.body != null && req.body.email != null && req.body.senha != null) {
      const { email, senha } = req.body;
      con.query('SELECT * FROM Usuario WHERE email = ? AND senha = ?', [email, senha], (err, result) => {
          if (err) {
              res.status(500).json('Erro ao fazer login');
          } else {
              if (result.length > 0) {
                  const { id, nome, email } = result[0];
                  res.status(200).json({id, nome, email});
              } else {
                  res.status(404).json('Usuario ou senha inválidos');
              }
          }
      });
  } else {
      res.status(400).json('Favor enviar todos os campos obrigatórios');
  }
}


module.exports = {
  read,
  create,
  update,
  del,
  login,
};
