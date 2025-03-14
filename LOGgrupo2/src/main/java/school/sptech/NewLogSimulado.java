package school.sptech;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class NewLogSimulado {



    String registroLOG() {
        LocalDate data = LocalDate.now();
        LocalTime horaAtual = LocalTime.now();
        DateTimeFormatter formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter formatadorHORA = DateTimeFormatter.ofPattern("HH:mm:ss");
        String dataFormatada = data.format(formatador);
        String horaFormatada = horaAtual.format(formatadorHORA);
        return (dataFormatada + " " + horaFormatada);
    }
    void exibirAtualizacao(String tipo){
        String dataHora = registroLOG();
        
        System.out.println();
    }


}
