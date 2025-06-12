-- SCRIPT GRUPO 2 RESPIRA SP - 2ADSB 
CREATE DATABASE Respira;

USE Respira;

CREATE TABLE Admin (
    idAdmin INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    email VARCHAR(45) UNIQUE,
    senha VARCHAR(45)
);

CREATE TABLE FeedbackPopulacao (
  idFeedbackPopulacao INT AUTO_INCREMENT PRIMARY KEY,
  descricao VARCHAR(45),
  tipoPoluicao VARCHAR(45),
  regiao VARCHAR(45),
  dtEnvio DATE,
  classificacao INT
);

CREATE TABLE FrotaCirculante (
    iddadosCETESB INT AUTO_INCREMENT PRIMARY KEY,
    municipio VARCHAR(100),
    regiao VARCHAR(100) COLLATE utf8mb4_general_ci,
    automoveis INT,
    comerciais_leves INT,
    caminhoes INT,
    onibus INT,
    motos INT,
    ano VARCHAR(45) COLLATE utf8mb4_general_ci,
    mes VARCHAR(45) COLLATE utf8mb4_general_ci,
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
    mes VARCHAR(45) COLLATE utf8mb4_general_ci,
    ano VARCHAR(45) COLLATE utf8mb4_general_ci,
    municipio VARCHAR(45),
    valorTotal DOUBLE,
    numeroInternacoes DOUBLE,
    numeroObitos INT,
    taxaMortalidade DOUBLE,
    regiao VARCHAR(100) COLLATE utf8mb4_general_ci
);


CREATE TABLE Empresa (
    idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
    nomeFantasia VARCHAR(45),
    cnpj CHAR(14) UNIQUE,
    nomeEmpresa VARCHAR(45),
    emailContato VARCHAR(100),
    telefoneContato VARCHAR(11)
);

CREATE TABLE Funcionario (
    idFuncionario INT AUTO_INCREMENT PRIMARY KEY,
    cpfFuncionario CHAR(11) UNIQUE,
    nomeFuncionario VARCHAR(100),
    emailFuncionario VARCHAR(100) UNIQUE,
    senha VARCHAR(45),
    validarSenha VARCHAR(45), 
    cargoFuncionario VARCHAR(45),
    isGerente boolean,
    idEmpresa INT,
    isFirstLogin boolean,
		persona VARCHAR(50),
    FOREIGN KEY (idEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE QualidadeAr (
    mes VARCHAR(45) COLLATE utf8mb4_general_ci,
    ano VARCHAR(45) COLLATE utf8mb4_general_ci,
    municipio VARCHAR(45),
    poluente VARCHAR(45),
    valor DOUBLE,
    unidade VARCHAR(45),
    regiao VARCHAR(45) COLLATE utf8mb4_general_ci
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
    descricao VARCHAR(255)
);


CREATE TABLE Filtro (
idFiltro INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(45),
regiao VARCHAR(45),
ano CHAR(4),
mes VARCHAR(50),
fkFuncionario INT,
fkEmpresa INT,
FOREIGN KEY (fkFuncionario) REFERENCES Funcionario(idFuncionario),
FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

INSERT INTO FeedbackPopulacao (descricao, tipoPoluicao, regiao, dtEnvio, classificacao) VALUES
('Muitos engarrafamentos pela manhã', 'automóveis', 'Grande São Paulo', '2025-06-03', 3),
('Fumaça preta saindo das chaminés', 'industrias', 'ABC', '2025-05-20', 4),
('Ar muito pesado no centro', 'automóveis', 'Campinas', '2025-05-15', 5),
('Cheiro forte de produtos químicos', 'industrias', 'Vale do Paraíba', '2025-05-10', 4),
('Trânsito intenso o dia todo', 'automóveis', 'Sorocaba', '2025-04-28', 2),
('Resíduos sendo jogados no rio', 'industrias', 'Baixada Santista', '2025-04-22', 5),
('Fumaça constante na região', 'industrias', 'Ribeirão Preto', '2025-04-15', 3),
('Poluição sonora e do ar', 'automóveis', 'São Carlos', '2025-04-05', 4),
('Nuvem de poluição visível', 'industrias', 'Bauru', '2025-03-30', 5),
('Muitos caminhões poluindo', 'automóveis', 'Marília', '2025-03-25', 3),
('Ardência nos olhos ao ar livre', 'industrias', 'Araçatuba', '2025-03-18', 4),
('Tráfego intenso de veículos pesados', 'automóveis', 'Presidente Prudente', '2025-03-10', 2),
('Cheiro forte de queimada', 'industrias', 'São José do Rio Preto', '2025-02-28', 5),
('Fumaça branca saindo das fábricas', 'industrias', 'Piracicaba', '2025-02-20', 3),
('Congestionamentos constantes', 'automóveis', 'Grande São Paulo', '2025-02-15', 4),
('Resíduos industriais mal cheirosos', 'industrias', 'ABC', '2025-02-05', 5),
('Poluição aumentando a cada dia', 'automóveis', 'Campinas', '2025-01-28', 4),
('Emissão de gases acima do normal', 'industrias', 'Vale do Paraíba', '2025-01-20', 3),
('Trânsito parado por horas', 'automóveis', 'Sorocaba', '2025-01-15', 2),
('Água do rio com cor estranha', 'industrias', 'Baixada Santista', '2025-01-10', 5),
('Fumaça preta dos ônibus', 'automóveis', 'Ribeirão Preto', '2025-01-05', 4),
('Cheiro forte na zona industrial', 'industrias', 'São Carlos', '2024-12-20', 3),
('Nível de poluição preocupante', 'automóveis', 'Bauru', '2024-12-15', 4),
('Emissões sem controle', 'industrias', 'Marília', '2024-12-10', 5),
('Tráfego intenso na rodovia', 'automóveis', 'Araçatuba', '2024-12-05', 3),
('Fábricas operando sem filtros', 'industrias', 'Presidente Prudente', '2024-11-28', 4),
('Ar irrespirável em dias secos', 'automóveis', 'São José do Rio Preto', '2024-11-20', 5),
('Resíduos químicos no ar', 'industrias', 'Piracicaba', '2024-11-15', 4),
('Congestionamentos na saída da cidade', 'automóveis', 'Outras Regioes', '2024-11-10', 2),
('Poluição visível no horizonte', 'industrias', 'Outras Regioes', '2024-11-05', 5);


INSERT INTO Admin (nome, email, senha) VALUES 
("Lucas Hernandes Furquim", "lucas@respira.tech", "ishow123"),
("Joao ohi", "joao@respira.tech", "rockandrowandsaopaulo"),
("Guilherme antonio", "guilherme@respira.tech", "o garoto 04");

INSERT INTO Empresa (cnpj, nomeEmpresa, emailContato, telefoneContato) VALUES 
("11111111111111", "Soluções tech", "solucoestech@gmail.com", "11111111111");

INSERT INTO Funcionario 
(nomeFuncionario, emailFuncionario, senha, validarSenha, cargoFuncionario, isGerente, idEmpresa,isFirstLogin, persona) VALUES 
("Funcionario teste", "funcionario@gmail.com", "ishow123", "ishow123", "Gerente",true, 1,   false, "saude");
