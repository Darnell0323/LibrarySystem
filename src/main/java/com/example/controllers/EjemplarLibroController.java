package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.EjemplarLibro;
import com.example.services.EjemplarLibroService;

@CrossOrigin(origins = "http://localhost:3000") // Allow requests from frontend
@RestController
@RequestMapping("/ejemplar")
public class EjemplarLibroController {

    private final EjemplarLibroService ejemplarLibroService;

    @Autowired
    public EjemplarLibroController(EjemplarLibroService ejemplarLibroService) {
        this.ejemplarLibroService = ejemplarLibroService;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<EjemplarLibro>> listarTodos() {
        List<EjemplarLibro> ejemplares = ejemplarLibroService.getAllEjemplares();
        return new ResponseEntity<>(ejemplares, HttpStatus.OK);
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<EjemplarLibro>> buscarDisponibles() {
        List<EjemplarLibro> disponibles = ejemplarLibroService.getAvailableEjemplares();
        return new ResponseEntity<>(disponibles, HttpStatus.OK);
    }
}
