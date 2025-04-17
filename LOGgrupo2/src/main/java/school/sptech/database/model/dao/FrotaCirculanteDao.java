package school.sptech.database.model.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.FrotaCirculante;

public class FrotaCirculanteDao {

    private final JdbcTemplate jdbcTemplate;

    public FrotaCirculanteDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(FrotaCirculante frotaCirculante){
        jdbcTemplate.update(
                "INSERT INTO FrotaCirculante " +
                        "(municipio, regiao, automoveis, comerciais_leves, caminhoes, onibus, motos, ano, total)" +
                        "VALUES (?,?,?,?,?,?,?,?,?)",
                        frotaCirculante.getMunicipio(),
                        null,
                        frotaCirculante.getAutomoveis(),
                        frotaCirculante.getComerciaisLeves(),
                        frotaCirculante.getCaminhoes(),
                        frotaCirculante.getOnibus(),
                        frotaCirculante.getMotos(),
                        frotaCirculante.getAno(),
                        frotaCirculante.getTotal()
        );
    }

}
