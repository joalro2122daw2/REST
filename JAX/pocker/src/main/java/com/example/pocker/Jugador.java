package com.example.pocker;

import java.util.ArrayList;

public class Jugador
{
    String token;
    ArrayList<Carta> ma;

    public Jugador(ArrayList<Carta> cartes)
    {
        ma = cartes;
        token = generaToken();
    }


    private String generaToken()
    {
        int aleat = (int)(Math.random()*100000000);
        return Integer.toString(aleat,36);
    }

    @Override
    public String toString()
    {
        String mastring ="";
        for(Carta c:ma)
            mastring += c.toString()+" ";
        return token + ": "+mastring;
    }
}
