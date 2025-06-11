package school.sptech.service;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.Log;
import school.sptech.database.model.dao.LogDao;

import java.time.LocalDateTime;
import java.time.ZoneId;

public class LogService {

    private LogDao logDao;

    public LogService(JdbcTemplate jdbcTemplate) {
        this.logDao = new LogDao(jdbcTemplate);
    }

    public void salvarLog(String tipo,String content){
        try{
            Log log = new Log(
                    tipo,
                    content,
                    LocalDateTime.now(ZoneId.of("America/Sao_Paulo"))
            );

            logDao.save(log);
        }catch(Exception e){
            logDao.save(new Log(
                    "ERROR",
                    e.getMessage(),
                    LocalDateTime.now()
            ));
        }
    }

}
