package school.sptech.database.model;

public class MortalidadeRespiratoria {

    private String mesAno;
    private String municipio;
    private Double valorTotal;
    private Integer numeroInternacoes;
    private Integer numeroObitos;
    private Double taxaMortalidade;
    private String regiao;

    public MortalidadeRespiratoria(String municipio, Double valorTotal, Integer numeroInternacoes, Integer numeroObitos, Double taxaMortalidade, String regiao) {
        this.municipio = municipio;
        this.valorTotal = valorTotal;
        this.numeroInternacoes = numeroInternacoes;
        this.numeroObitos = numeroObitos;
        this.taxaMortalidade = taxaMortalidade;
        this.regiao = regiao;
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

    public Double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }

    public Integer getNumeroInternacoes() {
        return numeroInternacoes;
    }

    public void setNumeroInternacoes(Integer numeroInternacoes) {
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

    @Override
    public String toString() {
        return "MortalidadeRespiratoriaService{" +
                "mesAno='" + mesAno + '\'' +
                ", municipio='" + municipio + '\'' +
                ", valorTotal=" + valorTotal +
                ", numeroInternacoes=" + numeroInternacoes +
                ", numeroObitos=" + numeroObitos +
                ", taxaMortalidade=" + taxaMortalidade +
                ", regiao='" + regiao + '\'' +
                '}';
    }
}
