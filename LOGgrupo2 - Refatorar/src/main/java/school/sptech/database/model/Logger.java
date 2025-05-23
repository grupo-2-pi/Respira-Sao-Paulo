package school.sptech.database.model;

import school.sptech.utils.Automation;

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

    public void info(String data){
        String dataFormatada = formatarData();

        System.out.println(dataFormatada + " " +  "[INFO]: " + data);
    }

    public void error(String data){
        String dataFormatada = formatarData();

        System.out.println(dataFormatada + " " +  "[ERROR]: " + data);
    }


}