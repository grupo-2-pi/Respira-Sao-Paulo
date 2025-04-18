document.getElementById("close-modal").addEventListener("click", function(){
  document.getElementById("overlay").classList.remove("active");
  document.getElementById("modal").classList.remove("active");

});
document.getElementById("overlay").addEventListener("click", function(){
  document.getElementById("overlay").classList.remove("active");
  document.getElementById("modal").classList.remove("active");

});

var dados = {
  nome: "Lucas Hernandes",
  email: "lucas.furquim@sptech.school",
  cargo: "Dono da porra toda",
  iconUrl: "http://github.com/l-furquim",
  senha: "ishow123"
}

function carregarDadosPerfil(){
  // indicadorNomeUsuario.innerHTML += dados.nome;
  userName.innerHTML = dados.nome;
  userEmail.innerHTML = dados.email;
  inputNomeUsuario.value = dados.nome;
  inputEmailUsuario.value = dados.email;
  inputSenhaUsuario.value = dados.senha;
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

function saveChanges(){
  var inputNome = document.getElementById("inputNomeUsuario");
  var inputSenha = document.getElementById("inputSenhaUsuario");
  var inputCargo = document.getElementById("inputCargoUsuario");
  var inputEmail = document.getElementById("inputEmailUsuario")


  if(!inputEmail.value.includes("@")){
    document.getElementById("overlay").classList.add("active");
    document.getElementById("modal").classList.add("active");
  
    spanTitle.innerHTML = "<span style='color: red;'>Erro </span> ao salvar alterações"
    changesDescription.innerHTML = "Email inválido, por favor insira ou email válido para alteração";

    return;
  }

  if(inputSenha.value !== dados.senha){
    console.log("Mudou a senha")

    document.getElementById("overlaySenha").classList.add("active");
    document.getElementById("modalSenha").classList.add("active");

    return;
  }

  if(inputNome.value.length === 0){
    console.log(inputNome.value)

    document.getElementById("overlay").classList.add("active");
    document.getElementById("modal").classList.add("active");
  
    spanTitle.innerHTML = "<span style='color: red;'>Erro </span> ao salvar alterações"
    changesDescription.innerHTML = "Nome inválido, por favor insira um nome válido";
    
    return;
  }

  spanTitle.innerHTML = `
    Alterações realizadas com
        <span id="spanStatus">
            sucesso 
        </span>
        🍃
  `
  changesDescription.innerHTML = `
  Estamos felizes que conseguiu realizar suas alterações, mas note que a conta adm relacionada a você receberá uma notificação relacionada a alteração.
  `
  document.getElementById("overlay").classList.add("active");
  document.getElementById("modal").classList.add("active");
}

function changeUserName(){
  var input = document.getElementById("inputNomeUsuario");

  if(input.disabled){
    input.disabled = false;
    input.focus();
  }
}

function changeUserEmail(){
  var input = document.getElementById("inputEmailUsuario");

  if(input.disabled){
    input.disabled = false;
    input.focus();
  }
}

function changeUserRole(){
  var select = document.getElementById("selectCargoUsuario");

  if(select.disabled){
    select.disabled = false;
    select.focus();
  }
}
function changeUserPassword(){
  var input = document.getElementById("inputSenhaUsuario");

  if(input.disabled){
    input.disabled = false;
    input.focus();
  }
}

function sendPasswordConfirmation(){
  var newPassword = document.getElementById("inputSenhaUsuario").value;
  var confirmation = document.getElementById("inputPasswordConfirmation").value;

  console.log("Realizando a confirmação da senha");

  document.getElementById("overlaySenha").classList.remove("active");
  document.getElementById("modalSenha").classList.remove("active");

  if(newPassword === confirmation){
    dados.senha = confirmation;
    saveChanges();

    return;
  }
  document.getElementById("overlay").classList.add("active");
  document.getElementById("modal").classList.add("active");

  spanTitle.innerHTML = "<span style='color: red;'>Erro </span> ao salvar alterações"
  changesDescription.innerHTML = "Confirmação de senha inválida, as senhas não batem";
}