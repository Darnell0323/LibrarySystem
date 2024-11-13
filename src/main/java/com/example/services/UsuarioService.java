package com.example.services;

import com.example.models.Usuario;
import com.example.repositorys.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@Transactional
public class UsuarioService implements IUsuario {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    public List<Usuario> getUsuarios() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario nuevoUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario buscarUsuarioPorId(int id) {
        return usuarioRepository.findById((long) id).orElse(null);
    }

    @Override
    public void borrarUsuario(int id) {
        try {
            usuarioRepository.deleteById((long) id);
        } catch (EmptyResultDataAccessException e) {
            System.out.println("No se encontró el usuario con ID: " + id);
        }
    }

    @Override
    public Usuario modificarUsuario(Usuario usuario) {
        Usuario obj = usuarioRepository.findById((long) usuario.getId()).orElse(null);
        if (obj!=null) {
            obj.setNombre_usuario(usuario.getNombre_usuario());
            obj.setTelefono(usuario.getTelefono());
            obj.setEmail(usuario.getEmail());
            obj.setPassword_hash(usuario.getPassword_hash());
            obj.setRol(usuario.getRol());
            usuarioRepository.save(obj);
            return obj;
        } else {
            throw new RuntimeException("Usuario no encontrado");
        }
    }
}
