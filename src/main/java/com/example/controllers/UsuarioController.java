package com.example.controllers;

import com.example.models.Usuario;
import com.example.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
    private final UsuarioService usuarioService;
    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }
    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Usuario usuario) {
        Usuario autenticado = usuarioService.loginUsuario(usuario.getEmail(), usuario.getPassword_hash());
        if (autenticado != null) {
            return ResponseEntity.ok(autenticado);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    //Listar Usuarios
    @GetMapping("/listar")
    public List<Usuario> cargarUsuarios() {
        return usuarioService.getUsuarios();
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Usuario> eliminar(@PathVariable int id) {
        Usuario obj = usuarioService.buscarUsuarioPorId(id);
        if (obj != null) {
            usuarioService.borrarUsuario(id);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    @PostMapping("/nuevo")
    public  ResponseEntity<Usuario>agregar (@RequestBody Usuario usuario) {
        Usuario obj = usuarioService.nuevoUsuario(usuario);
        return new ResponseEntity<>(obj, HttpStatus.OK);

    }

    @PutMapping("/editar")
    public  ResponseEntity<Usuario>editar (@RequestBody Usuario usuario) {
        Usuario obj = usuarioService.modificarUsuario(usuario);
        return new ResponseEntity<>(obj, HttpStatus.OK);

    }


}
