package school.sptech;


import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.config.JDBCConfig;
import school.sptech.config.S3Provider;
import school.sptech.database.model.Logger;
import school.sptech.service.DoencasService;
import school.sptech.service.FluxoVeiculosService;
import school.sptech.service.MortalidadeRespiratoriaService;
import school.sptech.service.S3Service;
import school.sptech.utils.ExcelUtils;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.S3Object;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class Main {
    public static Logger logger = new Logger();
    public static String[] tipos = {"[INFO]", "[WARNING]", "[ERROR]"};
    public static JDBCConfig jdbcConfig = new JDBCConfig();
    private final static JdbcTemplate jdbcTemplate = jdbcConfig.getConnection();
    private final static ExcelUtils excelUtils = new ExcelUtils();
    private final static MortalidadeRespiratoriaService mortalidadeService = new MortalidadeRespiratoriaService(logger, excelUtils, jdbcTemplate);
    private static final S3Client s3Client = new S3Provider().getS3Client();
    private static final S3Service s3Service = new S3Service(s3Client, "respirasp-bucket", logger);


    public static void main(String[] args) throws IOException{
        iniciarAplicacao();

        InputStream arquivoMortalidade = s3Service.getBucketObjects("Bibilioteca dados - CONVISA JAN-2022.xlsx");

        mortalidadeService.extrairDados(arquivoMortalidade, true);

//        InputStream arquivoFrota = s3Service.getBucketObjects("BaseDeDados-Respira-SP.xlsx");
//
//        fluxoVeiculosService.extrairFluxoVeiculos(arquivoFrota, true);

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

