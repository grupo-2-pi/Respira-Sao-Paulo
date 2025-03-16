package school.sptech;

import java.util.concurrent.ThreadLocalRandom;

public class Main {


    public static void main(String[] args) {
        Integer tipo = ThreadLocalRandom.current().nextInt(0, 3);

        NewLogSimulado logFuncionado = new NewLogSimulado();

        String[] tipos = {"[INFO]", "[WARNING]", "[ERROR]"};

        logFuncionado.exibirAtualizacao(tipos[tipo]);

    }
}

