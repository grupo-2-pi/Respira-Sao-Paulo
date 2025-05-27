package school.sptech.database.model.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.MortalidadeRespiratoria;

public class MortalidadeDao extends DAO {


    public MortalidadeDao(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    public void save(MortalidadeRespiratoria mortalidadeRespiratoria){
        super.getJdbcTemplate().update(
                "INSERT INTO MortalidadeRespiratoria " +
                        "(mes,ano, municipio, valorTotal, numeroInternacoes, numeroObitos, taxaMortalidade, regiao)" +
                        "VALUES (?,?,?,?,?,?,?,?)",
                mortalidadeRespiratoria.getMes(),
                mortalidadeRespiratoria.getAno(),
                mortalidadeRespiratoria.getMunicipio(),
                mortalidadeRespiratoria.getValorTotal(),
                mortalidadeRespiratoria.getNumeroInternacoes(),
                mortalidadeRespiratoria.getNumeroObitos(),
                mortalidadeRespiratoria.getTaxaMortalidade(),
                mortalidadeRespiratoria.getRegiao()
        );
    }


}