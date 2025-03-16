package school.sptech;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class Logger {

    String formatarData() {
        LocalDate data = LocalDate.now();
        LocalTime horaAtual = LocalTime.now();
        DateTimeFormatter formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter formatadorHORA = DateTimeFormatter.ofPattern("HH:mm:ss");
        String dataFormatada = data.format(formatador);
        String horaFormatada = horaAtual.format(formatadorHORA);
        return (dataFormatada + " " + horaFormatada);
    }

    void realizarLog(String tipo){
        String dataHora = formatarData();

        switch(tipo){
            case "[INFO]" -> {
                try{
                    Thread.sleep(2000);
                    System.out.println(dataHora + " " + tipo + ": Base de dados atualizada com SUCESSO!!");
                }catch (InterruptedException e ){
                    System.out.println(dataHora + " " + "[ERROR]" + ": Erro durante a atualização da base de dados...");
                }
            }
            case "[WARNING]" -> System.out.println(dataHora + " " + tipo + ": AUSÊNCIA de dados em determinadas tabelas!!");
            default -> System.out.println(dataHora + " " + tipo + ": Banco de dados NÃO ENCONTRADO!! ");
        }
    }


}
