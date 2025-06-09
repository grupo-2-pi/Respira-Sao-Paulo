package school.sptech.database.model;

import java.time.LocalDateTime;

public class Notificacao {

    private LocalDateTime dataHora;
    private String descricao;

    public Notificacao(LocalDateTime dataHora, String descricao) {
        this.dataHora = dataHora;
        this.descricao = descricao;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    @Override
    public String toString() {
        return "Notificacao{" +
                "dataHora=" + dataHora +
                ", descricao='" + descricao + '\'' +
                '}';
    }
}
