package school.sptech.utils;

import java.util.HashMap;
import java.util.Map;

public class MapaMunicipiosSP {
        Map<String, String> municipiosRegioes = new HashMap<>();

        public MapaMunicipiosSP() {
            // Região Metropolitana (Grande São Paulo e ABC)
            adicionarABC(municipiosRegioes);
            adicionarGrandeSaoPaulo(municipiosRegioes);

            // Interior e outras regiões
            adicionarValeParaiba(municipiosRegioes);
            adicionarCampinas(municipiosRegioes);
            adicionarSorocaba(municipiosRegioes);
            adicionarBaixadaSantista(municipiosRegioes);
            adicionarRibeiraoPreto(municipiosRegioes);
            adicionarSaoCarlos(municipiosRegioes);
            adicionarBauru(municipiosRegioes);
            adicionarMarilia(municipiosRegioes);
            adicionarAracatuba(municipiosRegioes);
            adicionarPresidentePrudente(municipiosRegioes);
            adicionarSaoJoseRioPreto(municipiosRegioes);
            adicionarPiracicaba(municipiosRegioes);
            adicionarOutrasRegioes(municipiosRegioes);

        }
    private void adicionarABC(Map<String, String> map) {
        map.put("SANTO ANDRE", "ABC");
        map.put("SAO BERNARDO DO CAMPO", "ABC");
        map.put("SAO CAETANO DO SUL", "ABC");
        map.put("DIADEMA", "ABC");
        map.put("MAUA", "ABC");
        map.put("RIBEIRAO PIRES", "ABC");
        map.put("RIO GRANDE DA SERRA", "ABC");
    }

    private void adicionarGrandeSaoPaulo(Map<String, String> map) {
        map.put("SAO PAULO", "Centro");
        map.put("GUARULHOS", "Grande São Paulo");
        map.put("OSASCO", "Grande São Paulo");
        map.put("SANTO AMARO", "Grande São Paulo");
        map.put("BARUERI", "Grande São Paulo");
        map.put("CARAPICUIBA", "Grande São Paulo");
        map.put("ITAPECERICA DA SERRA", "Grande São Paulo");
        map.put("EMBU DAS ARTES", "Grande São Paulo");
        map.put("TABOAO DA SERRA", "Grande São Paulo");
        map.put("JANDIRA", "Grande São Paulo");
    }

    private void adicionarValeParaiba(Map<String, String> map) {
        map.put("SAO JOSE DOS CAMPOS", "Vale do Paraíba");
        map.put("TAUBATE", "Vale do Paraíba");
        map.put("JACAREI", "Vale do Paraíba");
        map.put("CACAPAVA", "Vale do Paraíba");
        map.put("CAMPOS DO JORDAO", "Vale do Paraíba");
        map.put("APARECIDA", "Vale do Paraíba");
        map.put("GUARATINGUETA", "Vale do Paraíba");
        map.put("PINDAMONHANGABA", "Vale do Paraíba");
        map.put("LORENA", "Vale do Paraíba");
        map.put("CRUZEIRO", "Vale do Paraíba");
    }

    private void adicionarCampinas(Map<String, String> map) {
        map.put("CAMPINAS", "Campinas");
        map.put("INDAIATUBA", "Campinas");
        map.put("HORTOLANDIA", "Campinas");
        map.put("SUMARE", "Campinas");
        map.put("VALINHOS", "Campinas");
        map.put("VINHEDO", "Campinas");
        map.put("PAULINIA", "Campinas");
        map.put("JAGUARIUNA", "Campinas");
        map.put("MOGI MIRIM", "Campinas");
        map.put("MOGI GUACU", "Campinas");
    }

    private void adicionarSorocaba(Map<String, String> map) {
        map.put("SOROCABA", "Sorocaba");
        map.put("ITU", "Sorocaba");
        map.put("SALTO", "Sorocaba");
        map.put("VOTORANTIM", "Sorocaba");
        map.put("ITAPETININGA", "Sorocaba");
        map.put("TATUI", "Sorocaba");
        map.put("PORTO FELIZ", "Sorocaba");
        map.put("BOITUVA", "Sorocaba");
    }

