-- SCRIPT GRUPO 2 RESPIRA SP - 2ADSB 
CREATE DATABASE Respira;

USE Respira;

CREATE TABLE Admin (
    idAdmin INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    email VARCHAR(45) UNIQUE,
    senha VARCHAR(45)
);


CREATE TABLE FrotaCirculante (
    iddadosCETESB INT AUTO_INCREMENT PRIMARY KEY,
    municipio VARCHAR(100),
    regiao VARCHAR(100),
    automoveis INT,
    comerciais_leves INT,
    caminhoes INT,
    onibus INT,
    motos INT,
    ano VARCHAR(45),
    mes VARCHAR(45),
    total INT
);

CREATE TABLE EmissaoVeicular(
    idEmissaoVeicular INT AUTO_INCREMENT PRIMARY KEY,
    tipoVeiculo VARCHAR(100),
    ano INT,
    valorCO DOUBLE,
    valorHC DOUBLE,
    valorNOX DOUBLE,
    valorCO2 DOUBLE,
    valorRCHO DOUBLE,
    valorMP DOUBLE,
    valorN2O DOUBLE
);

CREATE TABLE MortalidadeRespiratoria (
    iddadosCOVISA INT AUTO_INCREMENT PRIMARY KEY,
    mes VARCHAR(45),
    ano VARCHAR(45),
    municipio VARCHAR(45),
    valorTotal DOUBLE,
    numeroInternacoes DOUBLE,
    numeroObitos INT,
    taxaMortalidade DOUBLE,
    regiao VARCHAR(100)
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
    cpfFuncionario CHAR(11) UNIQUE,
    nomeFuncionario VARCHAR(100),
    emailFuncionario VARCHAR(100) UNIQUE,
    senha VARCHAR(45),
    validarSenha VARCHAR(45), 
    cargoFuncionario VARCHAR(45),
    idGerente INT,
    idEmpresa INT,
    isFirstLogin TINYINT,
    FOREIGN KEY (idGerente) REFERENCES Funcionario(idFuncionario),
    FOREIGN KEY (idEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE QualidadeAr (
     mes VARCHAR(45),
     ano VARCHAR(45),
     municipio VARCHAR(45),
     poluente VARCHAR(45),
     valor DOUBLE,
     unidade VARCHAR(45),
     regiao VARCHAR(45)
);
    
CREATE TABLE LogRestrito (
    idLogRestrito INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(45),
    descricao VARCHAR(255),
    dataHora DATETIME
);


CREATE TABLE Notificacoes (
    idNotificacoes INT AUTO_INCREMENT PRIMARY KEY,
    dataHora DATETIME,
    descricao VARCHAR(255),
    tipo VARCHAR(45),
    idFuncionario INT,
    idEmpresa INT,
    FOREIGN KEY (idFuncionario) REFERENCES Funcionario(idFuncionario),
    FOREIGN KEY (idEmpresa) REFERENCES Empresa(idEmpresa)
);
