package school.sptech;

import org.springframework.jdbc.datasource.DriverManagerDataSource;
import javax.sql.DataSource;

public class Conexao {

    private DataSource conexao;

    public Conexao() {
        DriverManagerDataSource driver = new DriverManagerDataSource();

        // Configurações para MySQL
        driver.setDriverClassName("com.mysql.cj.jdbc.Driver");
        driver.setUrl("jdbc:mysql://localhost:3306/respira?useTimezone=true&serverTimezone=UTC");
        driver.setUsername("respirasp");
        driver.setPassword("urubu100");

        this.conexao = driver;
    }

    public DataSource getConexao() {
        return this.conexao;
    }
}