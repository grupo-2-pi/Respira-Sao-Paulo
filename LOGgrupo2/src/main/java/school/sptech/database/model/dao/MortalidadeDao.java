package school.sptech.database.model.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.MortalidadeRespiratoria;

public class MortalidadeDao {

    private final JdbcTemplate jdbcTemplate;

    public MortalidadeDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(MortalidadeRespiratoria mortalidadeRespiratoria){
        jdbcTemplate.update(
                "INSERT INTO MortalidadeRespiratoria " +
                        "(mes,ano, municipio, valorTotal, numeroInternacoes, numeroObitos, taxaMortalidade, regiao)" +
                        "VALUES (?,?,?,?,?,?,?,?)",
                mortalidadeRespiratoria.getMesAno(),
                mortalidadeRespiratoria.getAno(),
                mortalidadeRespiratoria.getMunicipio(),
                mortalidadeRespiratoria.getValorTotal(),
                mortalidadeRespiratoria.getNumeroInternacoes(),
                mortalidadeRespiratoria.getNumeroObitos(),
                mortalidadeRespiratoria.getTaxaMortalidade(),
                null
        );
    }


}
