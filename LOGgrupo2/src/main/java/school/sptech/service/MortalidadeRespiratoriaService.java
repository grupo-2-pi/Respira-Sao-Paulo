package school.sptech.service;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.Doenca;
import school.sptech.database.model.Logger;
import school.sptech.database.model.MortalidadeRespiratoria;
import school.sptech.database.model.dao.MortalidadeDao;
import school.sptech.utils.ExcelUtils;
import software.amazon.awssdk.services.s3.model.S3Object;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MortalidadeRespiratoriaService {

    private final Logger logger;
    private final ExcelUtils excelUtils;
    private final JdbcTemplate jdbcTemplate;
    private final MortalidadeDao mortalidadeDao;
    private final S3Service s3Service;

    public MortalidadeRespiratoriaService(Logger logger, ExcelUtils excelUtils, JdbcTemplate jdbcTemplate, S3Service s3Service) {
        this.logger = logger;
        this.excelUtils = excelUtils;
        this.jdbcTemplate = jdbcTemplate;
        this.mortalidadeDao = new MortalidadeDao(jdbcTemplate);
        this.s3Service = s3Service;
    }

    public void extrairDados(List<S3Object> objetos, Boolean xlsx) {
        try {
            for (S3Object objeto : objetos) {
                logger.info("Iniciando leitura do arquivo de mortalidade");

                InputStream arquivo = s3Service.convertObjectToInputStream(objeto);

                if(arquivo == null) continue;

                Workbook workbook;
                if (xlsx) {
                    workbook = new XSSFWorkbook(arquivo);
                } else {
                    workbook = new HSSFWorkbook(arquivo);
                }

                Sheet sheet = workbook.getSheetAt(0);
                List<Doenca> doencasExtraidas = new ArrayList<>();

                logger.info("Ultima linha " + sheet.getLastRowNum());

                for (Row row : sheet ) {
                    String celulaMunicipio = excelUtils.getValorCelulaComoTexto(row.getCell(0));
                    if(celulaMunicipio.startsWith("Fonte") || celulaMunicipio.startsWith("Total")){
                        break;
                    }

                    if(row.getRowNum() == 1 || row.getRowNum() == 0){
                        continue;
                    }

                    logger.info("Realizando leitura da linha " + row.getRowNum());

                    String valorTotalSemPonto = excelUtils.getValorCelulaComoTexto(row.getCell(3)).replace(".", "");
                    String valorTotalFormatado = valorTotalSemPonto.replaceAll(",", ".");

                    String internacoesSemPonto = excelUtils.getValorCelulaComoTexto(row.getCell(2)).replace(".", "");
                    String obitosSemPonto = excelUtils.getValorCelulaComoTexto(row.getCell(4)).replace(".","");
                    String taxaSemPonto = excelUtils.getValorCelulaComoTexto(row.getCell(5)).replace(".", "");
                    String taxaFormatada =taxaSemPonto.replace(",", ".");

                    String data = objeto.key().split("mortalidade-respiratoria/Biblioteca dados - CONVISA ")[1];
                    String mes = data.split("-")[0];
                    String ano = data.split("-")[1].split(".xlsx")[0];

                    MortalidadeRespiratoria mortalidadeRespiratoria = new MortalidadeRespiratoria(
                            excelUtils.getValorCelulaComoTexto(row.getCell(0)),
                            valorTotalFormatado.equals("-") ? null : Double.valueOf(valorTotalFormatado),
                            internacoesSemPonto.equals("-") ? null : Double.valueOf(internacoesSemPonto),
                            obitosSemPonto.equals("-") ? null : Integer.valueOf(obitosSemPonto),
                            taxaFormatada.equals("-") ? null : Double.valueOf(taxaFormatada),
                            "",
                            mes,
                            ano
                    );

                    String mesAno = excelUtils.getValorCelulaComoTexto(sheet.getRow(0).getCell(1));

                    mortalidadeRespiratoria.setMesAno(mesAno);

                    logger.info("Mortalidade extraida: " + mortalidadeRespiratoria.toString());

                    mortalidadeDao.save(mortalidadeRespiratoria);
                }

                workbook.close();

                logger.info("Leitura finalizada com sucesso\n");
            }
        } catch (Exception e) {
            logger.error("Erro ao realizar a leitura do arquivo relacionado as doenças " + e.getMessage()  + Arrays.toString(e.getStackTrace()));
        }
    }
}
