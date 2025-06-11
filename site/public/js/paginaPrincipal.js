// Para mockar dados aleatórios
function gerarDadosAleatorios(quantidade, min, max) {
	var resultado = [];
	for (var i = 0; i < quantidade; i++) {
		var numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
		resultado.push(numeroAleatorio);
	}
	return resultado;
}

function switchPersona(persona) {
	localStorage.setItem('personaSelecionada', persona);
	location.reload(); // Recarrega a página para aplicar a nova persona
}

const persona = localStorage.getItem('personaSelecionada');

window.addEventListener("load", () => {

	const idFuncionario = sessionStorage.ID_FUNCIONARIO;

	const nomeFuncionario = sessionStorage.getItem("NOME_FUNCIONARIO");

	spanNomeUsuario.innerHTML = nomeFuncionario;

	if (idFuncionario === undefined || idFuncionario === null) {
		location.replace("autenticacao.html");
	}
	atualizarDash();
});

const ctx = document.getElementById('myChart').getContext('2d');
const ctx2 = document.getElementById('myChartB').getContext('2d');
const ctx3 = document.getElementById('myChartC');
const ctx4 = document.getElementById("segunda-kpi");
const ctx5 = document.getElementById("m-segunda-kpi");

const municipios = ['São Paulo', 'Guarulhos', 'São Bernardo', 'Santo André', 'Osasco',
	'Mauá', 'Diadema', 'Carapicuíba', 'Barueri', 'Itaquaquecetuba'];

let myChart;
let myChartB;

function aplicarEstiloKPI(id, valorTexto) {
	var elemento = document.getElementById(id);
	var valorNumerico = parseFloat(valorTexto);
	if (valorNumerico > 0) {
		elemento.textContent = valorNumerico + '% ▲';
		elemento.style.color = 'red';
	} else if (valorNumerico < 0) {
		elemento.textContent = Math.abs(valorNumerico) + '% ▼';
		elemento.style.color = 'green';
	} else {
		elemento.textContent = '0%';
		elemento.style.color = 'black';
	}
}

