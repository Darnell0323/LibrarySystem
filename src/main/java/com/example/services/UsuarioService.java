package com.example.services;

import com.example.Dtos.UsuarioDto;
import com.example.models.Usuario;
import com.example.repositorys.RolRepository;
import com.example.repositorys.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
@Transactional
public class UsuarioService implements IUsuario {

    private UsuarioRepository usuarioRepository;

    private RolRepository rolRepository;

    @Override
    public List<UsuarioDto> getUsuarios() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        List<UsuarioDto> usuarioDtos = new ArrayList<>();
        for (Usuario usuario : usuarios) {
            usuarioDtos.add(Dto(usuario));
        }
        return usuarioDtos;
    }

    @Override
    public UsuarioDto nuevoUsuario(Usuario usuario) {
        usuario.setRol( rolRepository.findById(usuario.getId_rol()).orElse(null));
        usuario.setPassword_hash(new BCryptPasswordEncoder().encode(usuario.getPassword()));
        usuarioRepository.save(usuario);
        return Dto(usuario);
    }

    @Override
    public UsuarioDto buscarUsuarioPorId(int id) {
        Usuario usuario = usuarioRepository.findById((long) id).orElse(null);
        assert usuario != null : "Usuario no encontrado";
        return Dto(usuario);
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
    public UsuarioDto modificarUsuario(Usuario usuario) {
        Usuario obj = usuarioRepository.findById((long) usuario.getId()).orElse(null);
        if (obj!=null) {
            obj.setNombre_usuario(usuario.getNombre_usuario());
            obj.setTelefono(usuario.getTelefono());
            obj.setEmail(usuario.getEmail());
            obj.setPassword_hash(usuario.getPassword_hash());
            obj.setRol(usuario.getRol());
            usuarioRepository.save(obj);
            return Dto(obj);
        } else {
            throw new RuntimeException("Usuario no encontrado");
        }
    }

    public UsuarioDto Dto(Usuario usuario) {
        UsuarioDto usuarioDto = new UsuarioDto();
        usuarioDto.setId(usuario.getId());
        usuarioDto.setEmail(usuario.getEmail());
        usuarioDto.setFecha_registro(usuario.getFecha_registro());
        usuarioDto.setNombre_usuario(usuario.getNombre_usuario());
        usuarioDto.setPassword_hash(usuario.getPassword_hash());
        usuarioDto.setRol(usuario.getRol());
        usuarioDto.setTelefono(usuario.getTelefono());
        return usuarioDto;
    }

    @Autowired
    public void setRolRepository(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    @Autowired
    public void setUsuarioRepository(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
}
