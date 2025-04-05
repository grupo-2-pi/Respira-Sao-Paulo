package school.sptech.utils;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;

public class Automation {

    public void atualizarArquivoLog(String content, String date){
        LocalDate currentDate = LocalDate.now();
        String year = String.valueOf(currentDate.getYear());
        String month = String.format("%02d", currentDate.getMonthValue());
        String day = String.valueOf(currentDate.getDayOfMonth());


        // Caminha para o diretório raiz do projeto
        Path rootPath = Paths.get("").toAbsolutePath();
        while (rootPath.getParent() != null && !new File(rootPath.toFile(), ".git").exists()) {
            rootPath = rootPath.getParent();
        }

        // Cria o diretorio de logs seguindo o padrao -> logs/ano/mês
        File logsDirectory = new File(rootPath.toFile(), "logs" + File.separator + year + File.separator + month);
        if (!logsDirectory.exists()) {
            boolean created = logsDirectory.mkdirs();
            if (!created) {
                System.err.println("Falha ao criar diretório: " + logsDirectory.getAbsolutePath());
                return;
            }
        }

        // Criar arquivo dentro do diretório
        File targetFile = new File(logsDirectory, day +".txt");
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(targetFile, true))) {
            writer.write(content);
            writer.newLine();
            System.out.println(date + " [INFO] Arquivo de log atualizado: " + targetFile.getAbsolutePath());
        } catch (IOException e) {
            System.err.println(date + " [ERROR] Erro atualizar o arquivo de log: " + e.getMessage());
        }

    }

}