if (persona == 'saude') {
	document.getElementById("segunda-kpi").innerHTML = '<canvas id="velocimetro"></canvas>';
	document.getElementById("m-segunda-kpi").innerHTML = '<canvas id="m-velocimetro"></canvas>';

	document.getElementById('kpi1-title').textContent = 'Variação mensal de internações respiratórias dos 2 últimos meses';
	aplicarEstiloKPI('kpi1-value', -5);
	new Chart(document.getElementById('velocimetro'), {
		type: 'doughnut',
		data: { labels: ['Risco'], datasets: [{ data: [30, 70], backgroundColor: ['orange', '#eee'], borderWidth: 0 }] },
		options: { rotation: -90, circumference: 180, cutout: '75%', plugins: { title: { display: true, text: 'Risco de Internações - Estação Atual', font: { size: 15, weight: 'bold' }, padding: { top: 20, bottom: 20 } } } }
	});

	document.getElementById('kpi3-title').textContent = 'Taxa de mortalidade do último mês';
	document.getElementById('kpi3-value').textContent = '4%';
	document.getElementById('m-kpi1-title').textContent = '% de variação nas internações por doenças respiratórias';
	aplicarEstiloKPI('m-kpi1-value', 5);
	new Chart(document.getElementById('m-velocimetro'), {
		type: 'doughnut',
		data: { datasets: [{ data: [30, 70], backgroundColor: ['orange', '#eee'], borderWidth: 0 }] },
		options: { rotation: -90, circumference: 180, cutout: '75%', plugins: { title: { display: true, text: 'Risco de Internações - Estação Atual', font: { size: 15, weight: 'bold' }, padding: { top: 10, bottom: 10 } } } }
	});

	document.getElementById('m-kpi3-title').textContent = 'Taxa de mortalidade do último mês';
	document.getElementById('m-kpi3-value').textContent = '4%';

	myChartB = new Chart(ctx2, {
		type: 'bar',
		data: {
			labels: municipios.slice(0, 10),
			datasets: [
				{ label: 'Internações (quantidade)', data: gerarDadosAleatorios(10, 100, 1000), backgroundColor: 'rgba(54, 162, 235, 0.7)', yAxisID: 'internacoes', barThickness: 20 },
				{ label: 'Poluição (µg/m³)', data: gerarDadosAleatorios(10, 50, 200), type: 'line', borderColor: 'rgba(255, 99, 132, 1)', backgroundColor: 'rgba(255, 99, 132, 0.5)', yAxisID: 'poluicao' }
			]
		},
		options: {
			responsive: true,
			plugins: { title: { display: true, text: 'Internações Respiratórias X Poluição do Ar ℹ️', font: { size: 18 } } },
			onClick: () => alert('Este gráfico mostra a relação entre internações respiratórias com a qualidade do ar.'),
			scales: {
				internacoes: { type: 'linear', position: 'left', title: { display: true, text: 'Internações' } },
				poluicao: { type: 'linear', position: 'right', title: { display: true, text: 'Poluição (µg/m³)' }, grid: { drawOnChartArea: false } }
			}
		}
	});

	myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
			datasets: [
				{ label: 'Gastos 2023', data: gerarDadosAleatorios(12, 10, 20), borderColor: 'rgba(54, 162, 235, 1)' },
				{ label: 'Gastos 2024', data: gerarDadosAleatorios(12, 10, 20), borderColor: 'rgba(255, 99, 132, 1)' },
				{ label: 'Média dos Gastos', data: Array(12).fill(15), borderColor: 'rgba(75, 192, 192, 1)', borderDash: [5, 5], fill: false }
			]
		},
		options: {
			maintainAspectRatio: false,
			responsive: true,
			plugins: { title: { display: true, text: 'Evolução Anual de Gastos: 2022 vs. 2023 ℹ️', font: { size: 18 } } },
			onClick: () => alert('Este gráfico mostra os gastos mensais em dois anos e uma linha média para comparação.'),
			scales: {
				y: { title: { display: true, text: 'R$ em milhões' } },
				x: { title: { display: true, text: 'Meses' } }
			}
		}
	});

} else {
	document.getElementById('kpi1-title').textContent = 'Município com maior nível de poluição';
	document.getElementById('kpi1-value').textContent = 'Guarulhos';
	document.getElementById('kpi2-title').textContent = 'Variação da qualidade do ar dos 2 últimos meses';
	aplicarEstiloKPI('kpi2-value', -5);
	document.getElementById('kpi3-title').textContent = 'Poluente mais presente no ano';
	document.getElementById('kpi3-value').textContent = 'Sem Dados';
	document.getElementById('m-kpi1-title').textContent = 'Município maior nível de poluição';
	document.getElementById('m-kpi1-value').textContent = 'Guarulhos';
	document.getElementById('m-kpi2-title').textContent = 'Variação da qualidade do ar dos 2 últimos meses';
	aplicarEstiloKPI('m-kpi2-value', -5);
	document.getElementById('m-kpi3-title').textContent = 'Poluente mais presente no ano';
	document.getElementById('m-kpi3-value').textContent = 'CO2';

	myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: municipios,
			datasets: [
				{ label: 'Carro', data: gerarDadosAleatorios(10, 50, 100), backgroundColor: 'rgba(75, 192, 192, .7)' },
				{ label: 'Moto', data: gerarDadosAleatorios(10, 50, 100), backgroundColor: 'rgba(153, 12, 255, .7)' },
				{ label: 'Caminhão', data: gerarDadosAleatorios(10, 50, 100), backgroundColor: 'rgba(255, 99, 132, .7)' },
				{ label: 'Ônibus', data: gerarDadosAleatorios(10, 50, 100), backgroundColor: 'rgba(255, 26, 86, 0.7)' }
			]
		},
		options: {
			plugins: { title: { display: true, text: 'Estimativa de emissão de CO₂ por km e tipo de veículo' } },
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				x: { stacked: true, title: { display: true, text: 'Municípios' } },
				y: { stacked: true, title: { display: true, text: 'Emissão total (em milhares de gramas)' } }
			}
		}
	});

	myChartB = new Chart(ctx2, {
		type: 'line',
		data: {
			labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
			datasets: [
				{ label: 'São Paulo', data: gerarDadosAleatorios(12, 50, 100), borderColor: 'rgba(255, 99, 132, 1)', backgroundColor: 'rgba(255, 99, 132, 0.2)' },
				{ label: 'Guarulhos', data: gerarDadosAleatorios(12, 50, 100), borderColor: 'rgba(54, 162, 235, 1)', backgroundColor: 'rgba(54, 162, 235, 0.2)' },
				{ label: 'São Bernardo', data: gerarDadosAleatorios(12, 50, 100), borderColor: 'rgba(255, 206, 86, 1)', backgroundColor: 'rgba(255, 206, 86, 0.2)' },
			]
		},
		options: {
			maintainAspectRatio: false,
			responsive: true,
			plugins: { title: { display: true, text: 'Evolução mensal do nível de poluição por município', font: { size: 14 } } },
			scales: {
				y: { beginAtZero: false, title: { display: true, text: 'Índice de Poluição (µg/m³)' } },
				x: { title: { display: true, text: 'Mês' } }
			}
		}
	});
}

