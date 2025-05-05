package school.sptech.database.model;

public class Doenca {
    private String nomeDoenca;
    private String cidMes;
    private String altoDoTiete;
    private String francoDaRocha;
    private String mananciais;
    private String rotaDosBandeirantes;
    private String grandeAbc;
    private String saoPaulo;
    private String total;

    public Doenca(String nomeDoenca, String cidMes, String altoDoTiete,
                  String francoDaRocha, String mananciais, String rotaDosBandeirantes,
                  String grandeAbc, String saoPaulo, String total) {
        this.nomeDoenca = nomeDoenca;
        this.cidMes = cidMes;
        this.altoDoTiete = altoDoTiete;
        this.francoDaRocha = francoDaRocha;
        this.mananciais = mananciais;
        this.rotaDosBandeirantes = rotaDosBandeirantes;
        this.grandeAbc = grandeAbc;
        this.saoPaulo = saoPaulo;
        this.total = total;
    }

    public String getCategoria() {
        return nomeDoenca;
    }

    public void setCategoria(String nomeDoenca) {
        this.nomeDoenca = nomeDoenca;
    }

    public String getCidMes() {
        return cidMes;
    }

    public void setCidMes(String cidMes) {
        this.cidMes = cidMes;
    }

    public String getAltoDoTiete() {
        return altoDoTiete;
    }

    public void setAltoDoTiete(String altoDoTiete) {
        this.altoDoTiete = altoDoTiete;
    }

    public String getFrancoDaRocha() {
        return francoDaRocha;
    }

    public void setFrancoDaRocha(String francoDaRocha) {
        this.francoDaRocha = francoDaRocha;
    }

    public String getMananciais() {
        return mananciais;
    }

    public void setMananciais(String mananciais) {
        this.mananciais = mananciais;
    }

    public String getRotaDosBandeirantes() {
        return rotaDosBandeirantes;
    }

    public void setRotaDosBandeirantes(String rotaDosBandeirantes) {
        this.rotaDosBandeirantes = rotaDosBandeirantes;
    }

    public String getGrandeAbc() {
        return grandeAbc;
    }

    public void setGrandeAbc(String grandeAbc) {
        this.grandeAbc = grandeAbc;
    }

    public String getSaoPaulo() {
        return saoPaulo;
    }

    public void setSaoPaulo(String saoPaulo) {
        this.saoPaulo = saoPaulo;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    @Override
    public String toString() {
        return "Doenca{" +
                "nomeDoenca='" + nomeDoenca + '\'' +
                ", cidMes='" + cidMes + '\'' +
                ", altoDoTiete='" + altoDoTiete + '\'' +
                ", francoDaRocha='" + francoDaRocha + '\'' +
                ", mananciais='" + mananciais + '\'' +
                ", rotaDosBandeirantes='" + rotaDosBandeirantes + '\'' +
                ", grandeAbc='" + grandeAbc + '\'' +
                ", saoPaulo='" + saoPaulo + '\'' +
                ", total='" + total + '\'' +
                '}';
    }
}