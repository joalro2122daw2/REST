package com.example.pocker;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.lang.System;


public class BarallaPocker
{
    ArrayList<Carta> baralla;

    public BarallaPocker()
    {
        baralla = new ArrayList<>();
        omplirBaralla();
    }

    ////////////////////////////
    //
    //  OMPLE LA BARALLA AMB LES 48 CARTES DEL DIFERENTS PALS
    //
    ///////////////////////////////////////
    //
    private void omplirBaralla()
    {
        String color ="";
        List<String> unicodepairs = null;
       for(Pals p:Pals.values())
       {
           switch(p)
           {
               // Surrogate pairs
               case piques:
                       unicodepairs = Arrays.asList("\uD83C\uDCA1","\uD83C\uDCA2","\uD83C\uDCA3","\uD83C\uDCA4",
                               "\uD83C\uDCA5","\uD83C\uDCA6","\uD83C\uDCA7","\uD83C\uDCA8","\uD83C\uDCA9",
                               "\uD83C\uDCAA","\uD83C\uDCAB","\uD83C\uDCAC","\uD83C\uDCAD","\uD83C\uDCAE");
                       color = "negre";
                       break;
               case cors:
                   unicodepairs = Arrays.asList("\uD83C\uDCB1","\uD83C\uDCB2","\uD83C\uDCB3","\uD83C\uDCB4",
                           "\uD83C\uDCB5","\uD83C\uDCB6","\uD83C\uDCB7","\uD83C\uDCB8","\uD83C\uDCB9",
                           "\uD83C\uDCBA","\uD83C\uDCBB","\uD83C\uDCBC","\uD83C\uDCBD","\uD83C\uDCBE");
                   color = "vermell";
                   break;
               case diamants:
                   unicodepairs = Arrays.asList("\uD83C\uDCC1","\uD83C\uDCC2","\uD83C\uDCC3","\uD83C\uDCC4",
                           "\uD83C\uDCC5","\uD83C\uDCC6","\uD83C\uDCC7","\uD83C\uDCC8","\uD83C\uDCC9",
                           "\uD83C\uDCCA","\uD83C\uDCCB","\uD83C\uDCCC","\uD83C\uDCCD","\uD83C\uDCCE");
                   color = "vermell";
                   break;
               case trebols:
                   unicodepairs = Arrays.asList("\uD83C\uDCD1","\uD83C\uDCD2","\uD83C\uDCD3","\uD83C\uDCD4",
                           "\uD83C\uDCD5","\uD83C\uDCD6","\uD83C\uDCD7","\uD83C\uDCD8","\uD83C\uDCD9",
                           "\uD83C\uDCDA","\uD83C\uDCDB","\uD83C\uDCDC","\uD83C\uDCDD","\uD83C\uDCDE");
                   color = "negre";
                   break;
           }

           for(int i = 1;i < 13;i++) {
               baralla.add(new Carta(p, i, unicodepairs.get(i-1),color));
           }
       }
    }

    ////////////////////////////////////////
    //
    // RETORNA CINC CARTES ESCOGIDES ALEATORIAMENT DE LA BARALLA I LES ELIMINA DE LA BARALLA
    //
    ////////////////////////////////////
    //
    public ArrayList<Carta> treuCinc()
    {
        ArrayList<Carta> ma = new ArrayList<>();
        for(int i = 0; i < 5;i++)
        {
            Carta carta = treuUna();
            ma.add(carta);
        }
        return ma;
    }

    public Carta treuUna()
    {
        Random r  = new Random();
        int num = (int)(Math.random() * (baralla.size()-1));
        Carta carta = baralla.get(num);
        baralla.remove(num);
        return carta;
    }


}
