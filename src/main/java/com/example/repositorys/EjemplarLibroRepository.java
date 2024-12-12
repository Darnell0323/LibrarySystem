package com.example.repositorys;

import com.example.Dtos.EjemplarLibroDto;
import com.example.models.EjemplarLibro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface EjemplarLibroRepository extends JpaRepository<EjemplarLibro, Integer> {
    List<EjemplarLibro> findByDisponibleTrue();// Custom query to get available books

    @Query("SELECT new com.example.Dtos.EjemplarLibroDto(ej.id,li.titulo,li.autor, ej.publicador, ej.edicion, ej.disponible, ej.anioPublicacion)  FROM EjemplarLibro ej JOIN Libro li ON ej.libroId = li.id " +
            "JOIN Categoria ca ON ca.id = li.categoriaId " +
            "WHERE (:title IS NULL OR UPPER(li.titulo) LIKE UPPER(:title)) " +
            "AND (:author IS NULL OR UPPER(li.autor) LIKE UPPER(:author)) " +
            "AND (:categoria IS NULL OR UPPER(ca.nombre) LIKE UPPER(:categoria)) ")
    List<EjemplarLibroDto> findByTitleAndAuthorAndCategoria(String title, String author, String categoria);
}