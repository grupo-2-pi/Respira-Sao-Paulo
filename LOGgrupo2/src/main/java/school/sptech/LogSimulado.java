package school.sptech;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class LogSimulado {

    public static void main(String[] args) {
//LOG DO GRUPO 2 PI - SPRINT1 - 2ASDB
        LogSimulado log = new LogSimulado();

        log.registroLOG(" [INFO]: Inicializando sistema...");
        System.out.println("--------------------------");
        System.out.println("Bem vindo à Respira São Paulo!");

        Scanner leitor = new Scanner(System.in);

        log.efetuarLogin(leitor);

        log.mostrarDashboard();

        boolean atualizou = log.atualizarSistema();

        if (atualizou == false) {
            log.efetuarLogin(leitor);
            log.mostrarDashboard();
        }

        boolean continuaLog = log.ContinuarLogado(leitor);
        if (continuaLog == true) {
            log.mostrarDashboard();
        } else {
            log.registroLOG(" [END]: Desligando sistema... Cuide do nosso ar!");
        }


    }
//METODOSSSSSSSSSSSSSS

    // metodo de login------------------------------------------------------------------------------------------------------
    void efetuarLogin(Scanner leitor) {
        String emailCorreto = "grupo.2@sptech.school";
        String senhaCorreta = "urubu100";
        boolean loginValido = false;
        String mensagem;
        do {
            registroLOG(" [INFO]: Acessando tela de Login...");
            registroLOG(" [USUÁRIO]: Digite seu email: ");

            String email = leitor.nextLine();

            registroLOG(" [USUÁRIO]: Digite sua senha: ");
            String senha = leitor.nextLine();

//            validando se o email e a senha estao certos

            if (email.equals(emailCorreto) && senha.equals(senhaCorreta)) {
                loginValido = true;
                registroLOG(" [INFO]: Login realizado com sucesso. Bem-vindo, admin!");
                System.out.println();
            } else {
                registroLOG(" [ERRO]: Email ou senha inválidos. Tente novamente.");
            }
        } while (!loginValido);
    }

    // metodo dashboard------------------------------------------------------------------------------------------------------------
    void mostrarDashboard() {

//        lista dos municipios de sp
        List<String> listaMunicipios = new ArrayList<>();
        listaMunicipios.addAll(List.of("São Paulo", "Campinas", "Santos", "São José dos Campos", "Ribeirão Preto", "Sorocaba", "Guarulhos", "Osasco", "São Bernardo do Campo", "Barueri"));

//        mostrando as dashs e fazendo random dos municipios

        registroLOG(" [INFO]: Carregando Dashboard de Qualidade do Ar...\n");


        for (int i = 1; i <= 5; i++) {
            int qualidadeAr = ThreadLocalRandom.current().nextInt(1, 151);
            int indice = ThreadLocalRandom.current().nextInt(listaMunicipios.size());
            String municipio = listaMunicipios.get(indice);

            registroLOG(" [INFO]: Dash" + i + " - Nível de MP10 no município " + municipio + ": " + qualidadeAr);

            if (qualidadeAr > 100) {
                registroLOG(" [ALERTA]: Qualidade do ar RUIM nos indicadores da Dashboard " + i + ".");
            } else if (qualidadeAr > 50) {
                registroLOG(" [ALERTA]: Qualidade do ar moderada nos indicadores da Dashboard " + i + ".");
            } else {
                registroLOG(" [ALERTA]: Qualidade do ar OK nos indicadores da Dashboard " + i + ".");
            }
            System.out.println("--------------------------");
        }
    }

    // metodo atualizar sistema---------------------------------------------------------------------------------------------
    boolean atualizarSistema() {
        registroLOG(" [INFO]: Realizando atualização de sistema...");
        registroLOG(" [INFO]: Atualização de dados, perfomance e segurança.");

//        fazendo um numero aleatorio para dar chance de dar erro/acerto

        int simularErro = ThreadLocalRandom.current().nextInt(0, 1);

        if (simularErro == 0) {
            registroLOG(" [ERRO]: Falha na conexão com a AWS.");
            registroLOG(" [INFO]: Pedimos desculpas pelo inconveniente. Recarregando sistema. ↻");

//            porcentagem aleatoria para mostrar o recarregamento do sistema

            int porcentagem = 0;
            while (porcentagem < 100) {
                porcentagem += ThreadLocalRandom.current().nextInt(10, 21);
                if (porcentagem > 100) {
                    porcentagem = 100;
                }
                System.out.println(porcentagem + "%");
            }

            System.out.println("--------------------------");
            System.out.println("\uD83D\uDE00 Bem-vindo de novo! \uD83D\uDE00");
            registroLOG(" [INFO]: Deve-se efetuar o login novamente.");
            return false;
        } else {
            registroLOG(" [INFO]: Sistema operando normalmente.");
            registroLOG(" [INFO]: Dashboard atualizada com sucesso.");
            return true;
        }
    }

    boolean ContinuarLogado(Scanner leitor) {
        registroLOG(" [INFO]: Deseja continuar logado? (Sim/Não)");

//            listas para continuar ou nao logado
        List<String> listaLogoutNAO;
        List<String> listaLogoutSIM;

        listaLogoutNAO = new ArrayList<>();
        listaLogoutNAO.addAll(List.of("Não", "não", "Nao", "nao", "nAo", "naO", "NAO", "NÃO", "NâO", "nÃo"));

        listaLogoutSIM = new ArrayList<>();
        listaLogoutSIM.addAll(List.of("Sim", "sim", "sIM", "sIm", "siM"));

//            sim ou nao
        String resposta = leitor.nextLine();

        if (listaLogoutSIM.contains(resposta)) {

            return true;
        } else {
            return false;
        }

    }

    //        metodo de data e hora
    void registroLOG(String mensagem) {
        LocalDate data = LocalDate.now();
        LocalTime horaAtual = LocalTime.now();
        DateTimeFormatter formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter formatadorHORA = DateTimeFormatter.ofPattern("HH:mm:ss");
        String dataFormatada = data.format(formatador);
        String horaFormatada = horaAtual.format(formatadorHORA);
        System.out.println(dataFormatada + " " + horaFormatada + mensagem);
    }


}
