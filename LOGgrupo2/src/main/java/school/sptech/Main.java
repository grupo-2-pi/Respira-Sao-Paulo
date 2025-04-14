package school.sptech;


import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.config.JDBCConfig;
import school.sptech.database.model.Logger;
import school.sptech.service.DoencasService;
import school.sptech.service.FluxoVeiculosService;
import school.sptech.utils.ExcelUtils;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class Main {
    public static Logger logger = new Logger();
    public static String[] tipos = {"[INFO]", "[WARNING]", "[ERROR]"};
    public static JDBCConfig jdbcConfig = new JDBCConfig();
    private final static JdbcTemplate jdbcTemplate = jdbcConfig.getConnection();
    private final static ExcelUtils excelUtils = new ExcelUtils();
    private final static DoencasService doencasService = new DoencasService(logger, excelUtils,jdbcTemplate );
    private final static FluxoVeiculosService fluxoVeiculosService = new FluxoVeiculosService(logger, excelUtils,jdbcTemplate);


    public static void main(String[] args) throws IOException{
        iniciarAplicacao();

        String caminhoArquivo = "./BaseDeDados-Respira-SP.xlsx";

        InputStream arquivo = new FileInputStream(caminhoArquivo);

        doencasService.extrairDoencas(caminhoArquivo, arquivo);

        InputStream arquivoSenatran = new FileInputStream(caminhoArquivo);

        fluxoVeiculosService.extrairFluxoVeiculos(caminhoArquivo, arquivoSenatran);

        encerrarAplicacao();
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

    static void encerrarAplicacao(){
        System.out.println("-----------------------------------------------------------------------------------------");

        System.out.println(logger.formatarData() + " Aplicação encerrada");

        System.out.println("-----------------------------------------------------------------------------------------");
    }

}

