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

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class MortalidadeRespiratoriaService {

    private final Logger logger;
    private final ExcelUtils excelUtils;
    private final JdbcTemplate jdbcTemplate;
    private final MortalidadeDao mortalidadeDao;

    public MortalidadeRespiratoriaService(Logger logger, ExcelUtils excelUtils, JdbcTemplate jdbcTemplate) {
        this.logger = logger;
        this.excelUtils = excelUtils;
        this.jdbcTemplate = jdbcTemplate;
        this.mortalidadeDao = new MortalidadeDao(jdbcTemplate);
    }

    public void extrairDados(InputStream arquivo, Boolean xlsx) {
        try {
            logger.info("Iniciando leitura do arquivo de mortalidade");

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
                if(row.getRowNum() == 1 || row.getRowNum() == 0){
                    continue;
                }

                logger.info("Realizando leitura da linha " + row.getRowNum());

                MortalidadeRespiratoria mortalidadeRespiratoria = new MortalidadeRespiratoria(
                        excelUtils.getValorCelulaComoTexto(row.getCell(0)).substring(0,6),
                        row.getCell(3).getNumericCellValue(),
                        (int) row.getCell(2).getNumericCellValue(),
                        (int) row.getCell(4).getNumericCellValue(),
                        row.getCell(5).getNumericCellValue(),
                        ""
                );


                logger.info("Mortalidade extraida: " + mortalidadeRespiratoria.toString());

                mortalidadeDao.save(mortalidadeRespiratoria);
            }

            workbook.close();

            logger.info("Leitura finalizada com sucesso\n");
        } catch (IOException e) {
            logger.error("Erro ao realizar a leitura do arquivo relacionado as doenças " + e.getMessage());
        }
    }
}
