package school.sptech.service;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.OLE2NotOfficeXmlFileException;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.EmissaoVeicular;
import school.sptech.database.model.EmissaoVeicular;
import school.sptech.database.model.Logger;
import school.sptech.database.model.dao.EmissaoVeicularDao;
import school.sptech.utils.ExcelUtils;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;

public class EmissaoVeicularService {

    private final Logger logger;
    private final ExcelUtils excelUtils;
    private final JdbcTemplate jdbcTemplate;
    private final EmissaoVeicularDao emissaoVeicularDao;

    public EmissaoVeicularService(Logger logger, ExcelUtils excelUtils, JdbcTemplate jdbcTemplate) {
        this.logger = logger;
        this.excelUtils = excelUtils;
        this.jdbcTemplate = jdbcTemplate;
        this.emissaoVeicularDao = new EmissaoVeicularDao(jdbcTemplate);
    }

    public void extrairDadosEmissao(String nomeArquivo, List<InputStream> arquivos) {
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

                    String tipoVeiculo = excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(0));
                    int ano = Integer.parseInt(excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(1)));

                    System.out.println(Double.parseDouble(excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(2))));

                    EmissaoVeicular emissao = new EmissaoVeicular(
                            tipoVeiculo,
                            ano,
                            Double.parseDouble(excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(2))),
                            Double.parseDouble(excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(3))),
                            Double.parseDouble(excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(4))),
                            Double.parseDouble(excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(5))),
                            Double.parseDouble(excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(6))),
                            Double.parseDouble(excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(7))),
                            Double.parseDouble(excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(8)))
                    );

                    logger.info("Emissão veicular extraída: " + emissao.toString());
                    emissaoVeicularDao.save(emissao);
                    logger.info("Emissão veicular salva no banco");
                }

                workbook.close();
                logger.info("\nLeitura do arquivo finalizada\n");
                arquivo.close();
            }
        } catch (Exception e) {
            logger.error("Erro ao realizar a leitura da planilha de emissão veicular: " + e.getMessage());
        }
    }
}