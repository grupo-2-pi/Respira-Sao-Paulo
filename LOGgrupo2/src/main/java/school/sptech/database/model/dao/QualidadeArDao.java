package school.sptech.database.model.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.QualidadeAr;

public class QualidadeArDao {

        private final JdbcTemplate jdbcTemplate;

        public QualidadeArDao(JdbcTemplate jdbcTemplate) {
            this.jdbcTemplate = jdbcTemplate;
        }

        public void save(QualidadeAr qualidadeAr){
            jdbcTemplate.update(
                    "INSERT INTO QualidadeAr " +
                            "(mesAno, municipio, poluente, valor, unidade)" +
                            " VALUES (?,?,?,?,?,?,?,?,?)",
                    qualidadeAr.getMesAno(),
                    qualidadeAr.getMunicipio(),
                    qualidadeAr.getPoluente(),
                    qualidadeAr.getValor(),
                    qualidadeAr.getUnidade()
            );
        }

}
