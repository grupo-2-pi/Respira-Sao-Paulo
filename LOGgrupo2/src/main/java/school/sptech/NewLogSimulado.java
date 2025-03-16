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

        if(tipo == "[INFO]"){
            for (int i = 0; i < 5; i++) {
                System.out.println(dataHora + " " + tipo + ": Base de dados atualizada com SUCESSO!!");
            }
        }else if(tipo == "[WARNING]"){
            for (int i = 0; i < 5; i++) {
                System.out.println(dataHora + " " + tipo + ": AUSÊNCIA de dados em determinadas tabelas!!");
            }
        }else{
            for (int i = 0; i < 5; i++) {
                System.out.println(dataHora + " " + tipo + ": Banco de dados NÃO ENCONTRADO!! ");
            }
        }


    }


}
