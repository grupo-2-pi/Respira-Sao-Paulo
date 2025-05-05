package school.sptech.service;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.Doenca;
import school.sptech.database.model.File;
import school.sptech.database.model.Logger;
import school.sptech.database.model.MortalidadeRespiratoria;
import school.sptech.database.model.dao.MortalidadeDao;
import school.sptech.utils.ExcelUtils;
import school.sptech.utils.MapaMunicipiosSP;

import java.util.ArrayList;
import java.util.List;

public class MortalidadeRespiratoriaService {

    private final Logger logger;
    private final ExcelUtils excelUtils;
    private final JdbcTemplate jdbcTemplate;
    private final MortalidadeDao mortalidadeDao;
    private final MapaMunicipiosSP mapaMunicipiosSP;
    private final LogService logService;

    public MortalidadeRespiratoriaService(Logger logger, ExcelUtils excelUtils, JdbcTemplate jdbcTemplate, MapaMunicipiosSP mapaMunicipiosSP) {
        this.logger = logger;
        this.excelUtils = excelUtils;
        this.jdbcTemplate = jdbcTemplate;
        this.mapaMunicipiosSP = mapaMunicipiosSP;
        this.mortalidadeDao = new MortalidadeDao(jdbcTemplate);
        this.logService = new LogService(this.jdbcTemplate);
    }

    public void extrairDados(List<File> arquivos, Boolean xlsx) {
        try {
            for (File arquivo : arquivos) {
                logger.info("Iniciando leitura do arquivo de mortalidade");

                Workbook workbook;
                if (xlsx) {
                    workbook = new XSSFWorkbook(arquivo.getInputStream());
                } else {
                    workbook = new HSSFWorkbook(arquivo.getInputStream());
                }

                Sheet sheet = workbook.getSheetAt(0);
                List<Doenca> doencasExtraidas = new ArrayList<>();

                logger.info("Ultima linha " + sheet.getLastRowNum());

                for (Row row : sheet ) {
                    logger.info("Linha " + excelUtils.getValorCelulaComoTexto(row.getCell(0)));

                    if(
                            excelUtils.getValorCelulaComoTexto(row.getCell(0)).contains("Fonte")||
                                    excelUtils.getValorCelulaComoTexto(row.getCell(0)).startsWith("Total")
                    ){

                        logger.info("Caiu no if");
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

                    String municipio = excelUtils.getValorCelulaComoTexto(row.getCell(0));

                    Integer ultimoIndexMunicipio = municipio.length();

                    String[] mesAno = arquivo.getFileName().split("CONVISA")[1].split("-");

                    String mes = mesAno[0].replace(" ", "");
                    String ano = mesAno[1].replace(".xlsx", "");

                    String municipioFormatado = municipio.substring(7, ultimoIndexMunicipio);

                    MortalidadeRespiratoria mortalidadeRespiratoria = new MortalidadeRespiratoria(
                            mes,
                            ano,
                            municipioFormatado,
                            valorTotalFormatado.equals("-") ? null : Double.valueOf(valorTotalFormatado),
                            internacoesSemPonto.equals("-") ? null : Double.valueOf(internacoesSemPonto),
                            obitosSemPonto.equals("-") ? null : Integer.valueOf(obitosSemPonto),
                            taxaFormatada.equals("-") ? null : Double.valueOf(taxaFormatada),
                            mapaMunicipiosSP.pegarMunicipio(municipioFormatado)
                    );

                    logger.info("Mortalidade extraida: " + mortalidadeRespiratoria.toString());

                    logService.salvarLog("INFO","Mortalidade extraida: " + mortalidadeRespiratoria.toString());

                    mortalidadeDao.save(mortalidadeRespiratoria);
                }

                workbook.close();

                logger.info("Leitura finalizada com sucesso\n");
            }
        } catch (Exception e) {
            logger.error("Erro ao realizar a leitura do arquivo relacionado as doenças " + e.getMessage());
        }
    }
}