function abrirFiltro() {
	document.getElementById('id_fundo_escolher_filtro').style.display = "flex";
}

function fecharFiltro() {
	document.getElementById('id_fundo_escolher_filtro').style.display = "none";
}


//calculos---------------------------------------------------

function calcularMesAnterior(ano, mes) {
	const meses = [
		'jan', 'fev', 'mai', 'abr', 'mai', 'jun',
		'jul', 'ago', 'set', 'out', 'nov', 'dez'
	];

	let indice = meses.indexOf(mes);

	if (indice === -1) {
		console.error('Mês inválido:', mes);
		return { anoAnterior: ano, mesAnterior: mes };
	}

	if (indice === 0) {
		return { anoAnterior: String(Number(ano) - 1), mesAnterior: '12' };
	} else {
		return { anoAnterior: ano, mesAnterior: meses[indice - 1] };
	}
}


async function buscarDadosDashboard(regiao, ano, mes, callback) {
	const { anoAnterior, mesAnterior } = calcularMesAnterior(ano, mes);

	const urlAnterior = `/dashboard/dados?regiao=${decodeURIComponent(regiao === "" ? "Grande São Paulo" : regiao)}&ano=${decodeURIComponent(anoAnterior === "" ? "2022" : anoAnterior)}&mes=${decodeURIComponent(mesAnterior === "" ? "JAN" : mesAnterior)}`;
	const urlAtual = `/dashboard/dados?regiao=${decodeURIComponent(regiao === "" ? "Grande São Paulo" : regiao)}&ano=${decodeURIComponent(anoAnterior === "" ? "2023" : anoAnterior)}&mes=${decodeURIComponent(mesAnterior === "" ? "JAN" : mesAnterior)}`;

	console.log(urlAtual);
	console.log(urlAtual);

	try {
		const fetchAtual = await fetch(urlAtual).then(res => res.json());
		const fetchAnterior = await fetch(urlAnterior).then(res => res.json());

		console.log("Fetch atual");
		console.log(fetchAtual);

		callback(fetchAtual, fetchAnterior);
	} catch (e) {
		console.log("Erro: " + e);
	}

	/* 
		Promise.all([fetchAtual, fetchAnterior])
			.then(([dadosAtual, dadosAnterior]) => {
				console.log(dadosAtual);
	
				callback(dadosAtual, dadosAnterior);
			})
			.catch(err => {
				console.error("Erro ao buscar dados do dashboard:", err);
			}); */
}

function calcularVariacao(valorAtual, valorAnterior) {
	if (valorAnterior === 0) {
		return 0;
	}
	return ((valorAtual - valorAnterior) / valorAnterior) * 100;
}

function calcularMediaQualidade(qualidadeAr) {
	if (!qualidadeAr || qualidadeAr.length === 0) return 0;
	const soma = qualidadeAr.reduce((acc, item) => acc + item.valor, 0);
	return soma / qualidadeAr.length;
}

function calcularMediaInternacoes(mortalidade) {
	if (!mortalidade || mortalidade.length === 0) return 0;
	const soma = mortalidade.reduce((acc, item) => acc + item.numeroInternacoes, 0);
	return soma / mortalidade.length;
}



