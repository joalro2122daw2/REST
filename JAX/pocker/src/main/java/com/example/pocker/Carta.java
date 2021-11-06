package com.example.pocker;

public class Carta {
    Pals pal;
    int valor;
    String unicode;
    String color;

    public Carta(Pals pal,int val,String unicodepair,String col)
    {
        this.pal = pal;
        unicode = unicodepair;
        valor = val;
        color = col;
    }

    @Override
    public String toString()
    {
        //return pal + "  " + Integer.toString(valor) + "  " + color;
        return unicode;
    }
}
