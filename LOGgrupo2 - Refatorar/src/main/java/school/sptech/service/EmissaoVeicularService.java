package school.sptech.service;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.EmissaoVeicular;
import school.sptech.database.model.File;
import school.sptech.database.model.Logger;
import school.sptech.database.model.dao.EmissaoVeicularDao;
import school.sptech.utils.ExcelUtils;

import java.util.List;

public class EmissaoVeicularService extends Services {

    private final EmissaoVeicularDao emissaoVeicularDao;

    public EmissaoVeicularService(Logger logger, ExcelUtils excelUtils, JdbcTemplate jdbcTemplate) {
        super(logger, excelUtils, jdbcTemplate);
        this.emissaoVeicularDao = new EmissaoVeicularDao(jdbcTemplate);
    }

    public void extrairDadosEmissao(String nomeArquivo, List<File> arquivos) {
        try {
            for (File arquivo : arquivos) {
                super.getLogger().info("\nIniciando leitura do arquivo %s\n".formatted(nomeArquivo));

                Workbook workbook;
                if (nomeArquivo.endsWith(".xlsx")) {
                    workbook = new XSSFWorkbook(arquivo.getInputStream());
                    super.getLogger().info("Arquivo xlsx encontrado");
                } else {
                    workbook = new HSSFWorkbook(arquivo.getInputStream());
                    super.getLogger().info("Arquivo xls encontrado");
                }

                Sheet sheet = workbook.getSheetAt(0);
                super.getLogger().info("Nome da planilha: " + sheet.getSheetName());

                for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                    Row linhaAtual = sheet.getRow(i);
                    if (linhaAtual == null) continue;

                    String tipoVeiculo = super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(0));
                    int ano = Integer.parseInt(super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(1)));

                    System.out.println(Double.parseDouble(super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(2))));

                    EmissaoVeicular emissao = new EmissaoVeicular(
                            tipoVeiculo,
                            ano,
                            Double.parseDouble(super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(2))),
                            Double.parseDouble(super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(3))),
                            Double.parseDouble(super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(4))),
                            Double.parseDouble(super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(5))),
                            Double.parseDouble(super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(6))),
                            Double.parseDouble(super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(7))),
                            Double.parseDouble(super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(8)))
                    );

                    super.getLogger().info("Emissão veicular extraída: " + emissao.toString());
                    super.getLogService().salvarLog("INFO" , "Emissão veicular extraída: " + emissao.toString());
                    emissaoVeicularDao.save(emissao);
                    super.getLogger().info("Emissão veicular salva no banco");
                }

                workbook.close();
                super.getLogger().info("\nLeitura do arquivo finalizada\n");
                arquivo.getInputStream().close();
            }
        } catch (Exception e) {
            super.getLogger().error("Erro ao realizar a leitura da planilha de emissão veicular: " + e.getMessage());
        }
    }
}