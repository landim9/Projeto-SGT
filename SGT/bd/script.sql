drop database if exists SGT;
create database SGT CHARSET=UTF8 COLLATE utf8_general_ci;
use SGT;



create table Usuarios(
    idUsuarios int not null primary key auto_increment,
    nome varchar(100) not null,
    email varchar(50) not null,
    senha varchar(10) not null
);
create table Tarefas(
    idTarefas int not null primary key auto_increment,
    descricao varchar(100) not null default("Tarefas"),
    DataVencimento varchar(30) not null,
    status varchar(20) not null default,
    idUsuarios int not null
);

alter table Tarefas add foreign key (idUsuarios) references Usuarios(idUsuarios);



describe Usuarios;
describe Tarefas;
show tables;