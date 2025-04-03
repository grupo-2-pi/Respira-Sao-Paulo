function carregarDadosPerfil(){
  var dados = {
    nome: "Lucas Hernandes",
    email: "lucas.furquim@sptech.school",
    cargo: "Dono da porra toda",
    iconUrl: "http://github.com/l-furquim"
  }

  inputNomeUsuario.value = dados.nome;
  inputEmailUsuario.value = dados.email;
}