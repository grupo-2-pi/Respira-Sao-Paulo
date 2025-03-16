package school.sptech;

import school.sptech.entity.Logger;

import java.util.concurrent.ThreadLocalRandom;

public class Main {
    static Logger logger = new Logger();
    static String[] tipos = {"[INFO]", "[WARNING]", "[ERROR]"};

    public static void main(String[] args) {
        iniciarAplicacao();

        for(var i = 0; i <= 20; i++){
            Integer tipo = ThreadLocalRandom.current().nextInt(0, 3);
            logger.realizarLog(tipos[tipo]);
        }

    }

    static void iniciarAplicacao(){
        System.out.println("\n" +
                "\n" +
                " ____                 _             ____   /\\/|         ____             _       \n" +
                "|  _ \\ ___  ___ _ __ (_)_ __ __ _  / ___| |/\\/_  ___   |  _ \\ __ _ _   _| | ___  \n" +
                "| |_) / _ \\/ __| '_ \\| | '__/ _` | \\___ \\ / _` |/ _ \\  | |_) / _` | | | | |/ _ \\ \n" +
                "|  _ <  __/\\__ \\ |_) | | | | (_| |  ___) | (_| | (_) | |  __/ (_| | |_| | | (_) |\n" +
                "|_| \\_\\___||___/ .__/|_|_|  \\__,_| |____/ \\__,_|\\___/  |_|   \\__,_|\\__,_|_|\\___/ \n" +
                "               |_|                                                               \n" +
                "\n");

        System.out.println("-----------------------------------------------------------------------------------------");

        System.out.println(logger.formatarData() + " Aplicação iniciada");

        System.out.println("-----------------------------------------------------------------------------------------");
    }
}

