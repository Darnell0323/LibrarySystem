package com.example.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.models.Libro;
import com.example.repositorys.LibroRepository;

@Service
public class LibroService {

    private final LibroRepository libroRepository;

    @Autowired
    public LibroService(LibroRepository libroRepository) {
        this.libroRepository = libroRepository;
    }

    // Fetch all books
    public List<Libro> getLibros() {
        return libroRepository.findAll();
    }

    // Search for available books
    public List<Libro> buscarLibrosDisponibles() {
        return libroRepository.findByDisponibleTrue();
    }

    // Additional methods like save, update, delete can be added here
}
