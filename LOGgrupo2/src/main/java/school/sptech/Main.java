package school.sptech;


import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.config.JDBCConfig;
import school.sptech.config.S3Provider;
import school.sptech.database.model.Logger;
import school.sptech.service.*;
import school.sptech.utils.ExcelUtils;
import school.sptech.utils.MapaMunicipiosSP;
import software.amazon.awssdk.services.s3.S3Client;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class Main {

    public static Logger logger = new Logger();
    public static String[] tipos = {"[INFO]", "[WARNING]", "[ERROR]"};
    public static JDBCConfig jdbcConfig = new JDBCConfig();
    private static final MapaMunicipiosSP mapaMunicipios = new MapaMunicipiosSP();
    private final static JdbcTemplate jdbcTemplate = jdbcConfig.getConnection();
    private final static ExcelUtils excelUtils = new ExcelUtils();
    private final static MortalidadeRespiratoriaService mortalidadeService = new MortalidadeRespiratoriaService(logger, excelUtils, jdbcTemplate,mapaMunicipios);
    private static final S3Client s3Client = new S3Provider().getS3Client();
    private static final S3Service s3Service = new S3Service(s3Client, "respirasp-bucket", logger);
    private static final FrotaCirulanteService frotaCirculante = new FrotaCirulanteService(logger, excelUtils, jdbcTemplate,mapaMunicipios);
    private static final EmissaoVeicularService emissaoVeicularService = new EmissaoVeicularService(logger, excelUtils, jdbcTemplate);
    private static final QualidadeArService qualidadeArService = new QualidadeArService(logger, excelUtils, jdbcTemplate,mapaMunicipios);

    public static void main(String[] args) throws IOException{
        iniciarAplicacao();

        List<InputStream> arquivosMortalidade = s3Service.getBucketObjects("mortalidade-respiratoria/");
        mortalidadeService.extrairDados(arquivosMortalidade, true);

        List<InputStream> arquivosFrota = s3Service.getBucketObjects("frota-circulante");
        frotaCirculante.extrairFluxoVeiculos(arquivosFrota);

        String nomeArquivo = "OFICIAL-FATOR-DE-EMISSAO-2011-2023.xlsx";
        List<InputStream> arquivoEmissao = s3Service.getBucketObjects("emissao-veicular/");
        emissaoVeicularService.extrairDadosEmissao(nomeArquivo, arquivoEmissao);

        String arquivoQualidadeNome = "QualidadeArExcel.xlsx";
        List<InputStream> arquivoQualidade = s3Service.getBucketObjects("qualidade-ar/");
        qualidadeArService.extrairDadosQualidadeAr(arquivoQualidadeNome, arquivoQualidade);

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

