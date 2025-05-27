package school.sptech.service;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.File;
import school.sptech.database.model.Logger;
import school.sptech.database.model.MortalidadeRespiratoria;
import school.sptech.database.model.dao.FrotaCirculanteDao;
import school.sptech.database.model.dao.MortalidadeDao;
import school.sptech.utils.ExcelUtils;
import school.sptech.utils.MapaMunicipiosSP;

import java.util.List;

public class MortalidadeRespiratoriaService extends Services{

    private final MortalidadeDao mortalidadeDao;


    public MortalidadeRespiratoriaService(Logger logger, ExcelUtils excelUtils, JdbcTemplate jdbcTemplate) {
        super(logger, excelUtils, jdbcTemplate);
        this.mortalidadeDao = new MortalidadeDao(jdbcTemplate);
    }



    public void extrairDados(List<File> arquivos, Boolean xlsx) {
        try {
            for (File arquivo : arquivos) {
                super.getLogger().info("Iniciando leitura do arquivo de mortalidade");

                Workbook workbook;
                if (xlsx) {
                    workbook = new XSSFWorkbook(arquivo.getInputStream());
                } else {
                    workbook = new HSSFWorkbook(arquivo.getInputStream());
                }

                Sheet sheet = workbook.getSheetAt(0);

                super.getLogger().info("Ultima linha " + sheet.getLastRowNum());

                for (Row row : sheet ) {
                    super.getLogger().info("Linha " + super.getExcelUtils().getValorCelulaComoTexto(row.getCell(0)));

                    if(
                            super.getExcelUtils().getValorCelulaComoTexto(row.getCell(0)).contains("Fonte")||
                                    super.getExcelUtils().getValorCelulaComoTexto(row.getCell(0)).startsWith("Total")
                    ){

                        super.getLogger().info("Caiu no if");
                        break;
                    }
                    if(row.getRowNum() == 1 || row.getRowNum() == 0){
                        continue;
                    }

                    super.getLogger().info("Realizando leitura da linha " + row.getRowNum());

                    String valorTotalSemPonto = super.getExcelUtils().getValorCelulaComoTexto(row.getCell(3)).replace(".", "");
                    String valorTotalFormatado = valorTotalSemPonto.replaceAll(",", ".");

                    String internacoesSemPonto = super.getExcelUtils().getValorCelulaComoTexto(row.getCell(2)).replace(".", "");
                    String obitosSemPonto = super.getExcelUtils().getValorCelulaComoTexto(row.getCell(4)).replace(".","");
                    String taxaSemPonto = super.getExcelUtils().getValorCelulaComoTexto(row.getCell(5)).replace(".", "");
                    String taxaFormatada =taxaSemPonto.replace(",", ".");

                    String municipio = super.getExcelUtils().getValorCelulaComoTexto(row.getCell(0));

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
                            super.getMapaMunicipiosSP().pegarMunicipio(municipioFormatado)
                    );

                    super.getLogger().info("Mortalidade extraida: " + mortalidadeRespiratoria.toString());

                    super.getLogService().salvarLog("INFO","Mortalidade extraida: " + mortalidadeRespiratoria.toString());

                    mortalidadeDao.save(mortalidadeRespiratoria);
                }

                workbook.close();

                super.getLogger().info("Leitura finalizada com sucesso\n");
            }
        } catch (Exception e) {
            super.getLogger().error("Erro ao realizar a leitura do arquivo relacionado as doenças " + e.getMessage());
        }
    }
}