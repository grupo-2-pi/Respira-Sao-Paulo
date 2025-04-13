package school.sptech;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;



public class LeitorExcel {

    public List<Doenca> extrairDoencas(String nomeArquivo, InputStream arquivo) {
        try {
            System.out.println("\nIniciando leitura do arquivo %s\n".formatted(nomeArquivo));

            Workbook workbook;
            if (nomeArquivo.endsWith(".xlsx")) {
                workbook = new XSSFWorkbook(arquivo);
            } else {
                workbook = new HSSFWorkbook(arquivo);
            }

            Sheet sheet = workbook.getSheetAt(0);
            List<Doenca> doencasExtraidas = new ArrayList<>();

            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    System.out.println("Lendo cabeçalho");
                    for (int i = 0; i < 9; i++) {
                        String coluna = row.getCell(i).getStringCellValue();
                        System.out.println("Coluna " + i + ": " + coluna);
                    }
                    System.out.println("--------------------");
                    continue;
                }

                System.out.println("Lendo linha " + row.getRowNum());

                Doenca doenca = new Doenca();
                doenca.setCategoria(getValorCelulaComoTexto(row.getCell(0)));
                doenca.setCidMes(getValorCelulaComoTexto(row.getCell(1)));
                doenca.setAltoDoTiete(getValorCelulaComoTexto(row.getCell(2)));
                doenca.setFrancoDaRocha(getValorCelulaComoTexto(row.getCell(3)));
                doenca.setMananciais(getValorCelulaComoTexto(row.getCell(4)));
                doenca.setRotaDosBandeirantes(getValorCelulaComoTexto(row.getCell(5)));
                doenca.setGrandeAbc(getValorCelulaComoTexto(row.getCell(6)));
                doenca.setSaoPaulo(getValorCelulaComoTexto(row.getCell(7)));
                doenca.setTotal(getValorCelulaComoTexto(row.getCell(63)));

                doencasExtraidas.add(doenca);
            }

            workbook.close();

            System.out.println("\nLeitura do arquivo finalizada\n");

            return doencasExtraidas;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public List<FluxoVeiculos> extrairFluxoVeiculos(String nomeArquivo, InputStream arquivo) {
        try {
            System.out.println("\nIniciando leitura da planilha SENATRAN\n");

            Workbook workbook;
            if (nomeArquivo.endsWith(".xlsx")) {
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

                String mesRaw = getValorCelulaComoTexto(headerRow.getCell(0));
                if (!mesRaw.contains("/")) continue;

                String[] partes = mesRaw.split("/");
                String mes = partes.length >= 2 ? partes[1].trim() : "Indefinido";

                for (int col = 2; col < headerRow.getLastCellNum(); col++) {
                    String tipo = getValorCelulaComoTexto(headerRow.getCell(col));
                    String qtdStr = getValorCelulaComoTexto(dataRow.getCell(col));
                    Integer qtd = qtdStr.isEmpty() ? 0 : Integer.parseInt(qtdStr);

                    FluxoVeiculos fluxo = new FluxoVeiculos(mes, tipo, qtd);
                    veiculosExtraidos.add(fluxo);
                }

                i++;
            }

            workbook.close();

            System.out.println("Leitura da planilha SENATRAN finalizada\n");

            return veiculosExtraidos;

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private String getValorCelulaComoTexto(Cell cell) {
        if (cell == null) {
            return "";
        }

        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue();
            case NUMERIC -> String.valueOf((int) cell.getNumericCellValue());
            case BOOLEAN -> String.valueOf(cell.getBooleanCellValue());
            case BLANK -> "";
            default -> cell.toString();
        };
    }


}
