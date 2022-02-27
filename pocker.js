const express = require('express');
const path = require('path');
const app=express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('publica'));
app.use(express.json()); 
let fs = require('fs');
const { send } = require('process');

/* Permitir cors */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', '*');
    next();
  });


/* Enumeracio dels pals de la baralla */
const pals = {
    TREBOLS:"trebols",
    PIQUES:"piques",
    CORS:"cors",
    DIAMANTS:"diamants"
};

/* Construir la baralla de cartes { CARTA:unicode, VALOR:nombre, COLOR:string }*/
let cartes = [];
addPal(pals.DIAMANTS);
addPal(pals.PIQUES);
addPal(pals.CORS);
addPal(pals.TREBOLS);

/* Llista de jugadors { TOKEN:token ,CARTES:cinc cartes};*/
let jugadors = [];


///////////////////////////////
//
//  AFEGEIX A LA BARALLA EL PAL INDICAT EN EL PRIMER ARGUMENT
//  QUE TE EL COLOR INDICAT EN EL SEGON
//
///////////////////////////////////////
//
function addPal(pal)
{
    let color ="vermell";
    if(pal == pals.TREBOLS || pal == pals.PIQUES)
    {
        color = "negre";
    }
    arraypal = [];
    if(pal == pals.TREBOLS)
        arraypal = ['🃑','🃒','🃓','🃔','🃕','🃖','🃗','🃘','🃙','🃚','🃛','🃝','🃞'];
    else if(pal == pals.CORS)
        arraypal = ['🂱','🂢','🂣','🂴','🂵','🂶','🂷','🂸','🂹','🂺','🂻','🂽','🂾']
    else if(pal == pals.PIQUES)
        arraypal = ['🂡','🂢','🂣','🂤','🂥','🂦','🂧','🂨','🂩','🂪','🂫','🂭','🂮']
    else if(pal == pals.DIAMANTS)
        arraypal = ['🃁','🃂','🃃','🃄','🃅','🃆','🃇','🃈','🃉','🃊','🃋','🃍','🃎']
    for(let i = 1; i < 13; i++)
    {
        unicode = arraypal[i];
        //let carta = { valor:i,pal:pal,color:color};
        let carta = { CARTA:unicode,VALOR:i,COLOR:color};
        cartes.push(carta);
    }
}

function extreuCarta()
{
    let card = cartes[Math.floor(Math.random()*cartes.length)];
    let index = cartes.indexOf(card);
    cartes.splice(index,1);
    return card;
}

/* GET */
app.get('/api/cartes', (req, res)=>res.send(cartes)); /* Tota la baralla */
/*
app.get('/api/cartes/:pal', (req, res)=>{ // Cartes d'un pal 
    let grup = [];
    let card = cartes.forEach(function(c){
        if (c.pal===req.params.pal) 
            grup.push(c);
    });
    if (!card) res.status(404, 'error');
    res.send(grup);
});
*/

///////////////////////////
//
//  EXTREU CINC CARTES AL-LEATORIES DE LA LLISTA I LES ENVIA AL CLIENT
//
///////////////////////////////////////
//
app.get('/api/cartes/:donamcinc',(req,res)=>{ /* Cinc cartes al-leatories */
    //console.log(`Cartes: ${cartes.length}`);
    let cinc = [];
    for(let i = 0; i < 5;i++)
    {
        let card = extreuCarta();
        cinc.push(card);
    }
    console.log(`Cartes: ${cartes.length}`);
    let jugador = { TOKEN:token(),CARTES:cinc,toString: () =>
         {
            let player ="<b>" + "Id jugador: " + "</b>" + jugador.TOKEN + "<br>";
            let cont = 1;
            jugador.CARTES.forEach(x =>
                {
                   //player += "<b>"+cont.toString()+") </b>" + " " + x.valor.toString()+" "+x.pal+"  " + x.color + "<br>";
                   player += "<b>"+cont.toString()+") </b>" + x.CARTA+"<br>";
                   cont++;
                })
            return player;
        }
    };
    jugadors.push(jugador);
    res.send(jugador.toString());
});


/* PUT */
app.put('/api/cartes/:jugador/:descart', (req, res)=>{
    let token = req.params.jugador;
    let index = req.params.descart;
    let player = jugadors.find(x => x.TOKEN == token)
    
    for(let i = 0; i < index.length;i++)
    {
        let ind = parseInt(index[i])-1;
        let card = extreuCarta();
        player.CARTES[ind] = card;
    }
    console.log(`Cartes ${cartes.length}`);
    res.send(player.toString());
    
    //console.log(token);
});

app.listen(3000, ()=>console.log('inici servidor'));


//////////////////////////////
//
//  RETORNA UN TOKEN ALEATORI ( PER IDENTIFICAR A CADA JUGADOR )
//
/////////////////////////////////////
//
function token() {
    return Math.random().toString(36).substr(2); // Passar nombre a base 36 i eliminar `0.`
};
