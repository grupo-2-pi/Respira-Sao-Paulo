package school.sptech.database.model.dao;

import org.springframework.jdbc.core.JdbcTemplate;

public class DAO {

    private final JdbcTemplate jdbcTemplate;

    public DAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public JdbcTemplate getJdbcTemplate() {
        return jdbcTemplate;
    }
}
