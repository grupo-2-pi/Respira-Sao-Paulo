package school.sptech.service;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.Log;
import school.sptech.database.model.dao.LogDao;

import java.time.LocalDateTime;

public class LogService {

    private LogDao logDao;

    public LogService(JdbcTemplate jdbcTemplate) {
        this.logDao = new LogDao(jdbcTemplate);
    }

    public void salvarLog(String tipo,String content){
        try{
            LocalDateTime now = LocalDateTime.now();

            Log log = new Log(
                    tipo,
                    content,
                    now
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
