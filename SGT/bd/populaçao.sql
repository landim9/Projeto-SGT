--População dos dados de teste
INSERT INTO Usuarios(idUsuarios, nome, email, senha) values
(1, 'João Silva', 'joao.silva@example.com','password123'),
(2, 'Maria Santos', 'maria.santos@example.com','qwerty456'),
(3, 'Carlos Oliveira', 'carlos.oliveira@example.com','1234abcd');

INSERT INTO Tarefas(idTarefas, descricao, DataVencimento, status, usuario_id) VALUES
(1, 'Encomenda de 5 kg para o cliente X no endereço Y', DATE('2024-03-27'), 'Em andamento', 1),
(2, 'Receber 10 unidades de produto Z do fornecedor A', DATE('2024-04-15'), 'Aguardando', 2),
(3, 'Entregar 2 unidades de produto k para fornecedor',  DATE('2024-03-30'), 'Não entregue',  3);


select * from Usuarios;
select * from Tarefas;