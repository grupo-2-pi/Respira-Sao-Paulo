package school.sptech.database.model.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.Log;

public class LogDao extends DAO {


    public LogDao(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    public void save(Log log){
        super.getJdbcTemplate().update(
                "INSERT INTO LogRestrito " +
                        "(tipo, descricao, datahora)" +
                        "VALUES (?,?,?)",
                log.getTipo(),
                log.getDescricao(),
                log.getDatahora()
        );
    }

}
