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
    email: inputEmail.value,
    password: inputSenha.value,
  };
}

function validateLoginCredentials(dados){
/*   var caracteresEspeciais = ["@", "#", "!", "&", "*", "$", "%"]; */
  clearErrorSpans();
  
  var getAFalse = false;
  var email = dados.email;
  var senha = dados.password;

  // Valida se o cnpj tem alguma letra (se tiver a conversão pra numero vai retornar nan)
  if(
    !email.includes("@") || 
    email.length === 0
  ){
    emailErrorSpan.innerHTML = "Email inválido.";
    
    getAFalse = true;
  }

  if(
    senha.length === 0
  ){
    passwordErrorSpan.innerHTML = "Senha inválida.";

    getAFalse = true;
  }

  return !getAFalse;
}

function clearErrorSpans(){
  emailErrorSpan.innerHTML = "";
  passwordErrorSpan.innerHTML = "";
}