var sideBar = document.querySelector(".side-bar");

function openSidebar(){
  var body  = document.querySelector(".body");

  if(sideBar.classList.contains("active")){

    sideBar.classList.remove("active");
  }else{

    sideBar.classList.add("active");
  
      // Adicionar o listener após um delay
    setTimeout(() => {
      document.addEventListener('click', clickOutsideHandler);
    }, 50);
}

  console.log(sideBar);
}

var clickOutsideHandler = (event) => {
  if (!sideBar.contains(event.target)) {
    sideBar.classList.remove("active");
    // Remover o listener após fechar a siedbar
    document.removeEventListener('click', clickOutsideHandler);
  }
};
function goToAuth(){
  location.replace("/autenticacao.html");
}

function goToHistory(){
  location.href = "/#historia"
}

function goToCrenca(){
  location.href = "/#crenca"
}

function goToFeedback(){
  location.href = "/#feedback"
}


function switchPage(tag) {
  const container = document.querySelector('.sign-up-container');
  const buttons = document.querySelectorAll('.btn-switch');
  
  buttons.forEach(btn => btn.classList.remove('btn-clicked'));
  
  if (tag.id === 'signIn') {
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
        <p class="alredy-signed" id="signUp" onclick="switchPage(this)">
          Não <span>possui</span> uma conta?
        </p>
        <input id="inputCnpj" placeholder="Cnpj" type="text">
        <span class="error-span" id="cnpjErrorSpan"></span>
        <input id="inputLoginPassword" placeholder="Insira sua senha" type="password">
        <span class="error-span" id="passwordErrorSpan"></span>
        <button onclick="login()">  
          Entrar
        </button>
  `
}

function showSignUpForm(){
  form.innerHTML = `
     <h1 id="formHeader">
          Criar uma conta
          <span style="display: none;" id="spanLogoHeader">
            <object 
            data="./assets/logo.svg" 
            type="image/svg+xml">
            Logo da Respira São Paulo
            </object>
          </span>
        </h1>
        <p class="alredy-signed" id="signIn" onclick="switchPage(this)">
          Ja <span>possui</span> uma conta?
        </p>
        <div class="name-row">
          <input id="inputRazaoSocial" placeholder="Razão social" type="text">
          <input id="inputNomeFantasia" placeholder="Nome fantasia" type="text">
        </div>
        <input placeholder="Email" type="text">
        <input placeholder="Insira sua senha" type="password">
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
/*   var caracteresEspeciais = ["@", "#", "!", "&", "*", "$", "%"]; */
  clearErrorSpans();
  
  var getAFalse = false;

  var lowerCasePassword = dados.password.toLowerCase();
  var cnpjLength = dados.cnpj.length;
  var cnpjNumber = Number(dados.cnpj)

  // Valida se o cnpj tem alguma letra (se tiver a conversão pra numero vai retornar nan)
  if(
    cnpjNumber === NaN || 
    cnpjLength !== 147
  ){
    cnpjErrorSpan.innerHTML = "Cnpj inválido.";
    
    getAFalse = true;
  }

  if(
    dados.password === "" || 
    /* !caracteresEspeciais.includes(dados.password) || */
    lowerCasePassword === dados.password
  ){
    passwordErrorSpan.innerHTML = "Senha inválida.";

    getAFalse = true;
  }

  return !getAFalse;
}

function clearErrorSpans(){
  cnpjErrorSpan.innerHTML = "";
  passwordErrorSpan.innerHTML = "";
}