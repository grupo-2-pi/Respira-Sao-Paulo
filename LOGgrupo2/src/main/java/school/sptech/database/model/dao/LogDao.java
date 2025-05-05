package school.sptech.database.model.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.Log;

public class LogDao {

    private JdbcTemplate template;

    public LogDao(JdbcTemplate template) {
        this.template = template;
    }

    public void save(Log log){
        template.update(
                "INSERT INTO LogRestrito " +
                        "(tipo, descricao, datahora)" +
                        "VALUES (?,?,?)",
                log.getTipo(),
                log.getDescricao(),
                log.getDatahora()
        );
    }

}
