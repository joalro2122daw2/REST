package com.example.pocker;

import jakarta.validation.constraints.Null;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.ArrayList;


@Path("/pocker")
public class PockerResource {
    static BarallaPocker baralla;
    static ArrayList<Jugador> jugadors;



    @GET
    @Path("/totes")
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        if(baralla == null)
            baralla = new BarallaPocker();
        return baralla.baralla.toString();
    }

    @GET
    @Path("/donamcinc")
    @Produces(MediaType.TEXT_PLAIN)
    public String obtenirCartes()
    {
        if(baralla == null)
            baralla = new BarallaPocker();
        if(jugadors == null)
            jugadors = new ArrayList<>();

        ArrayList<Carta> ma = baralla.treuCinc();
        Jugador jugador = new Jugador(ma);
        jugadors.add(jugador);
        return jugador + " Queden: " + baralla.baralla.size() + " cartes";
    }

    @PUT
    @Path("/descart")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.TEXT_PLAIN)
    public String canviarCartes(@FormParam("token") String token,@FormParam("descart") String descart)
    {
        //Jugador player = (Jugador) jugadors.stream().filter(jugador -> jugador.token.equals(token));
        Jugador player = obtenirJugador(token);
        for(int i = 0;i < descart.length();i++)
        {
            int index =Integer.parseInt(descart.charAt(i)+"")-1;
            Carta nova = baralla.treuUna();
            player.ma.set(index,nova);
        }
        return player + " Queden: " + baralla.baralla.size() + " cartes";
    }

    private static Jugador obtenirJugador(String token)
    {
        for(Jugador j:jugadors)
        {
            if(j.token.equals(token))
                return j;
        }
        return null;
    }


}//Fi de la classe