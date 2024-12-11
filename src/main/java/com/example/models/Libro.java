package com.example.models;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = Libro.TABLE_NAME)
public class Libro {

    public static final String TABLE_NAME = "Libros";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "autor")
    private String autor;

    @Column(name = "categoria_id")
    private int categoriaId;

    @Column(name = "fecha_publicacion")
    private LocalDate fechaPublicacion;

    /*@Column(name = "disponible")
    private boolean disponible;*/
}
