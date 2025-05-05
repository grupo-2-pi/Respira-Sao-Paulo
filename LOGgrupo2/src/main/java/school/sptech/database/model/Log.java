package school.sptech.database.model;

import java.time.LocalDateTime;

public class Log {

    private String tipo;
    private String descricao;
    private LocalDateTime datahora;

    public Log(String tipo, String descricao, LocalDateTime datahora) {
        this.tipo = tipo;
        this.descricao = descricao;
        this.datahora = datahora;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDateTime getDatahora() {
        return datahora;
    }

    public void setDatahora(LocalDateTime datahora) {
        this.datahora = datahora;
    }
}
