package school.sptech;

public class poluicaoTransporte {
    private Integer idPoluicaoTransporte;
    private String tipoTransporte;
    private Integer qtdTransporte;
    private String tipoPoluicao;
    private Double qtdPoluicao;
    private Integer anoDado;
    private String tipoCombustivel;
    private Integer idMunicipio;

    public poluicaoTransporte(Integer idPoluicaoTransporte, String tipoTransporte, Integer qtdTransporte, String tipoPoluicao, Double qtdPoluicao, Integer anoDado, String tipoCombustivel, Integer idMunicipio) {
        this.idPoluicaoTransporte = idPoluicaoTransporte;
        this.tipoTransporte = tipoTransporte;
        this.qtdTransporte = qtdTransporte;
        this.tipoPoluicao = tipoPoluicao;
        this.qtdPoluicao = qtdPoluicao;
        this.anoDado = anoDado;
        this.tipoCombustivel = tipoCombustivel;
        this.idMunicipio = idMunicipio;
    }

    public poluicaoTransporte() {
    }

    public Integer getIdPoluicaoTransporte() {
        return idPoluicaoTransporte;
    }

    public void setIdPoluicaoTransporte(Integer idPoluicaoTransporte) {
        this.idPoluicaoTransporte = idPoluicaoTransporte;
    }

    public String getTipoTransporte() {
        return tipoTransporte;
    }

    public void setTipoTransporte(String tipoTransporte) {
        this.tipoTransporte = tipoTransporte;
    }

    public Integer getQtdTransporte() {
        return qtdTransporte;
    }

    public void setQtdTransporte(Integer qtdTransporte) {
        this.qtdTransporte = qtdTransporte;
    }

    public String getTipoPoluicao() {
        return tipoPoluicao;
    }

    public void setTipoPoluicao(String tipoPoluicao) {
        this.tipoPoluicao = tipoPoluicao;
    }

    public Double getQtdPoluicao() {
        return qtdPoluicao;
    }

    public void setQtdPoluicao(Double qtdPoluicao) {
        this.qtdPoluicao = qtdPoluicao;
    }

    public Integer getAnoDado() {
        return anoDado;
    }

    public void setAnoDado(Integer anoDado) {
        this.anoDado = anoDado;
    }

    public String getTipoCombustivel() {
        return tipoCombustivel;
    }

    public void setTipoCombustivel(String tipoCombustivel) {
        this.tipoCombustivel = tipoCombustivel;
    }

    public Integer getIdMunicipio() {
        return idMunicipio;
    }

    public void setIdMunicipio(Integer idMunicipio) {
        this.idMunicipio = idMunicipio;
    }

    @Override
    public String toString() {
        return "poluicaoTransporte{" +
                "idPoluicaoTransporte=" + idPoluicaoTransporte +
                ", tipoTransporte='" + tipoTransporte + '\'' +
                ", qtdTransporte=" + qtdTransporte +
                ", tipoPoluicao='" + tipoPoluicao + '\'' +
                ", qtdPoluicao=" + qtdPoluicao +
                ", anoDado=" + anoDado +
                ", tipoCombustivel='" + tipoCombustivel + '\'' +
                ", idMunicipio=" + idMunicipio +
                '}';
    }
}
