package school.sptech.database.model;

public class Municipios {
    private Integer idMunicipios;
    private String nomeMunicipio;

    public Municipios(Integer idMunicipios, String nomeMunicipio) {
        this.idMunicipios = idMunicipios;
        this.nomeMunicipio = nomeMunicipio;
    }

    public Municipios() {
    }

    public Integer getIdMunicipios() {
        return idMunicipios;
    }

    public void setIdMunicipios(Integer idMunicipios) {
        this.idMunicipios = idMunicipios;
    }

    public String getNomeMunicipio() {
        return nomeMunicipio;
    }

    public void setNomeMunicipio(String nomeMunicipio) {
        this.nomeMunicipio = nomeMunicipio;
    }

    @Override
    public String toString() {
        return "Municipios{" +
                "idMunicipios=" + idMunicipios +
                ", nomeMunicipio='" + nomeMunicipio + '\'' +
                '}';
    }
}