function atualizarKPIsComVariação(dadosAtual, dadosAnterior, persona) {
	if (persona === 'ambiental') {
		// KPIs do modo ambiental
		const variacaoFormatada = dadosAtual.kpis.variacaoQualidadeAr ?? 0;

		document.getElementById('kpi1-value').textContent = dadosAtual.kpis.maisPoluido;
		aplicarEstiloKPI('kpi2-value', variacaoFormatada);
		document.getElementById('kpi3-value').textContent = dadosAtual.kpis.rankingPoluente;

		document.getElementById('m-kpi1-value').textContent = dadosAtual.kpis.maisPoluido;
		aplicarEstiloKPI('m-kpi2-value', variacaoFormatada);
		document.getElementById('m-kpi3-value').textContent = dadosAtual.kpis.rankingPoluente;
	}
}




//Atualzando dash aqui------------------------------------------------

async function atualizarDash() {
	fecharFiltro();

	const regiao = document.getElementById('regiaoDesejada').value;
	const ano = document.getElementById('anoDesejado').value;
	const mes = document.getElementById('mesDesejado').value;

	// 	if (!regiao || !ano || !mes) {
	// 	console.warn("[KPI] Filtros incompletos, evitando carregamento inicial.");
	// 	return; // evita execução com filtros em branco
	// }
	//
	const persona = localStorage.getItem('personaSelecionada');

	buscarDadosDashboard(regiao, ano, mes, (dadosAtual, dadosAnterior) => {
		atualizarCharts(dadosAtual);
		console.log(dadosAtual);
		atualizarKPIsComVariação(dadosAtual, dadosAnterior, persona);


		if (persona === 'saude') {
			// === VARIAÇÃO DE INTERNAÇÕES === (Vindo do back-end agora)
			const variacaoFormatada = Math.round(dadosAtual.kpis.variacaoInternacoes || 0);

			//VELOCIMETRO ATT
			atualizarVelocimetro(mes);
			//TAXA MORTALIDADE ATT
			document.getElementById('kpi3-title').textContent = 'Taxa de mortalidade do último mês';
			document.getElementById('kpi3-value').textContent = dadosAtual.kpis.taxaMortalidade.toFixed(1) + '%';
			//VARIAÇÃO INTERNAÇÕES
			document.getElementById('kpi1-title').textContent = 'Variação mensal de internações respiratórias dos 2 últimos meses';
			aplicarEstiloKPI('kpi1-value', variacaoFormatada);

			document.getElementById('m-kpi1-title').textContent = '% de variação nas internações por doenças respiratórias';
			aplicarEstiloKPI('m-kpi1-value', variacaoFormatada);
		}

		var mesesNomes = {
			jan: 'Janeiro',
			fev: 'Fevereiro',
			mar: 'Março',
			abr: 'Abril',
			mai: 'Maio',
			jun: 'Junho',
			jul: 'Julho',
			ago: 'Agosto',
			set: 'Setembro',
			out: 'Outubro',
			nov: 'Novembro',
			dez: 'Dezembro'
		};

		// Supondo que a variável `mes` seja, por exemplo, "jan"
		var mesNome = mesesNomes[mes.toLowerCase()]; // Garante que esteja em minúsculas

		// Atualiza os textos nas divs
		document.getElementById('mesFiltro').innerText = mesNome;
		document.getElementById('anoFiltro').innerText = ano;
		document.getElementById('regiaoFiltro').innerText = regiao;
	});

}


function atualizarCharts(data) {
	const persona = localStorage.getItem('personaSelecionada');

	if (persona === 'ambiental') {
		atualizarGraficosAmbientais(data.graficos);
	} else {
		atualizarGraficosSaude(data.graficos);
	}
}

