function donamcinc() { //al usar el botón ...
    pagina =new ObjetoAjax(); //instanciar objeto Ajax
    ajax=pagina.objeto; //devolver el XMLHttpRequest
    ajax.open("GET","http://localhost:3000/api/cartes/:donamcinc",true); //preparar envio
    //devolver el resultado de la consulta
    ajax.onreadystatechange=function() {  
       if (ajax.readyState==4 && ajax.status==200) {
          texto=ajax.responseText;
          document.getElementById("cont").hidden = false;
          document.getElementById("cont").innerHTML=texto;
          } 
       }
    ajax.send(); //enviar.
    //Ocultar el botó de peticio de cartes
    let bt = document.getElementById("btCartes");
    bt.hidden = true;
    //Mostrar el formulari dels descarts
    document.getElementById("fmDescarts").hidden = false;
    }

    function descarts(){
        document.getElementById("fmDescarts").hidden = true;
        // Obtenir el token del jugador
        let parraf = document.getElementById("cont");
        let token = parraf.innerText.substring(12,23);
        let aux = document.createElement("label");
        // Obtenir els nombres de les cartes a canviar
        let descart = document.getElementById("tbDescarts").value;
        /*
        aux.id = "lbaux";
        aux.innerText = token + " " + descart;
        document.body.appendChild(aux);
        */
        pagina =new ObjetoAjax(); //instanciar objeto Ajax
        ajax=pagina.objeto; //devolver el XMLHttpRequest
        ajax.open("PUT","http://localhost:3000/api/cartes/"+token+"/"+descart,true); //preparar envio
        //devolver el resultado de la consulta
        ajax.onreadystatechange=function() {  
           if (ajax.readyState==4 && ajax.status==200) {
              texto=ajax.responseText;
              document.getElementById("cont").innerHTML=texto;
              } 
           }
        ajax.send(); //enviar.
    }