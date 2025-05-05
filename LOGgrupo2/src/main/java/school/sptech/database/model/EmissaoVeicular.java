package school.sptech.database.model;

public class EmissaoVeicular {
    private String tipoVeiculo;
    private int ano;
    private Double valorCO;
    private Double valorHC;
    private Double valorNOX;
    private Double valorCO2;
    private Double valorRCHO;
    private Double valorMP;
    private Double valorN2O;

    public EmissaoVeicular(String tipoVeiculo, int ano, Double valorCO, Double valorHC, Double valorNOX, Double valorCO2, Double valorRCHO, Double valorMP, Double valorN2O) {
        this.tipoVeiculo = tipoVeiculo;
        this.ano = ano;
        this.valorCO = valorCO;
        this.valorHC = valorHC;
        this.valorNOX = valorNOX;
        this.valorCO2 = valorCO2;
        this.valorRCHO = valorRCHO;
        this.valorMP = valorMP;
        this.valorN2O = valorN2O;
    }

    public String getTipoVeiculo() {
        return tipoVeiculo;
    }

    public void setTipoVeiculo(String tipoVeiculo) {
        this.tipoVeiculo = tipoVeiculo;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public Double getValorCO() {
        return valorCO;
    }

    public void setValorCO(Double valorCO) {
        this.valorCO = valorCO;
    }

    public Double getValorHC() {
        return valorHC;
    }

    public void setValorHC(Double valorHC) {
        this.valorHC = valorHC;
    }

    public Double getValorNOX() {
        return valorNOX;
    }

    public void setValorNOX(Double valorNOX) {
        this.valorNOX = valorNOX;
    }

    public Double getValorCO2() {
        return valorCO2;
    }

    public void setValorCO2(Double valorCO2) {
        this.valorCO2 = valorCO2;
    }

    public Double getValorRCHO() {
        return valorRCHO;
    }

    public void setValorRCHO(Double valorRCHO) {
        this.valorRCHO = valorRCHO;
    }

    public Double getValorMP() {
        return valorMP;
    }

    public void setValorMP(Double valorMP) {
        this.valorMP = valorMP;
    }

    public Double getValorN2O() {
        return valorN2O;
    }

    public void setValorN2O(Double valorN2O) {
        this.valorN2O = valorN2O;
    }

    @Override
    public String toString() {
        return "EmissaoVeicular{" +
                "tipoVeiculo='" + tipoVeiculo + '\'' +
                ", ano=" + ano +
                ", valorCO=" + valorCO +
                ", valorHC=" + valorHC +
                ", valorNOX=" + valorNOX +
                ", valorCO2=" + valorCO2 +
                ", valorRCHO=" + valorRCHO +
                ", valorMP=" + valorMP +
                ", valorN2O=" + valorN2O +
                '}';
    }
}
