package com.example.services;

import com.example.Dtos.UsuarioDto;
import com.example.models.Usuario;

import java.util.List;

public interface IUsuario {
    List<UsuarioDto> getUsuarios();
    UsuarioDto nuevoUsuario(Usuario usuario);
    UsuarioDto buscarUsuarioPorId(int id);
    void borrarUsuario(int id);
    UsuarioDto modificarUsuario(Usuario usuario);
}