//ambiente
function atualizarGraficosAmbientais(graficos) {
	// === Gráfico da esquerda (barras empilhadas de emissão) ===
	const municipios = graficos.frota.map(item => item.municipio);

	const fatorCO2 = {
		automoveis: 192,
		motos: 72,
		caminhoes: 800,
		onibus: 1040
	};

	const datasetCarro = graficos.frota.map(item => item.automoveis * fatorCO2.automoveis);
	const datasetMoto = graficos.frota.map(item => item.motos * fatorCO2.motos);
	const datasetCaminhao = graficos.frota.map(item => item.caminhoes * fatorCO2.caminhoes);
	const datasetOnibus = graficos.frota.map(item => item.onibus * fatorCO2.onibus);


	myChart.data.labels = municipios;
	myChart.data.datasets[0].data = datasetCarro;
	myChart.data.datasets[1].data = datasetMoto;
	myChart.data.datasets[2].data = datasetCaminhao;
	myChart.data.datasets[3].data = datasetOnibus;
	myChart.update();

	// === Gráfico da direita (evolução mensal de poluição por município) ===
	const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
	const dados = graficos.qualidadeArTodosMeses;

	const dadosPorMunicipio = {};

	dados.forEach(item => {
		const municipio = item.municipio;
		const mes = item.mes.toLowerCase();
		const valor = item.valor;

		if (!dadosPorMunicipio[municipio]) {
			dadosPorMunicipio[municipio] = {};
		}

		dadosPorMunicipio[municipio][mes] = valor;
	});

	const datasets = [];

	for (const municipio in dadosPorMunicipio) {
		const valores = meses.map(m => dadosPorMunicipio[municipio][m] || 0);

		datasets.push({
			label: municipio,
			data: valores,
			borderColor: gerarCorAleatoria(),
			backgroundColor: 'transparent',
			tension: 0,
			borderWidth: 2,
			pointRadius: 3,
			pointHoverRadius: 5
		});
	}

	myChartB.data.labels = meses;
	myChartB.data.datasets = datasets;
	myChartB.options.plugins.title.text = 'Evolução mensal do nível de poluição por município';
	myChartB.update();
}

const coresFixas = [
	'#e6194b', // Vermelho
	'#3cb44b', // Verde
	'#ffe119', // Amarelo
	'#4363d8', // Azul
	'#f58231', // Laranja
	'#911eb4', // Roxo
	'#46f0f0', // Ciano
	'#f032e6', // Rosa
	'#bcf60c', // Verde limão
	'#fabebe', // Rosa claro
	'#008080', // Verde petróleo
	'#e6beff', // Lavanda
	'#9a6324', // Marrom
	'#fffac8', // Creme
	'#800000', // Vinho
	'#aaffc3', // Verde menta
	'#808000', // Verde musgo
	'#ffd8b1', // Pêssego
	'#000075', // Azul escuro
	'#808080'  // Cinza (último mesmo)
];

let corIndex = 0;
function gerarCorAleatoria() {
	const cor = coresFixas[corIndex % coresFixas.length];
	corIndex++;
	return cor;
}




//GRAFICOS DA SAUDE 
function atualizarGraficosSaude(graficos) {
	const municipios = graficos.mortalidade.map(item => item.municipio);

	const internacoes = graficos.mortalidade.map(item => item.numeroInternacoes);

	console.log("Dados atuais graficos");
	console.log(graficos);

	// Corrigindo: pegar valor da poluição real da tabela QualidadeAr
	const poluicoes = graficos.mortalidade.map(item => {
		const registroPoluicao = graficos.qualidadeAr.find(p => p.municipio === item.municipio);
		return registroPoluicao ? registroPoluicao.valor : 0;
	});

	myChartB.data.labels = municipios;
	myChartB.data.datasets = [
		{
			label: 'Internações (quantidade)',
			data: internacoes,
			backgroundColor: 'rgba(54, 162, 235, 0.7)',
			yAxisID: 'internacoes',
			barThickness: 20,
			type: 'bar'
		},
		{
			label: 'Poluição (µg/m³)',
			data: poluicoes,
			borderColor: 'rgba(255, 99, 132, 1)',
			backgroundColor: 'rgba(255, 99, 132, 0.5)',
			yAxisID: 'poluicao',
			type: 'line',
			tension: 0,
			pointRadius: 5,
			pointHoverRadius: 7
		}
	];

	myChartB.options = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: 'Internações Respiratórias X Poluição do Ar ℹ️',
				font: { size: 18 }
			}
		},
		scales: {
			internacoes: {
				type: 'linear',
				position: 'left',
				title: { display: true, text: 'Internações' }
			},
			poluicao: {
				type: 'linear',
				position: 'right',
				title: { display: true, text: 'Poluição (µg/m³)' },
				grid: { drawOnChartArea: false }
			}
		}
	};

	myChartB.update();


	// === GRÁFICO myChart: Gastos 2023 vs 2024 ===
	const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

	const dados2022 = Array(12).fill(0);
	const dados2023 = Array(12).fill(0);

	graficos.gastosAnuais.forEach(item => {
		const index = meses.indexOf(item.mes.toLowerCase());
		if (index !== -1) {
			if (item.ano === '2022') dados2022[index] = item.total_gasto;
			else if (item.ano === '2023') dados2023[index] = item.total_gasto;
		}
	});

	const media = dados2022.map((val, i) => ((val + dados2023[i]) / 2).toFixed(2));

	myChart.data.labels = meses;
	myChart.data.datasets = [
		{
			label: 'Gastos 2022',
			data: dados2022,
			borderColor: 'rgba(54, 162, 235, 1)',
			tension: 0,
			fill: false,
			pointRadius: 4
		},
		{
			label: 'Gastos 2023',
			data: dados2023,
			borderColor: 'rgba(255, 99, 132, 1)',
			tension: 0,
			fill: false,
			pointRadius: 4
		},
		{
			label: 'Média dos Gastos',
			data: media,
			borderColor: 'rgb(67, 101, 250)',
			borderWidth: 4,
			borderDash: [5, 5],
			tension: 0.2,
			fill: false,
			pointRadius: 0
		}
	];

	myChart.options.plugins.title.text = 'Evolução Anual de Gastos: 2023 vs. 2024 ℹ️';
	myChart.options.scales.y.title.text = 'R$ em milhões';
	myChart.update();

}

