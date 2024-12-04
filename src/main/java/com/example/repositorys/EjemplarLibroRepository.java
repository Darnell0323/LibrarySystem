package com.example.repositorys;

import com.example.models.EjemplarLibro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface EjemplarLibroRepository extends JpaRepository<EjemplarLibro, Integer> {
    List<EjemplarLibro> findByDisponibleTrue(); // Custom query to get available books
}