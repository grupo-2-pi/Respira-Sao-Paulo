package school.sptech.service;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.Logger;
import school.sptech.utils.ExcelUtils;
import school.sptech.utils.MapaMunicipiosSP;

public class Services {
    private final Logger logger;
    private final ExcelUtils excelUtils;
    private final JdbcTemplate jdbcTemplate;
    private final LogService logService;
    private final MapaMunicipiosSP mapaMunicipiosSP = new MapaMunicipiosSP();

    public Services(Logger logger, ExcelUtils excelUtils, JdbcTemplate jdbcTemplate) {
        this.logger = logger;
        this.excelUtils = excelUtils;
        this.jdbcTemplate = jdbcTemplate;
        this.logService = new LogService(this.jdbcTemplate);
    }

    public Logger getLogger() {
        return logger;
    }

    public ExcelUtils getExcelUtils() {
        return excelUtils;
    }

    public JdbcTemplate getJdbcTemplate() {
        return jdbcTemplate;
    }

    public LogService getLogService() {
        return logService;
    }

    public MapaMunicipiosSP getMapaMunicipiosSP() {
        return mapaMunicipiosSP;
    }
}
