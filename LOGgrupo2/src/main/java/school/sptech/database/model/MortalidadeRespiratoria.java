package school.sptech.database.model;

public class MortalidadeRespiratoria {

    private String mesAno;
    private String municipio;
    private String valorTotal;
    private String numeroInternacoes;
    private String numeroObitos;
    private String taxaMortalidade;
    private String regiao;

    public MortalidadeRespiratoria(String municipio, String valorTotal, String numeroInternacoes, String numeroObitos, String taxaMortalidade, String regiao) {
        this.municipio = municipio;
        this.valorTotal = valorTotal;
        this.numeroInternacoes = numeroInternacoes;
        this.numeroObitos = numeroObitos;
        this.taxaMortalidade = taxaMortalidade;
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

    public String getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(String valorTotal) {
        this.valorTotal = valorTotal;
    }

    public String getNumeroInternacoes() {
        return numeroInternacoes;
    }

    public void setNumeroInternacoes(String numeroInternacoes) {
        this.numeroInternacoes = numeroInternacoes;
    }

    public String getNumeroObitos() {
        return numeroObitos;
    }

    public void setNumeroObitos(String numeroObitos) {
        this.numeroObitos = numeroObitos;
    }

    public String getTaxaMortalidade() {
        return taxaMortalidade;
    }

    public void setTaxaMortalidade(String taxaMortalidade) {
        this.taxaMortalidade = taxaMortalidade;
    }

    public String getRegiao() {
        return regiao;
    }

    public void setRegiao(String regiao) {
        this.regiao = regiao;
    }

    @Override
    public String toString() {
        return "MortalidadeRespiratoria{" +
                "mesAno='" + mesAno + '\'' +
                ", municipio='" + municipio + '\'' +
                ", valorTotal='" + valorTotal + '\'' +
                ", numeroInternacoes='" + numeroInternacoes + '\'' +
                ", numeroObitos='" + numeroObitos + '\'' +
                ", taxaMortalidade='" + taxaMortalidade + '\'' +
                ", regiao='" + regiao + '\'' +
                '}';
    }
}
