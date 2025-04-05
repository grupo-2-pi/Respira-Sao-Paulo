package school.sptech;

import java.time.LocalDate;

public class Empresa {
    private Integer idEmpresa;
    private String CNPJ;
    private String nomeFantasia;
    private Integer qtdFuncionarios;
    private LocalDate dataContratacao;
    private LocalDate dataFimContrato;

    public Empresa(Integer idEmpresa, String CNPJ, String nomeFantasia, Integer qtdFuncionarios, LocalDate dataContratacao, LocalDate dataFimContrato) {
        this.idEmpresa = idEmpresa;
        this.CNPJ = CNPJ;
        this.nomeFantasia = nomeFantasia;
        this.qtdFuncionarios = qtdFuncionarios;
        this.dataContratacao = dataContratacao;
        this.dataFimContrato = dataFimContrato;
    }

    public Empresa() {
    }

    public Integer getIdEmpresa() {
        return idEmpresa;
    }

    public void setIdEmpresa(Integer idEmpresa) {
        this.idEmpresa = idEmpresa;
    }

    public String getCNPJ() {
        return CNPJ;
    }

    public void setCNPJ(String CNPJ) {
        this.CNPJ = CNPJ;
    }

    public String getNomeFantasia() {
        return nomeFantasia;
    }

    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
    }

    public Integer getQtdFuncionarios() {
        return qtdFuncionarios;
    }

    public void setQtdFuncionarios(Integer qtdFuncionarios) {
        this.qtdFuncionarios = qtdFuncionarios;
    }

    public LocalDate getDataContratacao() {
        return dataContratacao;
    }

    public void setDataContratacao(LocalDate dataContratacao) {
        this.dataContratacao = dataContratacao;
    }

    public LocalDate getDataFimContrato() {
        return dataFimContrato;
    }

    public void setDataFimContrato(LocalDate dataFimContrato) {
        this.dataFimContrato = dataFimContrato;
    }

    @Override
    public String toString() {
        return "Empresa{" +
                "idEmpresa=" + idEmpresa +
                ", CNPJ='" + CNPJ + '\'' +
                ", nomeFantasia='" + nomeFantasia + '\'' +
                ", qtdFuncionarios=" + qtdFuncionarios +
                ", dataContratacao=" + dataContratacao +
                ", dataFimContrato=" + dataFimContrato +
                '}';
    }
}
