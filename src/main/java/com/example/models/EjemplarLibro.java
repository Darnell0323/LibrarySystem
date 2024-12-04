package com.example.models;

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
@Table(name = "EjemplarLibro")
public class EjemplarLibro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "libro_id")
    private int libroId;

    @Column(name = "edicion")
    private String edicion;

    @Column(name = "publicador")
    private String publicador;

    @Column(name = "anio_publicacion")
    private int anioPublicacion;

    @Column(name = "location_id")
    private int locationId;

    @Column(name = "disponible")
    private boolean disponible;
}