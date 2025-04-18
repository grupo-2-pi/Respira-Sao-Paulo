package school.sptech.utils;

import org.apache.poi.ss.usermodel.Cell;

public class ExcelUtils {

    public String getValorCelulaComoTexto(Cell cell) {
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
