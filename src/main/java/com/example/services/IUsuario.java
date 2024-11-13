package com.example.services;

import com.example.models.Usuario;

import java.util.List;

public interface IUsuario {
    List<Usuario> getUsuarios();
    Usuario nuevoUsuario(Usuario usuario);
    Usuario buscarUsuarioPorId(int id);
    void borrarUsuario(int id);
    Usuario modificarUsuario(Usuario usuario);
}
