package com.example.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.models.Libro;

@Repository
public interface LibroRepository extends JpaRepository<Libro, Integer> {

    // Find books that are available
    //List<Libro> findByDisponibleTrue();

    // Custom search query with filters
    List<Libro> findByTituloContainingAndAutorContainingAndCategoriaId(
            String titulo,
            String autor,
            Integer categoriaId
    );
    List<Libro> findByAutor(String autor);
    List<Libro> findByCategoriaId(Integer categoriaId);
    List<Libro> findByTitulo(String titulo);
}
