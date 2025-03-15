var sidebar = sideBar;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        } else {
            entry.target.classList.remove("active");
        }
    });
}, { threshold: 0.6 }); // Quando 60% da seção estiver visível

sections.forEach(section => observer.observe(section));




function openSidebar(){
  var body  = document.querySelector(".body");

  if(sidebar.style.display === "flex"){
    body.classList.remove("overlay");

    sidebar.style.display = "none";
  }else{
    body.classList.add("overlay");

    sidebar.style.display = "flex";
  
      // Adicionar o listener após um delay
    setTimeout(() => {
      document.addEventListener('click', clickOutsideHandler);
    }, 50);
}

  console.log(sidebar);
}

var clickOutsideHandler = (event) => {
  if (!sidebar.contains(event.target)) {
    sidebar.style.display = "none";
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