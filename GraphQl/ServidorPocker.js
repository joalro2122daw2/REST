const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');


const esquema = buildSchema(`

    type Carta{
        pal: String!
        valor: Int!
        color: String!
    }

    type Baralla{
        cartes:[Carta]
        pals:[String]
        mostrarBaralla:String
        obtenirCartes(cant:Int!):[Carta]
    }

    type Jugador{
        token:String
        ma:[Carta]              
    }

    type Query{
        enviamFormulari:String
        obtenirBaralla:Baralla
        afegirJugador:Jugador
        getToken(index:Int):String
        descart(token:String,descartades:String):[Carta]
    }
`);


var baralla;
var jugadors = [];

const arrel={
    obtenirBaralla: () => {
        if(baralla === undefined)
            baralla = new Baralla();
        return baralla;
      }, 
    afegirJugador:() =>{
        let player = new Jugador();
        jugadors.push(player);
        return player;
    },
    descart:({token,descartades}) =>{
       console.log("toquenjugador: " + token);
       let player = jugadors.find(x => x.token === token)
        if(player === undefined)
            return null;   
        //console.log("Novolgudes: " + Object.keys(novolgudes));
        for(let i = 0; i < descartades.length;i++)
        {
            let ind = parseInt(descartades[i])-1;
            let card = baralla.obtenirCartes({"cant":1});           
            player.ma[ind] = card[0];
        }
        console.log(`Queden cartes ${baralla.cartes.length} a la baralla`);
        return player.ma;
    },
    getToken:({index}) =>{
        if(index > jugadors.length || jugadors.length === 0)
            return "fuera de limites";
        return (jugadors[index]).token;
    }
    
}//arrel

const app = express();
app.use(express.static('public'));
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: esquema,
  rootValue: arrel,
  graphiql: true,
}));
app.listen(4000);
console.log('Executant servidor GraphQL API a http://localhost:4000/graphql');

class Carta{
    constructor(type,value,colour){
        this.pal = type;
        this.valor = value;
        this.color = colour;
    }
}

class Baralla{
    cartes = [];
    pals =["diamants","piques","cors","trebols"];
    constructor(){
            if(baralla===undefined)
            {
                this.pals.forEach(pal => {
                    let color ="vermell";
                    if(pal === "trebols" || pal === "piques")
                        color = "negre";
                    let arraypal = [];
                    if(pal === "trebols")
                        arraypal = ['🃑','🃒','🃓','🃔','🃕','🃖','🃗','🃘','🃙','🃚','🃛','🃝','🃞'];
                    else if(pal === "cors")
                        arraypal = ['🂱','🂢','🂣','🂴','🂵','🂶','🂷','🂸','🂹','🂺','🂻','🂽','🂾'];
                    else if(pal === "piques")
                        arraypal = ['🂡','🂢','🂣','🂤','🂥','🂦','🂧','🂨','🂩','🂪','🂫','🂭','🂮'];
                    else if(pal === "diamants")
                        arraypal = ['🃁','🃂','🃃','🃄','🃅','🃆','🃇','🃈','🃉','🃊','🃋','🃍','🃎'];
                    let unicode = "";
                    for(let i = 0; i < 13; i++)
                    {
                        unicode = arraypal[i];
                        this.cartes.push(new Carta(unicode,i+1,color));                    
                    }
                });//foreach  
                baralla = this;
            }
            else
            {
                this.cartes = baralla.cartes;
            }                           
        }

            mostrarBaralla(){   
                console.log("Llistacartes: " + this.cartes.length);             
                let llistacartes = "";
                this.cartes.forEach(carta => {
                    llistacartes += carta.pal + ';';                    
                });
                return llistacartes;
            }

            obtenirCartes (cant){
                if(this.cartes.length === 0)
                    return;
                let ma = [];                   
                for(let i = 0; i < cant.cant; i++)
                {                        
                    let card = this.cartes[Math.floor(Math.random()*this.cartes.length)];                   
                    ma.push(card);
                    let index = this.cartes.indexOf(card);
                    this.cartes.splice(index,1);
                }
                console.log("Queden: " + this.cartes.length + " cartes a la baralla.");  
                //console.log("En obtenir cartes: " + ma.length);                        
                return ma;
            } 
    }

    class Jugador
    {
        token;
        ma;
        constructor()
        {            
            this.token = this.generarToken();            
            this.ma = baralla.obtenirCartes({"cant":5});
        }

        generarToken()
        {
            return Math.random().toString(36).substring(2); // Passar nombre a base 36 i eliminar `0.`
        }   
    }

    