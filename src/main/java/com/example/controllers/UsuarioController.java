package com.example.controllers;

import com.example.models.Usuario;
import com.example.security.TokenService;
import com.example.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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

    private AuthenticationManager authenticationManager;

    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Usuario usuario) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(usuario.getEmail(), usuario.getPassword());
        var usuarioauthenticated = authenticationManager.authenticate(authentication);
        var JWTtoken = tokenService.generateToken((Usuario) usuarioauthenticated.getPrincipal());
        return ResponseEntity.ok(JWTtoken);
    }

    //Listar Usuarios
    @GetMapping("/listar")
    public List<Usuario> cargarUsuarios() {
        var aux = usuarioService.getUsuarios();
        return aux;
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

    @Autowired
    public void setTokenService(TokenService tokenService) {
        this.tokenService = tokenService;
    }
    @Autowired
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }
}