//LOGICA SEPARA DO VELOCIMETRO COLOQUEI AQUI P N ME ATRAPALHAR

function getEstacaoPorMes(mes) {
	const estacoes = {
		'jan': { estacao: 'Verão', cor: 'green', preenchimento: 15 },
		'fev': { estacao: 'Verão', cor: 'green', preenchimento: 15 },
		'dez': { estacao: 'Verão', cor: 'green', preenchimento: 15 },
		'mar': { estacao: 'Outono', cor: '#f1c40f', preenchimento: 50 },
		'abr': { estacao: 'Outono', cor: '#f1c40f', preenchimento: 50 },
		'mai': { estacao: 'Outono', cor: '#f1c40f', preenchimento: 50 },
		'jun': { estacao: 'Inverno', cor: 'red', preenchimento: 85 },
		'jul': { estacao: 'Inverno', cor: 'red', preenchimento: 85 },
		'ago': { estacao: 'Inverno', cor: 'red', preenchimento: 85 },
		'set': { estacao: 'Primavera', cor: '#9acd32', preenchimento: 35 },
		'out': { estacao: 'Primavera', cor: '#9acd32', preenchimento: 35 },
		'nov': { estacao: 'Primavera', cor: '#9acd32', preenchimento: 35 }
	};
	return estacoes[mes] || { estacao: 'Desconhecida', cor: 'gray', preenchimento: 0 };
}

function atualizarVelocimetro(mesSelecionado) {
	const info = getEstacaoPorMes(mesSelecionado);

	// Recria os canvases dinamicamente
	document.getElementById("segunda-kpi").innerHTML = '<canvas id="velocimetro"></canvas>';
	document.getElementById("m-segunda-kpi").innerHTML = '<canvas id="m-velocimetro"></canvas>';

	const canvasDesktop = document.getElementById('velocimetro');
	const canvasMobile = document.getElementById('m-velocimetro');

	const criarGrafico = (ctx) => new Chart(ctx, {
		type: 'doughnut',
		data: {
			datasets: [{
				data: [info.preenchimento, 100 - info.preenchimento],
				backgroundColor: [info.cor, '#eee'],
				borderWidth: 0
			}]
		},
		options: {
			rotation: -90,
			circumference: 180,
			cutout: '75%',
			plugins: {
				title: {
					display: true,
					text: `Risco de Internações - ${info.estacao}`,
					font: { size: 15, weight: 'bold' },
					padding: { top: 20, bottom: 20 }
				},
				legend: { display: false }
			}
		}
	});

	if (canvasDesktop) criarGrafico(canvasDesktop);
	if (canvasMobile) criarGrafico(canvasMobile);
}

