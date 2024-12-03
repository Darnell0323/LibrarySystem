package com.example.Dtos;

import com.example.models.Rol;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDto {

    private int id;

    private String nombre_usuario;

    private String password_hash;

    private String email;

    private String telefono;

    private LocalDateTime fecha_registro;

    private Rol rol;
}