    private void adicionarBaixadaSantista(Map<String, String> map) {
        map.put("SANTOS", "Baixada Santista");
        map.put("SAO VICENTE", "Baixada Santista");
        map.put("GUARUJA", "Baixada Santista");
        map.put("CUBATAO", "Baixada Santista");
        map.put("PRAIA GRANDE", "Baixada Santista");
        map.put("MONGAGUA", "Baixada Santista");
        map.put("ITANHAEM", "Baixada Santista");
        map.put("PERUIBE", "Baixada Santista");
        map.put("BERTIOGA", "Baixada Santista");
    }

    private void adicionarRibeiraoPreto(Map<String, String> map) {
        map.put("RIBEIRAO PRETO", "Ribeirão Preto");
        map.put("SERTAOZINHO", "Ribeirão Preto");
        map.put("BATATAIS", "Ribeirão Preto");
        map.put("JABOTICABAL", "Ribeirão Preto");
        map.put("BARRETOS", "Ribeirão Preto");
        map.put("FRANCA", "Ribeirão Preto");
        map.put("BEBEDOURO", "Ribeirão Preto");
        map.put("PITANGUEIRAS", "Ribeirão Preto");
    }

    private void adicionarSaoCarlos(Map<String, String> map) {
        map.put("SAO CARLOS", "São Carlos");
        map.put("ARARAQUARA", "São Carlos");
        map.put("RIBEIRAO BONITO", "São Carlos");
        map.put("DOURADO", "São Carlos");
        map.put("IBITINGA", "São Carlos");
        map.put("ITIRAPINA", "São Carlos");
    }

    private void adicionarBauru(Map<String, String> map) {
        map.put("BAURU", "Bauru");
        map.put("JAU", "Bauru");
        map.put("LENCOIS PAULISTA", "Bauru");
        map.put("AGUDOS", "Bauru");
        map.put("PIRAJUI", "Bauru");
        map.put("AREALVA", "Bauru");
    }

    private void adicionarMarilia(Map<String, String> map) {
        map.put("MARILIA", "Marília");
        map.put("GARCA", "Marília");
        map.put("POMPEIA", "Marília");
        map.put("VERA CRUZ", "Marília");
        map.put("OURINHOS", "Marília");
        map.put("ASSIS", "Marília");
    }

    private void adicionarAracatuba(Map<String, String> map) {
        map.put("ARACATUBA", "Araçatuba");
        map.put("BIRIGUI", "Araçatuba");
        map.put("PENAPOLIS", "Araçatuba");
        map.put("VALPARAISO", "Araçatuba");
        map.put("GUARARAPES", "Araçatuba");
    }

    private void adicionarPresidentePrudente(Map<String, String> map) {
        map.put("PRESIDENTE PRUDENTE", "Presidente Prudente");
        map.put("ALVARES MACHADO", "Presidente Prudente");
        map.put("PRESIDENTE EPITACIO", "Presidente Prudente");
        map.put("PRESIDENTE VENCESLAU", "Presidente Prudente");
        map.put("DRACENA", "Presidente Prudente");
    }

    private void adicionarSaoJoseRioPreto(Map<String, String> map) {
        map.put("SAO JOSE DO RIO PRETO", "São José do Rio Preto");
        map.put("CATANDUVA", "São José do Rio Preto");
        map.put("VOTUPORANGA", "São José do Rio Preto");
        map.put("JALES", "São José do Rio Preto");
        map.put("MIRASSOL", "São José do Rio Preto");
    }

    private void adicionarPiracicaba(Map<String, String> map) {
        map.put("PIRACICABA", "Piracicaba");
        map.put("LIMEIRA", "Piracicaba");
        map.put("RIO CLARO", "Piracicaba");
        map.put("PIRASSUNUNGA", "Piracicaba");
        map.put("CAPIVARI", "Piracicaba");
        map.put("CHARQUEADA", "Piracicaba");
    }

    private void adicionarOutrasRegioes(Map<String, String> map) {
        map.put("SAO JOAO DA BOA VISTA", "Macro Região");
        map.put("AMERICANA", "Macro Região");
        map.put("SANTA CRUZ DO RIO PARDO", "Macro Região");
        map.put("TUPI PAULISTA", "Macro Região");
        map.put("REGISTRO", "Vale do Ribeira");
    }

    public String pegarMunicipio(String municipio){
            return this.municipiosRegioes.get(municipio);
    }
}