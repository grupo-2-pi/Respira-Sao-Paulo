-- SCRIPT GRUPO 2 RESPIRA SP - 2ADSB 
CREATE DATABASE Respira;

USE Respira;

CREATE TABLE Municipios (
    idMunicipios INT AUTO_INCREMENT PRIMARY KEY,
    nomeMunicipio VARCHAR(45) NOT NULL
);

CREATE TABLE Empresa (
    idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
    CNPJ CHAR(14) UNIQUE NOT NULL,
    nomeFantasia VARCHAR(45) NOT NULL,
    qtdFuncionarios INT NOT NULL,
    dataContratacao DATE NOT NULL,
    dataFimContrato DATE
);

CREATE TABLE Funcionarios (
    idFuncionarios INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    cpf CHAR(11) UNIQUE NOT NULL,
    email VARCHAR(45) UNIQUE,
    cargo VARCHAR(45) NOT NULL,
    senha CHAR(8) NOT NULL,
    idEmpresa INT NOT NULL,
    FOREIGN KEY (idEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE poluicaoTransporte (
    idpoluicaoTransporte INT AUTO_INCREMENT PRIMARY KEY,
    tipoTransporte VARCHAR(45) NOT NULL,
    qtdTransporte INT NOT NULL,
    tipoPoluicao VARCHAR(45) NOT NULL,
    qtdPoluicao DOUBLE NOT NULL,
    anoDado INT NOT NULL,
    tipoCombustivel VARCHAR(45),
    idMunicipio INT NOT NULL,
    FOREIGN KEY (idMunicipio) REFERENCES Municipios(idMunicipios)
);

CREATE TABLE dadosSaude (
    iddadosSaude INT AUTO_INCREMENT PRIMARY KEY,
    ano INT NOT NULL,
    mes VARCHAR(45) NOT NULL,
    gastosTotais DOUBLE NOT NULL,
    numeroInternacoes INT NOT NULL,
    numeroObitos INT NOT NULL,
    faixaIdade VARCHAR(45),
    idMunicipio INT NOT NULL,
    FOREIGN KEY (idMunicipio) REFERENCES Municipios(idMunicipios)
);

CREATE TABLE FeedbackUsuarios (
    idFeedbackUsuarios INT AUTO_INCREMENT PRIMARY KEY,
    nomeUsuario VARCHAR(45) NOT NULL,
    dataFeedback DATE NOT NULL,
    descricaoFeedback VARCHAR(100) NOT NULL,
    tipoPoluente VARCHAR(45),
    municipioFeedback VARCHAR(45) NOT NULL
);