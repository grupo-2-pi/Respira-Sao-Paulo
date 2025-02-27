function openSidebar(){
  var sidebar = sideBar;

  if(sidebar.style.display === "flex"){
    sidebar.style.display = "none";
  }else{
    sidebar.style.display = "flex";
  }

  console.log(sidebar); 
}