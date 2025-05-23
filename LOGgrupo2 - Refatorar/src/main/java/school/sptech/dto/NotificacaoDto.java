package school.sptech.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class NotificacaoDto {

    private final String text;

    public NotificacaoDto(String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return "NotificacaoDto{" +
                "text='" + text + '\'' +
                '}';
    }

    @JsonProperty("text")
    public String getMessage() {
        return text;
    }
}
