package com.example.pocker;

import jakarta.validation.constraints.Null;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;


@Path("/pocker")
public class PockerResource {
    BarallaPocker baralla;

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
        return baralla.treuCinc().toString();
    }


}//Fi de la classe