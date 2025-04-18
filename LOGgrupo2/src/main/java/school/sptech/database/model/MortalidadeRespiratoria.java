package school.sptech.database.model;

public class MortalidadeRespiratoria {

    private String mes;
    private String municipio;
    private Double valorTotal;
    private Double numeroInternacoes;
    private Integer numeroObitos;
    private Double taxaMortalidade;
    private String regiao;
    private String ano;

    public MortalidadeRespiratoria(String municipio, Double valorTotal, Double numeroInternacoes, Integer numeroObitos, Double taxaMortalidade, String regiao,String mes, String ano) {
        this.municipio = municipio;
        this.valorTotal = valorTotal;
        this.numeroInternacoes = numeroInternacoes;
        this.numeroObitos = numeroObitos;
        this.taxaMortalidade = taxaMortalidade;
        this.mes = mes;
        this.ano = ano;
    }

    public String getMesAno() {
        return mes;
    }

    public void setMesAno(String mes) {
        this.mes = MortalidadeRespiratoria.this.mes;
    }

    public String getMunicipio() {
        return municipio;
    }

    public void setMunicipio(String municipio) {
        this.municipio = municipio;
    }

    public Double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }

    public Double getNumeroInternacoes() {
        return numeroInternacoes;
    }

    public void setNumeroInternacoes(Double numeroInternacoes) {
        this.numeroInternacoes = numeroInternacoes;
    }

    public Integer getNumeroObitos() {
        return numeroObitos;
    }

    public void setNumeroObitos(Integer numeroObitos) {
        this.numeroObitos = numeroObitos;
    }

    public Double getTaxaMortalidade() {
        return taxaMortalidade;
    }

    public void setTaxaMortalidade(Double taxaMortalidade) {
        this.taxaMortalidade = taxaMortalidade;
    }

    public String getRegiao() {
        return regiao;
    }

    public void setRegiao(String regiao) {
        this.regiao = regiao;
    }


    public String getAno() {
        return ano;
    }

    public void setAno(String ano) {
        this.ano = ano;
    }

    @Override
    public String toString() {
        return "MortalidadeRespiratoria{" +
                "mes='" + mes + '\'' +
                ", municipio='" + municipio + '\'' +
                ", valorTotal='" + valorTotal + '\'' +
                ", numeroInternacoes='" + numeroInternacoes + '\'' +
                ", numeroObitos='" + numeroObitos + '\'' +
                ", taxaMortalidade='" + taxaMortalidade + '\'' +
                ", regiao='" + regiao + '\'' +
                '}';
    }
}
