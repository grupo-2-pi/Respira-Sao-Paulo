package school.sptech.config;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

public class JDBCConfig {

    private final DataSource dataSource;
    private static final String host = "localhost"; // System.getenv("HOST");

    public JDBCConfig() {
        DriverManagerDataSource driver = new DriverManagerDataSource();

        // Configurações para MySQL
        driver.setDriverClassName("com.mysql.cj.jdbc.Driver");
        driver.setUrl("jdbc:mysql://" + host + ":3306/Respira?useTimezone=true&serverTimezone=UTC");
        driver.setUsername("root");
        driver.setPassword("urubu100");

        this.dataSource = driver;
    }

    public JdbcTemplate getConnection() {
        return new JdbcTemplate(this.dataSource);
    }
}