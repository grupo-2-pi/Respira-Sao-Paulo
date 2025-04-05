package school.sptech;

import java.time.LocalDate;

public class FeedbackUsuarios {
    private Integer idFeedbackUsuarios;
    private String nomeUsuario;
    private LocalDate dataFeedback;
    private String descricaoFeedback;
    private String tipoPoluente;
    private String municipioFeedback;

    public FeedbackUsuarios(Integer idFeedbackUsuarios, String nomeUsuario, LocalDate dataFeedback, String descricaoFeedback, String tipoPoluente, String municipioFeedback) {
        this.idFeedbackUsuarios = idFeedbackUsuarios;
        this.nomeUsuario = nomeUsuario;
        this.dataFeedback = dataFeedback;
        this.descricaoFeedback = descricaoFeedback;
        this.tipoPoluente = tipoPoluente;
        this.municipioFeedback = municipioFeedback;
    }

    public FeedbackUsuarios() {
    }

    public Integer getIdFeedbackUsuarios() {
        return idFeedbackUsuarios;
    }

    public void setIdFeedbackUsuarios(Integer idFeedbackUsuarios) {
        this.idFeedbackUsuarios = idFeedbackUsuarios;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }

    public LocalDate getDataFeedback() {
        return dataFeedback;
    }

    public void setDataFeedback(LocalDate dataFeedback) {
        this.dataFeedback = dataFeedback;
    }

    public String getDescricaoFeedback() {
        return descricaoFeedback;
    }

    public void setDescricaoFeedback(String descricaoFeedback) {
        this.descricaoFeedback = descricaoFeedback;
    }

    public String getTipoPoluente() {
        return tipoPoluente;
    }

    public void setTipoPoluente(String tipoPoluente) {
        this.tipoPoluente = tipoPoluente;
    }

    public String getMunicipioFeedback() {
        return municipioFeedback;
    }

    public void setMunicipioFeedback(String municipioFeedback) {
        this.municipioFeedback = municipioFeedback;
    }

    @Override
    public String toString() {
        return "FeedbackUsuarios{" +
                "idFeedbackUsuarios=" + idFeedbackUsuarios +
                ", nomeUsuario='" + nomeUsuario + '\'' +
                ", dataFeedback=" + dataFeedback +
                ", descricaoFeedback='" + descricaoFeedback + '\'' +
                ", tipoPoluente='" + tipoPoluente + '\'' +
                ", municipioFeedback='" + municipioFeedback + '\'' +
                '}';
    }
}



