package school.sptech.database.model.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.EmissaoVeicular;

public class EmissaoVeicularDao {
    private final JdbcTemplate jdbcTemplate;

    public EmissaoVeicularDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(EmissaoVeicular emissaoVeicular){
        jdbcTemplate.update(
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