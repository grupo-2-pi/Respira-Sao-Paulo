package school.sptech.config;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

public class JDBCConfig {

    private final DataSource dataSource;
    private static final String host = "mysql";
    private static final String user = System.getenv("DB_USER");
    private static final String password = System.getenv("DB_PASSWORD");

    public JDBCConfig() {
        DriverManagerDataSource driver = new DriverManagerDataSource();

        // Configurações para MySQL
        driver.setDriverClassName("com.mysql.cj.jdbc.Driver");
        driver.setUrl("jdbc:mysql://" + host + ":3306/Respira?useTimezone=true&serverTimezone=UTC");
        driver.setUsername(user);
        driver.setPassword(password);

        this.dataSource = driver;
    }

    public JdbcTemplate getConnection() {
        return new JdbcTemplate(this.dataSource);
    }
}
