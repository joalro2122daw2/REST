
function iniciar()
{
  document.getElementById("btCartes").addEventListener('click',btObtenir_clicked);
}

function btObtenir_clicked(ev)
{
    ev.target.style.display="none";
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
    query: "{obtenirBaralla{mostrarBaralla}}",
    variables: {}
    })
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow'
    };
    fetch("http://localhost:4000/graphql/", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      afegirJugador();
    })
    .catch(error => console.log('error', error));
}

function afegirJugador()
{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var graphql = JSON.stringify({
    query: "{afegirJugador{token,ma{pal,valor}}}",
    variables: {}
  })
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow'
  };
  fetch("http://localhost:4000/graphql/", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      let lb = document.getElementById('lbCartes');
      let ma ="";
      (result.data.afegirJugador.ma).forEach(carta => {
          ma += carta.pal + " ";
      })
      lb.innerHTML=ma;
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
      bt.removeEventListener('click',btObtenir_clicked);
      bt.addEventListener('click',btDescarts_clicked);
    })
    .catch(error => console.log('error', error));
}

function btDescarts_clicked(ev)
{
  ev.target.style.display = "none";
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var graphql = JSON.stringify({
    query: "{getToken(index:0)}",
    variables: {}
  })
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow'
  };

  fetch("http://localhost:4000/graphql/", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result.data.getToken);
      let token = result.data.getToken;
      enviarDescart(token);
    })
    .catch(error => console.log('error', error));
}

function enviarDescart(token)
{
  let tb = document.getElementById("tbDescarts");
  let lb = document.getElementById("lbDescarts");
  let descart = tb.value;
  tb.style.display = "none";
  lb.style.display = "none";
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var graphql = JSON.stringify({
    query: "{descart(token:\""+token+"\",descartades:\""+descart+"\"){pal}}",
    variables: {}
  })
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow'
  };
  fetch("http://localhost:4000/graphql/", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      let lb = document.getElementById("lbCartes");
      let contingut ="";
      result.data.descart.forEach(carta => {
        contingut += carta.pal + " ";
      })
      lb.innerHTML = contingut;

    })
    .catch(error => console.log('error', error));
}