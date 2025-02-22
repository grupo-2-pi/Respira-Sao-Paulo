function switchPage(button) {
  const container = document.querySelector('.sign-up-container');
  const buttons = document.querySelectorAll('.btn-switch');
  
  buttons.forEach(btn => btn.classList.remove('btn-clicked'));
  
  button.classList.add('btn-clicked');
  
  if (button.id === 'btnSignIn') {
    container.classList.add('reverse');
    
    showSignInForm();
  } else {
    container.classList.remove('reverse');
    showSignUpForm();
  }
}

function showSignInForm() {
  form.innerHTML =  `
    <h1 id="formHeader">Entrar</h1>
        <p class="alredy-signed" id="signLinks">
          Não possui uma conta?
          <a onclick="switchPage(this)">Criar</a>
        </p>
        <input id="inputCnpj" placeholder="Cnpj" type="text">
        <span class="error-span" id="cnpjErrorSpan"><span/>
        <input id="inputLoginPassword" placeholder="Insira sua senha" type="text">
        <span class="error-span" id="passwordErrorSpan"><span/>
        <button onclick="login()">  
          Entrar
        </button>
  `
}

function showSignUpForm(){
  form.innerHTML = `
    <h1 id="formHeader">Criar uma conta</h1>
        <p class="alredy-signed" id="signLinks">
          Ja possui uma conta?
          <a onclick="switchPage(this)">Criar</a>
        </p>
        <div class="name-row">
          <input placeholder="Razão social" type="text">
          <input placeholder="Nome fantasia" type="text">
        </div>
        <input placeholder="Email" type="text">
        <input placeholder="Insira sua senha" type="text">
        <button>  
          Criar conta
        </button>
  `
}


function login(){
  var credentials = receberDadosLogin();

  var isLoginValid = validateLoginCredentials(credentials);

  if(isLoginValid){
    console.log("valido");
  }else{
    console.log("Invalido")
  }
}

// Recebe os dados das inputs e retorna um json pra vacilitar
function receberDadosLogin(){
  return {
    cnpj: inputCnpj.value,
    password: inputLoginPassword.value,
  };
}

function validateLoginCredentials(dados){
  var caracteresEspeciais = ["@", "#", "!", "&", "*", "$", "%"];
  var lowerCasePassword = dados.password.toLowerCase();
  var cnpjLength = dados.cnpj.length;
  var cnpjNumber = Number(dados.cnpj)

  // Valida se o cnpj tem alguma letra (se tiver a conversão pra numero vai retornar nan)
  if(
    cnpjNumber === NaN || 
    cnpjLength !== 14
  ) return false;

  if(
    dados.password === "" || 
    /* !caracteresEspeciais.includes(dados.password) || */
    lowerCasePassword === dados.password
  ) return false;

  return true;
} 