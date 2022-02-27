///////////////////////////
//
// CREA UN OBJECTE AJAX QUE FA UNA PETICIO GET AL SERVIDOR QUE RESPON ENVIANT
// EL TOKEN DEL JUGADOR I CINC CARTES ALEATORIES
//
/////////////////////////////////////////////
//
function donamcinc() { //al usar el botón ...
    pagina =new ObjetoAjax(); //instanciar objeto Ajax
    ajax=pagina.objeto; //devolver el XMLHttpRequest
    ajax.open("GET","http://localhost:8080/pocker_war_exploded/api/pocker/donamcinc",true); //preparar envio
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

    ///////////////////////////////
    //
    //   CREA UN OBJECTE AJAX QUE FA UNA PETICIO PUT AMB EL TOKEN DEL JUGADOR
    //   I LA QUANTITAT DE CARTES ALEATORIES QUE S'HAN DESCARTAT
    //
    //////////////////////////////////////
    //
    function descarts(){
        document.getElementById("fmDescarts").hidden = true;
        // Obtenir el token del jugador
        let parraf = document.getElementById("cont");
        let contingut = parraf.innerText;
        let ind = contingut.indexOf(":");
        let token = parraf.innerText.substring(0,ind);
        let aux = document.createElement("label");
        // Obtenir els nombres de les cartes a canviar
        let descart = document.getElementById("tbDescarts").value;
        pagina =new ObjetoAjax(); //instanciar objeto Ajax
        ajax=pagina.objeto; //devolver el XMLHttpRequest
        ajax.open("PUT","http://localhost:8080/pocker_war_exploded/api/pocker/descart/"+token+"/"+descart,true); //preparar envio
        //devolver el resultado de la consulta
        ajax.onreadystatechange=function() {  
           if (ajax.readyState==4 && ajax.status==200) {
              texto=ajax.responseText;
              document.getElementById("cont").innerHTML=texto;
              } 
           }
        ajax.send(); //enviar.
    }

