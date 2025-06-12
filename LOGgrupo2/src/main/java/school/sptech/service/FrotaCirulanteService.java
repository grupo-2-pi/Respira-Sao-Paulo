package school.sptech.service;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.OLE2NotOfficeXmlFileException;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.File;
import school.sptech.database.model.FrotaCirculante;
import school.sptech.database.model.Logger;
import school.sptech.database.model.dao.EmissaoVeicularDao;
import school.sptech.database.model.dao.FrotaCirculanteDao;
import school.sptech.utils.ExcelUtils;
import school.sptech.utils.MapaMunicipiosSP;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;

public class FrotaCirulanteService extends Services{

    private final FrotaCirculanteDao frotaCirculanteDao;

    public FrotaCirulanteService(Logger logger, ExcelUtils excelUtils, JdbcTemplate jdbcTemplate) {
        super(logger, excelUtils, jdbcTemplate);
        this.frotaCirculanteDao = new FrotaCirculanteDao(jdbcTemplate);
    }

    public void extrairFluxoVeiculos(List<File> arquivos) {
        try {
            for (File arquivo : arquivos) {

                byte[] fileBytes = arquivo.getInputStream().readAllBytes();

                super.getLogger().info("Iniciando leitura do arquivo de fluxo veiculos");

                Workbook workbook;
                try {
                    workbook = new XSSFWorkbook(new ByteArrayInputStream(fileBytes));
                    super.getLogger().info("Arquivo xlsx encontrado");
                } catch (OLE2NotOfficeXmlFileException e) {
                    workbook = new HSSFWorkbook(new ByteArrayInputStream(fileBytes));
                    super.getLogger().info("Arquivo xls encontrado");
                }

                Sheet sheet = workbook.getSheetAt(0);
                String[] nomePlanilha = sheet.getSheetName().split("_");

                String ano = nomePlanilha[1];
                String mes = nomePlanilha[0].substring(0,3);

                super.getLogger().info("Ano atual " + ano);
                super.getLogger().info("Mes atual " + mes);

                for (int i = 4789; i < 5435; i++) {
                    Row linhaAtual = sheet.getRow(i);
                    String municipio = super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(1));

                    Integer comerciaisLeves =
                            Integer.parseInt(super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(7))) +
                            Integer.parseInt(super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(8))) +
                            Integer.parseInt(super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(9))) +
                            Integer.parseInt(super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(23)));


                    FrotaCirculante frotaCirculante = new FrotaCirculante(
                            municipio,
                            super.getMapaMunicipiosSP().pegarMunicipio(municipio),
                            Integer.valueOf(super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(3))),
                            comerciaisLeves,
                            Integer.parseInt(super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(5))),
                            Integer.parseInt(super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(14))),
                            Integer.parseInt(super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(12))),
                            ano,
                            mes,
                            linhaAtual.getCell(2).getNumericCellValue()
                    );

                    super.getLogger().info("Frota circulante extraida: " + frotaCirculante.toString());

                    super.getLogService().salvarLog("INFO", "Frota circulante extraida: " + frotaCirculante.toString());

                    frotaCirculanteDao.save(frotaCirculante);
                    super.getLogger().info("Frota inserida no banco");
                }

                workbook.close();

            }
        } catch (Exception e) {
            super.getLogger().error("Erro ao realizar a leitura da planilha de fluxo " + e.getMessage());
        }
    }
}