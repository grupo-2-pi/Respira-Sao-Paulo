function carregarDadosPerfil(){
  var dados = {
    nome: "Lucas Hernandes",
    email: "lucas.furquim@sptech.school",
    cargo: "Dono da porra toda",
    iconUrl: "http://github.com/l-furquim"
  }
  // indicadorNomeUsuario.innerHTML += dados.nome;
  userName.innerHTML = dados.nome;
  userEmail.innerHTML = dados.email;
  inputNomeUsuario.value = dados.nome;
  inputEmailUsuario.value = dados.email;
}

var selectedImage = null;

function handleFileChange(input){
  if (input.files && input.files[0]) {
    selectedImage = input.files[0];

    const reader = new FileReader();
    
    // Aguarda o leitor de arquivos ser carregado por completo
    reader.onload = (e) => {

      // Recebe o resultado da imagem que o usuario inseriu na input e coloca para aparecer na tag img
      userIcon.src = e.target.result;
    };

    reader.readAsDataURL(selectedImage);

    xxxxxxxv                                                                                     
    // span.textContent = `Imagem selecionada: ${selectedImage.name}`;
  } else {
    selectedImage = null;
    preview.style.display = 'none';
    span.textContent = 'Nenhuma imagem selecionada';
  }
}
// Função para a implementação futura do salvamento da mesma no backend do projeto
function enviarImagem() {
  if (!selectedImage) {
    alert("Selecione uma imagem antes de enviar.");
    return;
  }

  const formData = new FormData();
  formData.append('imagem', selectedImage);

  fetch('http://localhost:3000/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(msg => alert(msg))
  .catch(error => console.error('Erro:', error));
}