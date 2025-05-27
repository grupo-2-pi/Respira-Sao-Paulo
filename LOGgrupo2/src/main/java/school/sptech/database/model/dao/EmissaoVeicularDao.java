package school.sptech.database.model.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.EmissaoVeicular;

public class EmissaoVeicularDao extends DAO {

    public EmissaoVeicularDao(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    public void save(EmissaoVeicular emissaoVeicular){
        super.getJdbcTemplate().update(
                "INSERT INTO EmissaoVeicular " +
                        "(tipoVeiculo, ano, valorCO, valorHC, valorNOX, valorCO2, valorRCHO, valorMP, valorN2O)" +
                        " VALUES (?,?,?,?,?,?,?,?,?)",
                emissaoVeicular.getTipoVeiculo(),
                emissaoVeicular.getAno(),
                emissaoVeicular.getValorCO(),
                emissaoVeicular.getValorHC(),
                emissaoVeicular.getValorNOX(),
                emissaoVeicular.getValorCO2(),
                emissaoVeicular.getValorRCHO(),
                emissaoVeicular.getValorMP(),
                emissaoVeicular.getValorN2O()
        );
    }
}