package school.sptech.service;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.Empresa;
import school.sptech.database.model.Logger;

import java.util.Arrays;
import java.util.List;

public class EmpresaService {

    private JdbcTemplate template;
    private Logger logger = new Logger();


    public EmpresaService(JdbcTemplate template){
        this.template = template;
    }


    public void comecarTratativa(){
        List<Empresa> empresas = template.query("SELECT * FROM Empresa", new BeanPropertyRowMapper<>(Empresa.class));
        logger.info("Empresas atuais na base de dados: " + Arrays.toString(empresas.toArray()));

        logger.info("Realizando tratativa nas empresas");

        template.update("UPDATE Empresa SET nomeFantasia = 'NomeTroca' WHERE idEmpresa=1");

        template.update("DELETE FROM Empresa WHERE idEmpresa = 3");

        List<Empresa> empresasTratadas = template.query("SELECT * FROM Empresa", new BeanPropertyRowMapper<>(Empresa.class));

        logger.info("Empresas tratadas com sucesso " + Arrays.toString(empresasTratadas.toArray()));
    }

}
