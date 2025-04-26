package school.sptech.database.model;

public class QualidadeAr {
    private String mesAno;
    private String municipio;
    private String poluente;
    private Double valor;
    private String unidade;

    public QualidadeAr(String mesAno, String municipio, String poluente, Double valor, String unidade) {
        this.mesAno = mesAno;
        this.municipio = municipio;
        this.poluente = poluente;
        this.valor = valor;
        this.unidade = unidade;
    }

    public String getMesAno() {
        return mesAno;
    }

    public void setMesAno(String mesAno) {
        this.mesAno = mesAno;
    }

    public String getMunicipio() {
        return municipio;
    }

    public void setMunicipio(String municipio) {
        this.municipio = municipio;
    }

    public String getPoluente() {
        return poluente;
    }

    public void setPoluente(String poluente) {
        this.poluente = poluente;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public String getUnidade() {
        return unidade;
    }

    public void setUnidade(String unidade) {
        this.unidade = unidade;
    }

    @Override
    public String toString() {
        return "QualidadeAr{" +
                "mesAno='" + mesAno + '\'' +
                ", municipio='" + municipio + '\'' +
                ", poluente='" + poluente + '\'' +
                ", valor=" + valor +
                ", unidade='" + unidade + '\'' +
                '}';
    }
}
