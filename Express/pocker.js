const express = require('express');
const app=express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('publica'));
app.use(express.json()); 


/* Enumeracio dels pals de la baralla */
const pals = {
    TREBOLS:"trebols",
    PIQUES:"piques",
    CORS:"cors",
    DIAMANTS:"diamants"
};

/* Per a la baralla de cartes { CARTA:unicode, VALOR:nombre, COLOR:string }*/
let cartes = [];
/* Llista de jugadors { TOKEN:token ,CARTES:cinc cartes};*/
let jugadors = [];


addPal(pals.DIAMANTS);
addPal(pals.PIQUES);
addPal(pals.CORS);
addPal(pals.TREBOLS);







//------------------- Peticions ------------------------------


/* Permitir cors */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', '*');
    next();
  });


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
    let ma = [];
    for(let i = 0; i < 5;i++)
    {
        let card = extreuCarta();
        ma.push(card);
    }
    console.log(`Cartes: ${cartes.length}`);
    let jugador = { TOKEN:token(),CARTES:ma};
    jugadors.push(jugador);
    res.send(JSON.stringify(jugador));
});


/* PUT */
app.put('/api/cartes/:jugador/:descart', (req, res)=>{
    let token = req.params.jugador;
    let index = req.params.descart;
    let player = jugadors.find(x => x.TOKEN === token)
    
    for(let i = 0; i < index.length;i++)
    {
        let ind = parseInt(index[i])-1;
        let card = extreuCarta();
        player.CARTES[ind] = card;
    }
    console.log(`Cartes ${cartes.length}`); 
    res.send(JSON.stringify(player));
});

app.listen(3000, ()=>console.log(`inici servidor ${cartes.length} cartes a la baralla.`));



//-------------------------- Funcions auxiliars ----------------------------


//////////////////////////////
//
//  RETORNA UN TOKEN ALEATORI ( PER IDENTIFICAR A CADA JUGADOR )
//
/////////////////////////////////////
//
function token() {
    return Math.random().toString(36).substring(2); // Passar nombre a base 36 i eliminar `0.`
};

/////////////////////
//
// EXTREU UNA CARTA DE LA BARALLA DE MANERA ALEATORIA Y LA
// ELIMINA D'AQUESTA
//
////////////////////////////////
//
function extreuCarta()
{
    let card = cartes[Math.floor(Math.random()*cartes.length)];
    let index = cartes.indexOf(card);
    cartes.splice(index,1);
    return card;
}

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
    let arraypal;
    if(pal == pals.TREBOLS)
        arraypal = ['🃑','🃒','🃓','🃔','🃕','🃖','🃗','🃘','🃙','🃚','🃛','🃝','🃞'];
    else if(pal == pals.CORS)
        arraypal = ['🂱','🂢','🂣','🂴','🂵','🂶','🂷','🂸','🂹','🂺','🂻','🂽','🂾'];
    else if(pal == pals.PIQUES)
        arraypal = ['🂡','🂢','🂣','🂤','🂥','🂦','🂧','🂨','🂩','🂪','🂫','🂭','🂮'];
    else if(pal == pals.DIAMANTS)
        arraypal = ['🃁','🃂','🃃','🃄','🃅','🃆','🃇','🃈','🃉','🃊','🃋','🃍','🃎'];

    arraypal.forEach(pal => {
        let carta = { CARTA:pal,VALOR:pal.index+1,COLOR:color};
        cartes.push(carta);
    })
}
