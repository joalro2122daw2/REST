function iniciar()
{
   document.getElementById("btCartes").addEventListener('click',donamcinc);
}


///////////////////////////
//
// CREA UN OBJECTE AJAX QUE FA UNA PETICIO GET AL SERVIDOR QUE RESPON ENVIANT
// EL TOKEN DEL JUGADOR I CINC CARTES ALEATORIES
//
/////////////////////////////////////////////
//
function donamcinc() { //al usar el botón ...
    pagina =new ObjeteAjax(); //instanciar objeto Ajax
    ajax=pagina.objete; //devolver el XMLHttpRequest
    ajax.open("GET","http://localhost:3000/api/cartes/:donamcinc",true); //preparar envio
    //devolver el resultado de la consulta
    ajax.onreadystatechange=function() {  
       if (ajax.readyState==4 && ajax.status==200) {
          let resp = JSON.parse(ajax.response);
          console.log(resp.CARTES);
          //Desar el token del jugador amb web storage
          sessionStorage.setItem('token',resp.TOKEN);
          //Mostrar les cartes
          let lb = document.getElementById('lbCartes');
          let cartes = "";
          resp.CARTES.forEach(carta =>{
               cartes += carta.CARTA + " ";
          });
          lb.innerHTML = cartes;
          //Mostrar la caixa de text pel descart
          let tbDescarts =document.getElementById("tbDescarts");
         tbDescarts.style.display = 'block';
         tbDescarts.value = "";
         tbDescarts.focus();
         document.getElementById("lbDescarts").style.display = 'block';
         //Reutilitzar el boto
         let bt = document.getElementById('btCartes');
         bt.style.display='block';
         bt.style.position='absolute';
         bt.style.top='300px';
         bt.style.left="150px";
         bt.innerHTML = "Envia";
         bt.removeEventListener('click',donamcinc);
         bt.addEventListener('click',descarts);          
          } 
       }
    ajax.send(); //enviar.
    }

    ///////////////////////////////
    //
    //   CREA UN OBJECTE AJAX QUE FA UNA PETICIO PUT AMB EL TOKEN DEL JUGADOR
    //   I LA QUANTITAT DE CARTES ALEATORIES QUE S'HAN DESCARTAT
    //
    //////////////////////////////////////
    //
    function descarts(ev){
        //Recuperar el token des del web storage
        let token = sessionStorage.getItem('token');
        //Obtenir el descart
        let tb= document.getElementById('tbDescarts');
        let descart = tb.value;
        // Ocultar els widgets del descart
        tb.style.display = "none";
        let retol = document.getElementById('lbDescarts');
        retol.style.display = "none";
        ev.target.style.display="none";
        //instanciar objete Ajax
        pagina =new ObjeteAjax();
        ajax=pagina.objete; //obtenir l'objecte XMLHttpRequest
        ajax.open("PUT","http://localhost:3000/api/cartes/"+token+"/"+descart,true); 
        //mostrar el resultat de la consulta
        ajax.onreadystatechange=function() {  
           if (ajax.readyState==4 && ajax.status==200) {
              let resp = JSON.parse(ajax.response);              
              let lb =document.getElementById("lbCartes");
              let cartes = "";
              resp.CARTES.forEach(carta =>{
               cartes += carta.CARTA + " ";
               });
               lb.innerHTML = cartes;
              } 
           }
        ajax.send(); //enviar.
    }