import okhttp3.*;

import java.io.IOException;
import java.util.Scanner;

public class Consumidor {
    public static void main(String[] args) {

        int opcio = 0;
        Scanner scan = new Scanner(System.in);
        while(opcio < 1 || opcio > 3) {
            System.out.println("1) Obtenir cartes");
            System.out.println("2) Descart");
            System.out.println("3) Sortir");
            System.out.println("Intoduir opcio");
            try {
                opcio = scan.nextInt();
            } catch (NumberFormatException e) {
                System.out.println("Si us plau introdueix 1 o 2");
                opcio = 0;
            }

            switch (opcio)
            {
                case 1:
                    donamcinc();
                    break;
                case 2:
                    descart();
                    break;
                case 3:
                    System.exit(0);
                    break;
            }
            opcio = 0;
        }
    }

    public static void donamcinc()
    {
        OkHttpClient client = new OkHttpClient().newBuilder()
                .build();
        Request request = new Request.Builder()
                .url("http://localhost:8080/pocker_war_exploded/api/pocker/donamcinc")
                .method("GET", null)
                .build();
        try {
            Response response = client.newCall(request).execute();
            System.out.println(response.body().string());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void descart()
    {
        Scanner scan = new Scanner(System.in);
        System.out.println("Introdueix el teu token");
        String token = scan.next();
        System.out.println("Introdueix els index de les cartes que no vols sense espais");
        String desc = scan.next();
        canviaCartes(token,desc);
    }

    private static void canviaCartes(String token,String descart)
    {
        OkHttpClient client = new OkHttpClient().newBuilder()
                .build();
        MediaType mediaType = MediaType.parse("application/x-www-form-urlencoded");
        RequestBody body = RequestBody.create(mediaType, "token=ci1fb&descart=123");
        Request request = new Request.Builder()
                .url("http://localhost:8080/pocker_war_exploded/api/pocker/descart/"+token+"/"+descart)
                .method("PUT", body)
                .addHeader("Content-Type", "application/x-www-form-urlencoded")
                .build();
        try {
            Response response = client.newCall(request).execute();
            System.out.println(response.body().string());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}

