package school.sptech;

public class Funcionarios {
    private Integer idFuncionarios;
    private String nome;
    private String cpf;
    private String email;
    private String cargo;
    private Integer idEmpresa;

    public Funcionarios(Integer idFuncionarios, String nome, String cpf, String email, String cargo, Integer idEmpresa) {
        this.idFuncionarios = idFuncionarios;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.cargo = cargo;
        this.idEmpresa = idEmpresa;
    }

    public Funcionarios() {
    }

    public Integer getIdFuncionarios() {
        return idFuncionarios;
    }

    public void setIdFuncionarios(Integer idFuncionarios) {
        this.idFuncionarios = idFuncionarios;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public Integer getIdEmpresa() {
        return idEmpresa;
    }

    public void setIdEmpresa(Integer idEmpresa) {
        this.idEmpresa = idEmpresa;
    }

    @Override
    public String toString() {
        return "Funcionarios{" +
                "idFuncionarios=" + idFuncionarios +
                ", nome='" + nome + '\'' +
                ", cpf='" + cpf + '\'' +
                ", email='" + email + '\'' +
                ", cargo='" + cargo + '\'' +
                ", idEmpresa=" + idEmpresa +
                '}';
    }
}
