package com.example.services;

import com.example.models.EjemplarLibro;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import com.example.repositorys.EjemplarLibroRepository;

@Service
public class EjemplarLibroService {

    private final EjemplarLibroRepository ejemplarLibroRepository;

    @Autowired
    public EjemplarLibroService(EjemplarLibroRepository ejemplarLibroRepository) {
        this.ejemplarLibroRepository = ejemplarLibroRepository;
    }

    public List<EjemplarLibro> getAllEjemplares() {
        return ejemplarLibroRepository.findAll();
    }

    public List<EjemplarLibro> getAvailableEjemplares() {
        return ejemplarLibroRepository.findByDisponibleTrue();
    }
}
