package com.example.pocker;

import java.util.ArrayList;

public class Test {

    public static void main()
    {
        BarallaPocker baralla = new BarallaPocker();
        ArrayList<Carta> resul = baralla.treuCinc();
        System.out.println(resul.toString());
    }

}
