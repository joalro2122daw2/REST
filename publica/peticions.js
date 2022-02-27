/* Fitxers amb les peticions per a l'aplicació web de pocker amb express */

/* Funció onclick del botó per a repartir cartes */
function demanaCinc()
{
  var data = "id=5&nom=Juan%20capullo&nota=1";
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("GET", "http://localhost:3000/api/cartes/donacinc");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.send(data);
}



