const express = require('express');
const app=express();

app.use(express.urlencoded({extended: true}));
app.use(express.json()) 

/* Enumeracio dels pals de la baralla */
const pals = {
    TREBOLS:"trebols",
    PIQUES:"piques",
    CORS:"cors",
    DIAMANTS:"diamants"
};

/* Construir la baralla de cartes */
let cartes = [];
addPal(pals.DIAMANTS);
addPal(pals.PIQUES);
addPal(pals.CORS);
addPal(pals.TREBOLS);


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
        color = "negre";
    for(let i = 1; i < 14; i++)
    {
        let carta = { valor:i,pal:pal,color:color};
        cartes.push(carta);
    }
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
    console.log(`Cartes: ${cartes.length}`);
    let cinc = [];
    for(let i = 0; i < 5;i++)
    {
        let card = cartes[Math.floor(Math.random()*cartes.length)];
        let index = cartes.indexOf(card);
        console.log(card);
        cinc.push(card);
        cartes.splice(index,1);
    }
    console.log(`Cartes: ${cartes.length}`);
    res.send(cinc);
});

app.listen(3000, ()=>console.log('inici servidor'));
