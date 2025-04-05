package school.sptech;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class Main {
    public static void main(String[] args) {

        Conexao conexao = new Conexao();
        JdbcTemplate template = new JdbcTemplate(conexao.getConexao());

//        template.execute(
//                "INSERT INTO Empresa VALUES (" +
//                        "DEFAULT, " +
//                        "'12345678901234', " +
//                        "'TesteTech', " +
//                        "10, " +
//                        "'2001-01-01', " +
//                        "'2001-01-02')"
//        );



        List<Empresa> empresas = template.query("SELECT * FROM Empresa", new BeanPropertyRowMapper<>(Empresa.class));
        List<Funcionarios> funcionarios = template.query("SELECT * FROM Funcionarios", new BeanPropertyRowMapper<>(Funcionarios.class));
        List<Municipios> municipios = template.query("SELECT * FROM Municipios", new BeanPropertyRowMapper<>(Municipios.class));
        List<poluicaoTransporte> poluicaoTransportes = template.query("SELECT * FROM poluicaoTransporte", new BeanPropertyRowMapper<>(poluicaoTransporte.class));
        List<dadosSaude> dadosSaude = template.query("SELECT * FROM dadosSaude", new BeanPropertyRowMapper<>(dadosSaude.class));
        List<FeedbackUsuarios> feedbackUsuarios = template.query("SELECT * FROM FeedbackUsuarios", new BeanPropertyRowMapper<>(FeedbackUsuarios.class));

        template.update("UPDATE Empresa SET nomeFantasia = 'NomeTroca' WHERE idEmpresa=1");

        template.update("DELETE FROM Empresa WHERE idEmpresa = 3");


        System.out.println(empresas + "\n" +
                        funcionarios + "\n" +
                        municipios + "\n" +
                        poluicaoTransportes + "\n" +
                        dadosSaude + "\n" +
                        feedbackUsuarios
        );


    }
}