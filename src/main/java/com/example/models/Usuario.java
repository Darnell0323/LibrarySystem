package com.example.models;
import java.time.LocalDateTime;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name=Usuario.TABLE_NAME)
public class Usuario {

    public static final String TABLE_NAME = "Usuarios";

    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Id
    private int id;

    @Column(name = "nombre")
    private String nombre_usuario;


    @Column(name = "contraseña")
    private String password_hash;

    @Column(name = "correo")
    private String email;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "fecha_registro")
    private LocalDateTime fecha_registro;

    @Column(name = "rol")
    private String rol;
}
