package school.sptech.service;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.FluxoVeiculos;
import school.sptech.database.model.Logger;
import school.sptech.utils.ExcelUtils;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class FluxoVeiculosService {

    private final Logger logger;
    private final ExcelUtils excelUtils;
    private final JdbcTemplate jdbcTemplate;

    public FluxoVeiculosService(Logger logger, ExcelUtils excelUtils, JdbcTemplate jdbcTemplate) {
        this.logger = logger;
        this.excelUtils = excelUtils;
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<FluxoVeiculos> extrairFluxoVeiculos(InputStream arquivo, Boolean xlsx) {
        try {
            logger.info("Iniciando leitura da planilha SENATRAN\n");

            Workbook workbook;
            if (xlsx) {
                workbook = new XSSFWorkbook(arquivo);
            } else {
                workbook = new HSSFWorkbook(arquivo);
            }

            Sheet sheet = workbook.getSheet("SENATRAN");
            List<FluxoVeiculos> veiculosExtraidos = new ArrayList<>();

            for (int i = 0; i < sheet.getLastRowNum(); i++) {
                Row headerRow = sheet.getRow(i);
                Row dataRow = sheet.getRow(i + 1);

                if (headerRow == null || dataRow == null) continue;

                String mesRaw = excelUtils.getValorCelulaComoTexto(headerRow.getCell(0));
                if (!mesRaw.contains("/")) continue;

                String[] partes = mesRaw.split("/");
                String mes = partes.length >= 2 ? partes[1].trim() : "Indefinido";

                for (int col = 2; col < headerRow.getLastCellNum(); col++) {
                    String tipo = excelUtils.getValorCelulaComoTexto(headerRow.getCell(col));
                    String qtdStr = excelUtils.getValorCelulaComoTexto(dataRow.getCell(col));
                    Integer qtd = qtdStr.isEmpty() ? 0 : Integer.parseInt(qtdStr);

                    FluxoVeiculos fluxo = new FluxoVeiculos(mes, tipo, qtd);

                    logger.info("Fluxo extraido: " + fluxo.toString());

                    veiculosExtraidos.add(fluxo);
                }

                i++;
            }

            workbook.close();

            logger.info("Leitura da planilha SENATRAN finalizada\n");

            return veiculosExtraidos;

        } catch (IOException e) {
            logger.error("Erro ao realizar a leitura da planilha SENATRAN " + e.getMessage());

            return null;
        }
    }
}
