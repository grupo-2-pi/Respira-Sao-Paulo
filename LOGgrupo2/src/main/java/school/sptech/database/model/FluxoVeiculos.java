package school.sptech.database.model;

public class FluxoVeiculos {

        private String mes;
        private String tipoVeiculo;
        private Integer quantidade;

        public FluxoVeiculos() {}

        public FluxoVeiculos(String mes, String tipoVeiculo, Integer quantidade) {
            this.mes = mes;
            this.tipoVeiculo = tipoVeiculo;
            this.quantidade = quantidade;
        }

        public String getMes() { return mes; }
        public void setMes(String mes) { this.mes = mes; }

        public String getTipoVeiculo() { return tipoVeiculo; }
        public void setTipoVeiculo(String tipoVeiculo) { this.tipoVeiculo = tipoVeiculo; }

        public Integer getQuantidade() { return quantidade; }
        public void setQuantidade(Integer quantidade) { this.quantidade = quantidade; }

        @Override
        public String toString() {
            return "FluxoVeiculos{" +
                    "mes='" + mes + '\'' +
                    ", tipoVeiculo='" + tipoVeiculo + '\'' +
                    ", quantidade=" + quantidade +
                    '}';
        }
}


