package school.sptech.service;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.QualidadeAr;
import school.sptech.database.model.dao.QualidadeArDao;
import school.sptech.utils.ExcelUtils;
import school.sptech.database.model.Logger;

import java.io.InputStream;
import java.util.List;

public class QualidadeArService {

    private final Logger logger;
    private final ExcelUtils excelUtils;
    private final JdbcTemplate jdbcTemplate;
    private final QualidadeArDao qualidadeArDao;

    public QualidadeArService(Logger logger, ExcelUtils excelUtils, JdbcTemplate jdbcTemplate) {
        this.logger = logger;
        this.excelUtils = excelUtils;
        this.jdbcTemplate = jdbcTemplate;
        this.qualidadeArDao = new QualidadeArDao(jdbcTemplate);
    }

    public void extrairDadosQualidadeAr(String nomeArquivo, List<InputStream> arquivos) {
        try {
            for (InputStream arquivo : arquivos) {
                logger.info("\nIniciando leitura do arquivo %s\n".formatted(nomeArquivo));

                Workbook workbook;
                if (nomeArquivo.endsWith(".xlsx")) {
                    workbook = new XSSFWorkbook(arquivo);
                    logger.info("Arquivo xlsx encontrado");
                } else {
                    workbook = new HSSFWorkbook(arquivo);
                    logger.info("Arquivo xls encontrado");
                }

                Sheet sheet = workbook.getSheetAt(0);
                logger.info("Nome da planilha: " + sheet.getSheetName());

                for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                    Row linhaAtual = sheet.getRow(i);
                    if (linhaAtual == null) continue;

                    String[] data = excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(0)).split("-");

                    String mes = data[1];
                    String ano = data[0];

                    String municipio = excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(1));
                    String poluente = excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(2));
                    Double valor = Double.valueOf(excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(3)));
                    String unidade = excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(4));

                    QualidadeAr qualidade = new
                            QualidadeAr
                            (mes,ano, municipio, poluente, valor, unidade);
                    logger.info("Leitura realizada: " + qualidade.toString());
                    qualidadeArDao.save(qualidade);
                    logger.info("Registro salvo no banco");
                }

                workbook.close();
                logger.info("\nLeitura do arquivo finalizada\n");
                arquivo.close();
            }
        } catch (Exception e) {
            logger.error("Erro ao realizar a leitura da planilha de qualidade do ar: " + e.getMessage());
        }
    }
}
