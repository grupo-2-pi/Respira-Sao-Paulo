package school.sptech.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class Logger {

    Automation automation = new Automation();

    public String formatarData() {
        LocalDate data = LocalDate.now();
        LocalTime horaAtual = LocalTime.now();
        DateTimeFormatter formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter formatadorHORA = DateTimeFormatter.ofPattern("HH:mm:ss");
        String dataFormatada = data.format(formatador);
        String horaFormatada = horaAtual.format(formatadorHORA);
        return (dataFormatada + " " + horaFormatada);
    }

    public void realizarLog(String tipo){
        String dataFormatada = formatarData();
        String mensagem = "";

        switch(tipo){
            case "[INFO]" -> {
                try{
                    Thread.sleep(2000);
                    mensagem = dataFormatada + " " + tipo + ": Base de dados atualizada com SUCESSO!!";
                }catch (InterruptedException e ){
                    mensagem = dataFormatada + " " + "[ERROR]" + ": Erro durante a atualização da base de dados...";
                }
            }
            case "[WARNING]" -> mensagem = dataFormatada + " " + tipo + ": AUSÊNCIA de dados em determinadas tabelas!!";
            default -> mensagem = dataFormatada + " " + tipo + ": Banco de dados NÃO ENCONTRADO!! ";
        }

        System.out.println(mensagem);
        automation.atualizarArquivoLog(mensagem, dataFormatada);
    }


}
