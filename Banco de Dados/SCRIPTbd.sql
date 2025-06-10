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
mes CHAR(2),
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

INSERT INTO FeedbackPopulacao (descricao, tipoPoluicao, regiao, dtEnvio, classificacao) VALUES
('Nuvem de poluição cobrindo a cidade hoje', 'industrias', 'ABC', '2025-05-21', 1),
('Trânsito parado na marginal com fumaça densa', 'industrias', 'ABC', '2025-05-21', 1);

INSERT INTO FeedbackPopulacao (descricao, tipoPoluicao, regiao, dtEnvio, classificacao) VALUES
('Nuvem de poluição cobrindo a cidade hoje', 'industrias', 'Grande São Paulo', '2025-06-06', 5),
('Trânsito parado na marginal com fumaça densa', 'automóveis', 'Grande São Paulo', '2025-06-05', 4),
('Cheiro insuportável perto do polo industrial', 'industrias', 'ABC', '2025-06-04', 5),
('Fumaça preta de caminhões velhos', 'automóveis', 'Campinas', '2025-06-03', 3),
('Resíduos químicos no córrego municipal', 'industrias', 'Vale do Paraíba', '2025-05-30', 5),
('Ar pesado demais para exercícios ao ar livre', 'automóveis', 'Sorocaba', '2025-05-28', 4),
('Vazamento de produtos tóxicos na zona norte', 'industrias', 'Baixada Santista', '2025-05-25', 5),
('Barulho e fumaça de motos tunadas', 'automóveis', 'Ribeirão Preto', '2025-05-22', 2),
('Chaminés operando 24h sem controle', 'industrias', 'São Carlos', '2025-05-20', 4),
('Engarrafamento monstro na via principal', 'automóveis', 'Bauru', '2025-05-18', 3),
('Lagoa com espuma química estranha', 'industrias', 'Marília', '2025-05-15', 5),
('Fumaça de queima irregular de lixo', 'automóveis', 'Araçatuba', '2025-05-12', 4),
('Vazamento em duto industrial não resolvido', 'industrias', 'Presidente Prudente', '2025-05-10', 5),
('Fuligem cobrindo carros estacionados', 'automóveis', 'São José do Rio Preto', '2025-05-08', 3),
('Odor forte de amônia pela manhã', 'industrias', 'Piracicaba', '2025-05-05', 4),
('Tráfego intenso de caminhões a diesel', 'automóveis', 'Grande São Paulo', '2025-05-03', 4),
('Despejo irregular de efluentes no rio', 'industrias', 'ABC', '2025-05-01', 5),
('Nevoeiro poluente dificultando a visão', 'automóveis', 'Campinas', '2025-04-28', 3),
('Crianças com problemas respiratórios', 'industrias', 'Vale do Paraíba', '2025-04-25', 5),
('Fumaça de escapamentos intoxicante', 'automóveis', 'Sorocaba', '2025-04-22', 4),
('Vazamento de óleo na área portuária', 'industrias', 'Baixada Santista', '2025-04-20', 5),
('Barulho excessivo de motores antigos', 'automóveis', 'Ribeirão Preto', '2025-04-18', 2),
('Resíduos sólidos contaminando solo', 'industrias', 'São Carlos', '2025-04-15', 4),
('Congestionamento recorde esta semana', 'automóveis', 'Bauru', '2025-04-12', 3),
('Corrosão em estruturas por poluição', 'industrias', 'Marília', '2025-04-10', 5),
('Fumaça azulada saindo de veículos', 'automóveis', 'Araçatuba', '2025-04-08', 4),
('Vazamento de gás na região industrial', 'industrias', 'Presidente Prudente', '2025-04-05', 5),
('Fuligem acumulada em janelas', 'automóveis', 'São José do Rio Preto', '2025-04-03', 3),
('Cheiro de enxofre constante', 'industrias', 'Piracicaba', '2025-04-01', 4),
('Trânsito parado há mais de 3 horas', 'automóveis', 'Outras Regioes', '2025-03-30', 2),
('Resíduos hospitalares sendo queimados', 'industrias', 'Outras Regioes', '2025-03-28', 5),
('Fumaça preta de ônibus municipais', 'automóveis', 'Grande São Paulo', '2025-03-25', 4),
('Vazamento de produto químico no bairro', 'industrias', 'ABC', '2025-03-22', 5),
('Poeira metálica no ar', 'automóveis', 'Campinas', '2025-03-20', 3),
('Despejo noturno de efluentes', 'industrias', 'Vale do Paraíba', '2025-03-18', 5),
('Tráfego intenso na rodovia de acesso', 'automóveis', 'Sorocaba', '2025-03-15', 4),
('Água contaminada saindo das torneiras', 'industrias', 'Baixada Santista', '2025-03-12', 5),
('Fumaça branca tóxica pela manhã', 'automóveis', 'Ribeirão Preto', '2025-03-10', 2),
('Vazamento em tanque de combustível', 'industrias', 'São Carlos', '2025-03-08', 4),
('Engarrafamento diário na entrada da cidade', 'automóveis', 'Bauru', '2025-03-05', 3),
('Resíduos de construção poluindo riacho', 'industrias', 'Marília', '2025-03-03', 5),
('Fumaça de queimada urbana', 'automóveis', 'Araçatuba', '2025-03-01', 4),
('Vazamento de amônia em frigorífico', 'industrias', 'Presidente Prudente', '2025-02-28', 5),
('Fuligem cobrindo plantas do jardim', 'automóveis', 'São José do Rio Preto', '2025-02-25', 3),
('Odor químico após chuva', 'industrias', 'Piracicaba', '2025-02-22', 4),
('Congestionamento na ponte principal', 'automóveis', 'Outras Regioes', '2025-02-20', 2),
('Vazamento em duto de esgoto industrial', 'industrias', 'Outras Regioes', '2025-02-18', 5);

INSERT INTO Admin (nome, email, senha) VALUES 
("Lucas Hernandes Furquim", "lucas@respira.tech", "ishow123"),
("Joao ohi", "joao@respira.tech", "rockandrowandsaopaulo"),
("Guilherme antonio", "guilherme@respira.tech", "o garoto 04");

INSERT INTO Empresa (cnpj, nomeEmpresa, emailContato, telefoneContato) VALUES 
("11111111111111", "Soluções tech", "solucoestech@gmail.com", "11111111111");

INSERT INTO Funcionario 
(nomeFuncionario, emailFuncionario, senha, validarSenha, cargoFuncionario, isGerente, idEmpresa,isFirstLogin) VALUES 
("Funcionario teste", "funcionario@gmail.com", "ishow123", "ishow123", "Gerente",true, 1,   false);