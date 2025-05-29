package school.sptech;


import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> numeros = new ArrayList<>(List.of("um", "dois", "tres", "quatro", "cinco"));

        List<String> numerosFiltrados = numeros.stream()
                .filter(numero -> numero.contains("o"))
                .toList();


        System.out.println(numerosFiltrados);

        List<String> numerosGrandes = numeros.stream()
                .map(numero -> numero.toUpperCase())
                .toList();

        System.out.println(numerosGrandes);

        Boolean temLetraE = numeros.stream()
                .anyMatch(numero -> numero.contains("e"));
        System.out.println("Encontrei com letra E:" + temLetraE);

        Boolean todoMundoTemLetra = numeros.stream()
                .allMatch(numero -> numero.contains("o"));
        System.out.println("Todos tem letra 'B': " + todoMundoTemLetra);

       List<Integer> inteiros = new ArrayList<>(List.of(40,12, 1, 6, 6, 20,30));


List<Integer> inteirosOrdenados = inteiros.stream()
        .sorted()
        .toList();
        System.out.println(inteirosOrdenados);





















    }
}