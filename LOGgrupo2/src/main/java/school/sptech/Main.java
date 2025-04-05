package school.sptech;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.config.JDBCConfig;
import school.sptech.database.model.Logger;
import school.sptech.service.EmpresaService;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class Main {
    public static Logger logger = new Logger();
    public static String[] tipos = {"[INFO]", "[WARNING]", "[ERROR]"};
    public static JDBCConfig jdbcConfig = new JDBCConfig();
    public static final JdbcTemplate template = jdbcConfig.getConnection();
    public static final EmpresaService empresaService = new EmpresaService(template);


    public static void main(String[] args) {
        iniciarAplicacao();

        for(var i = 0; i <= 20; i++){
            Integer tipo = ThreadLocalRandom.current().nextInt(0, 3);
            logger.realizarLog(tipos[tipo]);
        }
        
        encerrarAplicacao();
    }

    static void iniciarAplicacao(){
        System.out.println("\n" +
                "\n" +
                " ____                 _             ____   /\\/|         ____             _       \n" +
                "|  _ \\ ___  ___ _ __ (_)_ __ __ _  / ___| |/\\/_  ___   |  _ \\ __ _ _   _| | ___  \n" +
                "| |_) / _ \\/ __| '_ \\| | '__/ _` | \\___ \\ / _` |/ _ \\  | |_) / _` | | | | |/ _ \\ \n" +
                "|  _ <  __/\\__ \\ |_) | | | | (_| |  ___) | (_| | (_) | |  __/ (_| | |_| | | (_) |\n" +
                "|_| \\_\\___||___/ .__/|_|_|  \\__,_| |____/ \\__,_|\\___/  |_|   \\__,_|\\__,_|_|\\___/ \n" +
                "               |_|                                                               \n" +
                "\n");

        System.out.println("-----------------------------------------------------------------------------------------");

        System.out.println(logger.formatarData() + " Aplicação iniciada");

        System.out.println("-----------------------------------------------------------------------------------------");
    }

    static void encerrarAplicacao(){
        System.out.println("-----------------------------------------------------------------------------------------");

        System.out.println(logger.formatarData() + " Aplicação encerrada");

        System.out.println("-----------------------------------------------------------------------------------------");
    }

    static void comecarTratativa(){
        empresaService.comecarTratativa();


//        template.execute(
//                "INSERT INTO Empresa VALUES (" +
//                        "DEFAULT, " +
//                        "'12345678901234', " +
//                        "'TesteTech', " +
//                        "10, " +
//                        "'2001-01-01', " +
//                        "'2001-01-02')"
//        );




//        List<Funcionarios> funcionarios = template.query("SELECT * FROM Funcionarios", new BeanPropertyRowMapper<>(Funcionarios.class));
//        List<Municipios> municipios = template.query("SELECT * FROM Municipios", new BeanPropertyRowMapper<>(Municipios.class));
//        List<PoluicaoTransporte> poluicaoTransportes = template.query("SELECT * FROM poluicaoTransporte", new BeanPropertyRowMapper<>(PoluicaoTransporte.class));
//        List<DadosSaude> dadosSaude = template.query("SELECT * FROM dadosSaude", new BeanPropertyRowMapper<>(DadosSaude.class));
//        List<FeedbackUsuarios> feedbackUsuarios = template.query("SELECT * FROM FeedbackUsuarios", new BeanPropertyRowMapper<>(FeedbackUsuarios.class));

//
//        System.out.println(empresas + "\n" +
//                funcionarios + "\n" +
//                municipios + "\n" +
//                poluicaoTransportes + "\n" +
//                dadosSaude + "\n" +
//                feedbackUsuarios
//        );
    }
}

