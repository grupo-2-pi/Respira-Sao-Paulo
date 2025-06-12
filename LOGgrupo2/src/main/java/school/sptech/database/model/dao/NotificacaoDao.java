package school.sptech.database.model.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.model.Notificacao;

public class NotificacaoDao extends DAO {

    public NotificacaoDao(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    public void save(Notificacao notificacao) {
        super.getJdbcTemplate().update(
                "INSERT INTO Notificacoes (dataHora, descricao) VALUES " +
                        "(?,?)",
                notificacao.getDataHora(),
                notificacao.getDescricao()
        );
    }

}
