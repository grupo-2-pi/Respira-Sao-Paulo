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
import school.sptech.database.model.dao.FrotaCirculanteDao;
import school.sptech.utils.ExcelUtils;
import school.sptech.utils.MapaMunicipiosSP;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;

public class FrotaCirulanteService {

    private final Logger logger;
    private final ExcelUtils excelUtils;
    private final JdbcTemplate jdbcTemplate;
    private final FrotaCirculanteDao frotaCirculanteDao;
    private final MapaMunicipiosSP mapaMunicipiosSP;

    public FrotaCirulanteService(Logger logger, ExcelUtils excelUtils, JdbcTemplate jdbcTemplate, MapaMunicipiosSP mapaMunicipiosSP) {
        this.logger = logger;
        this.excelUtils = excelUtils;
        this.jdbcTemplate = jdbcTemplate;
        this.frotaCirculanteDao = new FrotaCirculanteDao(jdbcTemplate);
        this.mapaMunicipiosSP = mapaMunicipiosSP;
    }

    public void extrairFluxoVeiculos(List<File> arquivos) {
        try {
            for (File arquivo : arquivos) {

                byte[] fileBytes = arquivo.getInputStream().readAllBytes();

                logger.info("Iniciando leitura do arquivo de fluxo veiculos");

                Workbook workbook;
                try {
                    workbook = new XSSFWorkbook(new ByteArrayInputStream(fileBytes));
                    logger.info("Arquivo xlsx encontrado");
                } catch (OLE2NotOfficeXmlFileException e) {
                    workbook = new HSSFWorkbook(new ByteArrayInputStream(fileBytes));
                    logger.info("Arquivo xls encontrado");
                }

                Sheet sheet = workbook.getSheetAt(0);
                String[] nomePlanilha = sheet.getSheetName().split("_");

                String ano = nomePlanilha[1];
                String mes = nomePlanilha[0];

                logger.info("Ano atual " + ano);
                logger.info("Mes atual " + mes);

                for (int i = 4789; i < 5435; i++) {
                    Row linhaAtual = sheet.getRow(i);
                    String municipio = excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(1));

                    Integer comerciaisLeves =
                            Integer.parseInt(excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(7))) +
                            Integer.parseInt(excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(8))) +
                            Integer.parseInt(excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(9))) +
                            Integer.parseInt(excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(23)));


                    FrotaCirculante frotaCirculante = new FrotaCirculante(
                            municipio,
                            mapaMunicipiosSP.pegarMunicipio(municipio),
                            Integer.valueOf(excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(3))),
                            comerciaisLeves,
                            Integer.parseInt(excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(5))),
                            Integer.parseInt(excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(14))),
                            Integer.parseInt(excelUtils.getValorCelulaComoTexto(linhaAtual.getCell(12))),
                            ano,
                            mes,
                            linhaAtual.getCell(2).getNumericCellValue()
                    );

                    logger.info("Frota circulante extraida: " + frotaCirculante.toString());

                    frotaCirculanteDao.save(frotaCirculante);
                    logger.info("Frota inserida no banco");
                }

                workbook.close();

            }
        } catch (Exception e) {
            logger.error("Erro ao realizar a leitura da planilha de fluxo " + e.getMessage());
        }
    }
}