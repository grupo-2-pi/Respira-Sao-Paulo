package school.sptech.database.model.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.FrotaCirculante;

public class FrotaCirculanteDao extends DAO{

    public FrotaCirculanteDao(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    public void save(FrotaCirculante frotaCirculante){
        super.getJdbcTemplate().update(
                "INSERT INTO FrotaCirculante " +
                        "(municipio, regiao, automoveis, comerciais_leves, caminhoes, onibus, motos, ano,mes, total)" +
                        "VALUES (?,?,?,?,?,?,?,?,?,?)",
                frotaCirculante.getMunicipio(),
                frotaCirculante.getRegiao(),
                frotaCirculante.getAutomoveis(),
                frotaCirculante.getComerciaisLeves(),
                frotaCirculante.getCaminhoes(),
                frotaCirculante.getOnibus(),
                frotaCirculante.getMotos(),
                frotaCirculante.getAno(),
                frotaCirculante.getMes(),
                frotaCirculante.getTotal()
        );
    }

}