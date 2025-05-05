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

function login(){
  var credentials = receberDadosLogin();

  var isLoginValid = validateLoginCredentials(credentials);

  if(isLoginValid){
    location.replace("/paginaPrincipal.html");
  }else{
    console.log("Login invalido")
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

  const staticLogin = {
    cnpj: "12345678912345",
    password: "respiraSp"
  };

  var lowerCasePassword = dados.password.toLowerCase();
  var cnpjLength = dados.cnpj.length;
  var cnpjNumber = Number(dados.cnpj)

  // Valida se o cnpj tem alguma letra (se tiver a conversão pra numero vai retornar nan)
  if(
    cnpjNumber === NaN || 
    cnpjLength !== 14
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

  if(dados.cnpj !== staticLogin.cnpj || dados.password !== staticLogin.password){
    getAFalse = true;
  }

  return !getAFalse;
}

function clearErrorSpans(){
  cnpjErrorSpan.innerHTML = "";
  passwordErrorSpan.innerHTML = "";
}