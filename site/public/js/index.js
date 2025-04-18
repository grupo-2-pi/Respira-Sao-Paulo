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

function goToHistory(){
  var div = document.querySelector(".historia");
  div.scrollIntoView({ behavior: "smooth" });
}

function goToCrenca(){
  var div = document.querySelector(".container");
  div.scrollIntoView({ behavior: "smooth" });
}
function goToFeedback(){
  var div = document.querySelector(".feedback-container");
  div.scrollIntoView({ behavior: "smooth" });
}

function goToFeedbackPage(){
  location.replace(`/feedback.html`)
}

function goToAuth(){
  location.replace("/autenticacao.html");
}