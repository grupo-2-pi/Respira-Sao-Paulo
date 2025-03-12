var sidebar = sideBar;

function openSidebar(){
  if(sidebar.style.display === "flex"){
    
    sidebar.style.display = "none";
  }else{
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