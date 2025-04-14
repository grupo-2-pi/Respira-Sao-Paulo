package school.sptech.service;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.Doenca;
import school.sptech.database.model.Logger;
import school.sptech.utils.ExcelUtils;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class DoencasService {

    private final Logger logger;
    private final ExcelUtils excelUtils;
    private final JdbcTemplate jdbcTemplate;

    public DoencasService(Logger logger, ExcelUtils excelUtils, JdbcTemplate jdbcTemplate) {
        this.logger = logger;
        this.excelUtils = excelUtils;
        this.jdbcTemplate = jdbcTemplate;
    }

    public void extrairDoencas(String nomeArquivo, InputStream arquivo) {
        try {
            logger.info("Iniciando leitura do arquivo %s".formatted(nomeArquivo));

            Workbook workbook;
            if (nomeArquivo.endsWith(".xlsx")) {
                workbook = new XSSFWorkbook(arquivo);
            } else {
                workbook = new HSSFWorkbook(arquivo);
            }

            Sheet sheet = workbook.getSheetAt(0);
            List<Doenca> doencasExtraidas = new ArrayList<>();

            logger.info("Ultima linha " + sheet.getLastRowNum());

            for (Row row : sheet ) {
                if(
                        row.getCell(0).getStringCellValue().startsWith("Lista Morb") ||
                        row.getCell(0).getStringCellValue().startsWith("Total")
                ){
                    continue;
                }


                if(row.getRowNum() == 262){
                    break;
                }

                if (row.getRowNum() == 0) {
                    logger.info("Lendo cabeçalho");
                    for (int i = 0; i < 9; i++) {
                        String coluna = row.getCell(i).getStringCellValue();
                        logger.info("Coluna atual " + i + ": " + coluna);
                    }
                    System.out.println("--------------------");
                    continue;
                }

                logger.info("Realizando leitura da linha " + row.getRowNum());

                Doenca doenca = new Doenca(
                        excelUtils.getValorCelulaComoTexto(row.getCell(0)),
                        excelUtils.getValorCelulaComoTexto(row.getCell(1)),
                        excelUtils.getValorCelulaComoTexto(row.getCell(2)),
                        excelUtils.getValorCelulaComoTexto(row.getCell(3)),
                        excelUtils.getValorCelulaComoTexto(row.getCell(4)),
                        excelUtils.getValorCelulaComoTexto(row.getCell(5)),
                        excelUtils.getValorCelulaComoTexto(row.getCell(6)),
                        excelUtils.getValorCelulaComoTexto(row.getCell(7)),
                        excelUtils.getValorCelulaComoTexto(row.getCell(63))
                );


                logger.info("Doença extraida: " + doenca.toString());

//                jdbcTemplate.update("INSERT INTO ");
            }

            workbook.close();

            logger.info("Leitura finalizada com sucesso\n");
        } catch (IOException e) {
            logger.error("Erro ao realizar a leitura do arquivo relacionado as doenças " + e.getMessage());
        }
    }

}
