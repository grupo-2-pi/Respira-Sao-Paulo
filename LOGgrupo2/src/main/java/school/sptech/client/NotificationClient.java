package school.sptech.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import school.sptech.database.model.Logger;
import school.sptech.dto.NotificacaoDto;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class NotificationClient {

    private final String webhook = System.getenv("SLACK_WEBHOOK");
    private static final ObjectMapper mapper = new ObjectMapper();
    private static final HttpClient client = HttpClient.newHttpClient();
    private final Logger logger;

    public NotificationClient(Logger logger){
        this.logger = logger;
    }

    public void sendMessage(NotificacaoDto dto){
        try{
            String json = mapper.writeValueAsString(dto);

            HttpRequest request = HttpRequest
                    .newBuilder()
                    .uri(URI.create(this.webhook))
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();

            HttpResponse<String> respostaEnvio = client.send(request, HttpResponse.BodyHandlers.ofString());

            logger.info(dto.getMessage());

        } catch (Exception e) {
            logger.error(e.getMessage());
        }
    }

}
