package school.sptech.database.model.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.QualidadeAr;

public class QualidadeArDao extends DAO {

    public QualidadeArDao(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    public void save(QualidadeAr qualidadeAr){
        super.getJdbcTemplate().update(
                "INSERT INTO QualidadeAr " +
                        "(mes,ano, municipio, poluente, valor, unidade, regiao)" +
                        " VALUES (?,?,?,?,?,?,?)",
                qualidadeAr.getMes(),
                qualidadeAr.getAno(),
                qualidadeAr.getMunicipio(),
                qualidadeAr.getPoluente(),
                qualidadeAr.getValor(),
                qualidadeAr.getUnidade(),
                qualidadeAr.getRegiao()
        );
    }

}