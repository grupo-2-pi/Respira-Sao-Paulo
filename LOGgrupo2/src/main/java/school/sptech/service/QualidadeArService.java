package school.sptech.service;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.File;
import school.sptech.database.model.QualidadeAr;
import school.sptech.database.model.dao.FrotaCirculanteDao;
import school.sptech.database.model.dao.QualidadeArDao;
import school.sptech.utils.ExcelUtils;
import school.sptech.database.model.Logger;
import school.sptech.utils.MapaMunicipiosSP;

import java.io.ByteArrayInputStream;
import java.text.Normalizer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class QualidadeArService extends Services {

    private static final org.slf4j.Logger log = LoggerFactory.getLogger(QualidadeArService.class);
    private final QualidadeArDao qualidadeArDao;

    private static final Map<String, String> map = new HashMap<>();

    public QualidadeArService(Logger logger, ExcelUtils excelUtils, JdbcTemplate jdbcTemplate) {
        super(logger, excelUtils, jdbcTemplate);
        this.qualidadeArDao = new QualidadeArDao(jdbcTemplate);
        map.put("01", "JAN");
        map.put("02", "FEV");
        map.put("03", "MAR");
        map.put("04", "ABR");
        map.put("05", "MAI");
        map.put("06", "JUN");
        map.put("07", "JUL");
        map.put("08", "AGO");
        map.put("09", "SET");
        map.put("10", "OUT");
        map.put("11", "NOV");
        map.put("12", "DEZ");
    }

    public void extrairDadosQualidadeAr(String nomeArquivo, List<File> arquivos) {
        try {
            for (File arquivo : arquivos) {
                super.getLogger().info("\nIniciando leitura do arquivo %s\n".formatted(nomeArquivo));

                byte[] fileBytes = arquivo.getInputStream().readAllBytes();

                Workbook workbook;
                if (nomeArquivo.endsWith(".xlsx")) {
                    workbook = new XSSFWorkbook(new ByteArrayInputStream(fileBytes));
                    super.getLogger().info("Arquivo xlsx encontrado");
                } else {
                    workbook = new HSSFWorkbook(new ByteArrayInputStream(fileBytes));
                    super.getLogger().info("Arquivo xls encontrado");
                }

                Sheet sheet = workbook.getSheetAt(0);
                super.getLogger().info("Nome da planilha: " + sheet.getSheetName());

                for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                    Row linhaAtual = sheet.getRow(i);
                    if (linhaAtual == null) continue;

                    String[] data = super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(0)).split("-");

                    String mes = this.buscarNoMap(data[1]);
                    String ano = data[0];

                    String municipio = super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(1));
                    String poluente = super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(2));
                    Double valor = Double.valueOf(super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(3)));
                    String unidade = super.getExcelUtils().getValorCelulaComoTexto(linhaAtual.getCell(4));

                    String municipioSemTraco = municipio;

                    if(municipio.contains("-")){
                        municipioSemTraco = municipio.split("-")[0];
                    }

                    String municipioTratado = formatarMunicipio(municipioSemTraco);

                    if(municipioTratado.endsWith(" ")){
                        municipioTratado = municipioTratado.substring(0, municipioTratado.length() - 1);
                    }

                    QualidadeAr qualidade = new
                            QualidadeAr
                            (mes,ano, municipioTratado, poluente, valor, unidade,super.getMapaMunicipiosSP().pegarMunicipio(municipioTratado));
                    super.getLogger().info("Leitura realizada: " + qualidade.toString());

                    super.getLogService().salvarLog("INFO", "Leitura realizada: " + qualidade.toString());

                    qualidadeArDao.save(qualidade);
                    super.getLogger().info("Registro salvo no banco");
                }

                workbook.close();
                super.getLogger().info("\nLeitura do arquivo finalizada\n");
                arquivo.getInputStream().close();
            }
        } catch (Exception e) {
            super.getLogger().error("Erro ao realizar a leitura da planilha de qualidade do ar: " + e.getMessage());
        }
    }

    public String buscarNoMap(String mesNumero) {
        return map.get(mesNumero);
    }


    private static String formatarMunicipio(String texto) {
        // Normaliza para decompor caracteres acentuados em base + acento
        String textoNormalizado = Normalizer.normalize(texto, Normalizer.Form.NFD);
        // Remove caracteres diacríticos (acentos)
        return textoNormalizado.replaceAll("[\\p{InCombiningDiacriticalMarks}]", "")
                .replaceAll("ç", "c")
                .replaceAll("Ç", "C").toUpperCase();
    }
}
