package com.example.controllers;

import java.util.List;

import com.example.Dtos.EjemplarLibroDto;
import com.example.Dtos.UsuarioDto;
import com.example.models.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<List<EjemplarLibroDto>> listarTodos() {
        List<EjemplarLibroDto> ejemplares = ejemplarLibroService.getAllEjemplares();
        return new ResponseEntity<>(ejemplares, HttpStatus.OK);
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<EjemplarLibro>> buscarDisponibles() {
        List<EjemplarLibro> disponibles = ejemplarLibroService.getAvailableEjemplares();
        return new ResponseEntity<>(disponibles, HttpStatus.OK);
    }

    @PostMapping("/nuevo")
    public  ResponseEntity<EjemplarLibro>agregar (@RequestBody EjemplarLibro ejemplarLibro) {
        EjemplarLibro obj = ejemplarLibroService.nuevoLibro(ejemplarLibro);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @GetMapping("/busqueda")
    public  ResponseEntity<List<EjemplarLibroDto>> buscarBusqueda(@RequestParam int id) {
        List<EjemplarLibroDto> ejemplares = ejemplarLibroService.getAllEjemplares();
        return new ResponseEntity<>(ejemplares, HttpStatus.OK);
    }
}
