package com.example.services;

import com.example.Dtos.EjemplarLibroDto;
import com.example.models.EjemplarLibro;
import com.example.models.Libro;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import com.example.repositorys.EjemplarLibroRepository;

@Service
public class EjemplarLibroService {

    private final EjemplarLibroRepository ejemplarLibroRepository;
    private LibroService libroService;

    @Autowired
    public EjemplarLibroService(EjemplarLibroRepository ejemplarLibroRepository) {
        this.ejemplarLibroRepository = ejemplarLibroRepository;
    }

    public List<EjemplarLibroDto> getAllEjemplares() {
        List<EjemplarLibro> ejemplares = ejemplarLibroRepository.findAll();
        List<EjemplarLibroDto> ejemplaresDtos = new ArrayList<>();
        Libro libro;
        for (EjemplarLibro ejemplar : ejemplares) {
            EjemplarLibroDto ejemplarDto = new EjemplarLibroDto();
            libro = libroService.getLibroById(ejemplar.getLibroId());
            ejemplarDto.setId(ejemplar.getId());
            ejemplarDto.setDisponible(ejemplar.isDisponible());
            ejemplarDto.setAutor(libro.getAutor());
            ejemplarDto.setTitulo(libro.getTitulo());
            ejemplarDto.setEdicion(ejemplar.getEdicion());
            ejemplarDto.setEditorial(ejemplar.getPublicador());
            ejemplarDto.setAnio(ejemplar.getAnioPublicacion());
            ejemplaresDtos.add(ejemplarDto);
        }
        return ejemplaresDtos;
    }

    public List<EjemplarLibro> getAvailableEjemplares() {
        return ejemplarLibroRepository.findByDisponibleTrue();
    }

    public EjemplarLibro getEjemplareById(int id) {
        return ejemplarLibroRepository.getReferenceById(id);
    }
    public EjemplarLibro nuevoLibro(EjemplarLibro libro) {
        return ejemplarLibroRepository.save(libro);
    }

    public  List<EjemplarLibroDto> buscarLibro(String titulo, String autor, String categoria) {
        var ejemplar = ejemplarLibroRepository.findByTitleAndAuthorAndCategoria("%"+titulo+"%", "%"+autor+"%", "%"+categoria+"%");
        if (ejemplar != null && !ejemplar.isEmpty()) {
            return ejemplar;
        }
        return new ArrayList<>();
    }

    @Autowired
    public void setLibroService(LibroService libroService) {
        this.libroService = libroService;
    }
}
