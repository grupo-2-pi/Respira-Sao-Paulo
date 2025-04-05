package school.sptech.database.model;

public class DadosSaude {
    private Integer idDadosSaude;
    private Integer ano;
    private String mes;
    private Double gastosTotais;
    private Integer numeroInternacoes;
    private Integer numeroObitos;
    private String faixaIdade;
    private Integer idMunicipio;

    public DadosSaude(Integer idDadosSaude, Integer ano, String mes, Double gastosTotais, Integer numeroInternacoes, Integer numeroObitos, String faixaIdade, Integer idMunicipio) {
        this.idDadosSaude = idDadosSaude;
        this.ano = ano;
        this.mes = mes;
        this.gastosTotais = gastosTotais;
        this.numeroInternacoes = numeroInternacoes;
        this.numeroObitos = numeroObitos;
        this.faixaIdade = faixaIdade;
        this.idMunicipio = idMunicipio;
    }

    public DadosSaude() {
    }

    public Integer getIdDadosSaude() {
        return idDadosSaude;
    }

    public void setIdDadosSaude(Integer idDadosSaude) {
        this.idDadosSaude = idDadosSaude;
    }

    public Integer getAno() {
        return ano;
    }

    public void setAno(Integer ano) {
        this.ano = ano;
    }

    public String getMes() {
        return mes;
    }

    public void setMes(String mes) {
        this.mes = mes;
    }

    public Double getGastosTotais() {
        return gastosTotais;
    }

    public void setGastosTotais(Double gastosTotais) {
        this.gastosTotais = gastosTotais;
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

    public String getFaixaIdade() {
        return faixaIdade;
    }

    public void setFaixaIdade(String faixaIdade) {
        this.faixaIdade = faixaIdade;
    }

    public Integer getIdMunicipio() {
        return idMunicipio;
    }

    public void setIdMunicipio(Integer idMunicipio) {
        this.idMunicipio = idMunicipio;
    }

    @Override
    public String toString() {
        return "dadosSaude{" +
                "idDadosSaude=" + idDadosSaude +
                ", ano=" + ano +
                ", mes='" + mes + '\'' +
                ", gastosTotais=" + gastosTotais +
                ", numeroInternacoes=" + numeroInternacoes +
                ", numeroObitos=" + numeroObitos +
                ", faixaIdade='" + faixaIdade + '\'' +
                ", idMunicipio=" + idMunicipio +
                '}';
    }
}
