package school.sptech;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class ExemploSort {
    public static void main(String[] args) {
        Aluno aluno1 = new Aluno("Julio", 50, 9.0);
        Aluno aluno2 = new Aluno("Julinho", 1, 10.0);
        Aluno aluno3 = new Aluno("Julioa", 18, 1.0);
        Aluno aluno4 = new Aluno("Juliao", 90, 2.0);
        Aluno aluno5 = new Aluno("Ju", 20, 4.0);
        Aluno aluno6 = new Aluno("Julinhozao", 130, 6.0);

        List<Aluno> alunos = new ArrayList<>(List.of(aluno1, aluno2, aluno3, aluno4, aluno5));
        List<Aluno> alunosOrdenados = alunos.stream().sorted(Comparator.comparing(a -> a.getNome())).toList();
        System.out.println(alunosOrdenados);

    }
}
