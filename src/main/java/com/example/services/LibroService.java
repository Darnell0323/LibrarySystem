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

    public Libro getLibroById(int id) {
        return libroRepository.getReferenceById(id);
    }

    // Search for available books
    /*public List<Libro> buscarLibrosDisponibles() {
        return libroRepository.findByDisponibleTrue();
    }*/

    // Search for books with filters
    public List<Libro> searchLibros(String titulo, String autor, Integer categoriaId) {
        if (titulo == null && autor == null && categoriaId == null) {
            return libroRepository.findAll();
        }
        return libroRepository.findByTituloContainingAndAutorContainingAndCategoriaId(
                titulo != null ? titulo : "",
                autor != null ? autor : "",
                categoriaId
        );
    }
    public List<Libro> getLibrosByAutor(String autor) {
        return libroRepository.findByAutor(autor);
    }

    public List<Libro> getLibrosByTitulo(String titulo) {
        return libroRepository.findByTitulo(titulo);
    }

    public List<Libro> getLibrosByCategoria(Integer categoriaId) {
        return libroRepository.findByCategoriaId(categoriaId);
    }
}
