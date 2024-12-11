package com.example.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EjemplarLibroDto {

    private int id;

    private String titulo;

    private String autor;

    private String editorial;

    private String edicion;

    private Boolean disponible;

    private int anio;
}
