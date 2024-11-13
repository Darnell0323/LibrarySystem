package com.example.controllers;

import com.example.models.Libro;
import com.example.services.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/libro")
public class LibroController {

    private final LibroService libroService;

    @Autowired
    public LibroController(LibroService libroService) {
        this.libroService = libroService;
    }

    // List all books
    @GetMapping("/listar")
    public List<Libro> listarLibros() {
        return libroService.getLibros();
    }

    // Search for available books
    @GetMapping("/disponibles")
    public ResponseEntity<List<Libro>> buscarLibrosDisponibles() {
        List<Libro> disponibles = libroService.buscarLibrosDisponibles();
        return new ResponseEntity<>(disponibles, HttpStatus.OK);
    }
}
