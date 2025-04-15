package school.sptech.database.model;

public class FrotaCirculante {

    private String municipio;
    private String regiao;
    private Integer automoveis;
    private Integer comerciaisLeves;
    private Integer caminhoes;
    private Integer onibus;
    private Integer motos;
    private Double total;
    private String ano;

    public FrotaCirculante(String municipio, String regiao, Integer automoveis, Integer comerciaisLeves, Integer caminhoes, Integer onibus, Integer motos, Double total, String ano) {
        this.municipio = municipio;
        this.regiao = regiao;
        this.automoveis = automoveis;
        this.comerciaisLeves = comerciaisLeves;
        this.caminhoes = caminhoes;
        this.onibus = onibus;
        this.motos = motos;
        this.ano = ano;
        this.total = total;
    }

    public String getMunicipio() {
        return municipio;
    }

    public void setMunicipio(String municipio) {
        this.municipio = municipio;
    }

    public String getRegiao() {
        return regiao;
    }

    public void setRegiao(String regiao) {
        this.regiao = regiao;
    }

    public Integer getAutomoveis() {
        return automoveis;
    }

    public void setAutomoveis(Integer automoveis) {
        this.automoveis = automoveis;
    }

    public Integer getComerciaisLeves() {
        return comerciaisLeves;
    }

    public void setComerciaisLeves(Integer comerciaisLeves) {
        this.comerciaisLeves = comerciaisLeves;
    }

    public Integer getCaminhoes() {
        return caminhoes;
    }

    public void setCaminhoes(Integer caminhoes) {
        this.caminhoes = caminhoes;
    }

    public Integer getOnibus() {
        return onibus;
    }

    public void setOnibus(Integer onibus) {
        this.onibus = onibus;
    }

    public Integer getMotos() {
        return motos;
    }

    public void setMotos(Integer motos) {
        this.motos = motos;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public String getAno() {
        return ano;
    }

    public void setAno(String ano) {
        this.ano = ano;
    }

    @Override
    public String toString() {
        return "FrotaCirculante{" +
                "municipio='" + municipio + '\'' +
                ", regiao='" + regiao + '\'' +
                ", automoveis=" + automoveis +
                ", comerciaisLeves=" + comerciaisLeves +
                ", caminhoes=" + caminhoes +
                ", onibus=" + onibus +
                ", motos=" + motos +
                ", total=" + total +
                ", ano='" + ano + '\'' +
                '}';
    }
}
