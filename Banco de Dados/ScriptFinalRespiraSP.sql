-- SCRIPT GRUPO 2 RESPIRA SP - 2ADSB 
CREATE DATABASE Respira;

USE Respira;

CREATE TABLE Admin (
    idAdmin INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    email VARCHAR(45) UNIQUE,
    senha VARCHAR(45)
);


CREATE TABLE dadosCETESB (
    iddadosCETESB INT AUTO_INCREMENT PRIMARY KEY,
    ano INT,
    tipoTransporte VARCHAR(45),
    tipoGasPoluente VARCHAR(45),
    quantidadePoluente DOUBLE,
    tipoCombustivel VARCHAR(45),
    quantidadeVeiculos INT,
    municipio VARCHAR(45),
    nivelQualidadeAr VARCHAR(45)
);


CREATE TABLE dadosCOVISA (
    iddadosCOVISA INT AUTO_INCREMENT PRIMARY KEY,
    dta DATE,
    municipio VARCHAR(45),
    faixaEtaria VARCHAR(45),
    valorTotal DOUBLE,
    numeroInternacoes INT,
    numeroObitos INT,
    taxaMortalidade DOUBLE,
    nomeDoenca VARCHAR(45)
);

CREATE TABLE Empresa (
    idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
    nomeFantasia VARCHAR(45),
    cnpj CHAR(14) UNIQUE,
    nomeEmpresa VARCHAR(45),
    quantidadeFuncionarios INT,
    emailContato VARCHAR(100)
);

CREATE TABLE Funcionario (
    idFuncionario INT AUTO_INCREMENT PRIMARY KEY,
    nomeFuncionario VARCHAR(100),
    emailFuncionario VARCHAR(100) UNIQUE,
    senha VARCHAR(45),
    validarSenha VARCHAR(45), 
    cargoFuncionario VARCHAR(45),
    idGerente TINYINT,
    cpfFuncionario CHAR(11) UNIQUE,
    isFirstLogin TINYINT,
    idEmpresa INT,
    FOREIGN KEY (idGerente) REFERENCES Funcionario(idFuncionario),
    FOREIGN KEY (idEmpresa) REFERENCES Empresa(idEmpresa)
);


CREATE TABLE LogRestrito (
    idLogRestrito INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255),
    dataHora DATETIME,
    idFuncionarioRespiraSP INT,
    FOREIGN KEY (idFuncionarioResponsavel) REFERENCES Funcionario(idFuncionario)
);


CREATE TABLE Notificacoes (
    idNotificacoes INT AUTO_INCREMENT PRIMARY KEY,
    dataHora DATETIME,
    descricao VARCHAR(255),
    tipo VARCHAR(45),
    FOREIGN KEY (idFuncionario) REFERENCES Funcionario(idFuncionario),
    FOREIGN KEY (idEmpresa) REFERENCES Empresa(idEmpresa)
);