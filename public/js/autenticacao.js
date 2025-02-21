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
        <input placeholder="Email" type="text">
        <input placeholder="Insira sua senha" type="text">
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