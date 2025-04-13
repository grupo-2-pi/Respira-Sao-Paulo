var contador = 0;

function abrirComentarios(){


    if(contador == 0){
        button_see.style.background = "#C0E39D";
        container_comentarios.style.display = "flex";
        contador = 1;
    }else{
        button_see.style.background = "#f3f7ea";
        container_comentarios.style.display = "none";
        contador = 0;
    }
}