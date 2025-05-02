package school.sptech.database.model;

public class QualidadeAr {
    private String mes;
    private String ano;
    private String municipio;
    private String poluente;
    private Double valor;
    private String unidade;
    private String regiao;

    public QualidadeAr(String mes, String ano, String municipio, String poluente, Double valor, String unidade, String regiao) {
        this.mes = mes;
        this.ano = ano;
        this.municipio = municipio;
        this.poluente = poluente;
        this.valor = valor;
        this.unidade = unidade;
        this.regiao = regiao;
    }

    public String getMes() {
        return mes;
    }

    public void setMes(String mes) {
        this.mes = mes;
    }

    public String getAno() {
        return ano;
    }

    public void setAno(String ano) {
        this.ano = ano;
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

    public String getRegiao() {
        return regiao;
    }

    public void setRegiao(String regiao) {
        this.regiao = regiao;
    }

    @Override
    public String toString() {
        return "QualidadeAr{" +
                "mes='" + mes + '\'' +
                ", ano='" + ano + '\'' +
                ", municipio='" + municipio + '\'' +
                ", poluente='" + poluente + '\'' +
                ", valor=" + valor +
                ", unidade='" + unidade + '\'' +
                '}';
    }
}
