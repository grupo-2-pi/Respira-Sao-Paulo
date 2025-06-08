package school.sptech.service;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.client.NotificationClient;
import school.sptech.database.model.Logger;
import school.sptech.database.model.Notificacao;
import school.sptech.database.model.dao.NotificacaoDao;
import school.sptech.dto.NotificacaoDto;
import school.sptech.utils.ExcelUtils;

import java.time.LocalDateTime;

public class NotificacaoService extends Services {

    private final NotificacaoDao notificacaoDao;
    private final NotificationClient notificationClient;

    public NotificacaoService(Logger logger, ExcelUtils excelUtils, JdbcTemplate jdbcTemplate) {
        super(logger, excelUtils, jdbcTemplate);
         this.notificacaoDao = new NotificacaoDao(
            jdbcTemplate
        );
         this.notificationClient = new NotificationClient(
                 logger
         );
    }

    public void enviarNotificacoes(String persona, String conteudo) {
        NotificacaoDto dto = new NotificacaoDto(conteudo);

        Boolean saude = persona.equals("saude");

        this.notificationClient.sendMessage(dto, saude);

        Notificacao noti = new Notificacao(
                LocalDateTime.now(),
                conteudo
        );

        this.notificacaoDao.save(noti);
    }
}
