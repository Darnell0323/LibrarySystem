package com.example.controllers;

import com.example.Dtos.LoginRequestDto;
import com.example.Dtos.LoginResponseDto;
import com.example.Dtos.UsuarioDto;
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

@CrossOrigin(origins = "http://localhost:3000")
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
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDto.getEmail(),
                        loginRequestDto.getPassword_hash()));
        Usuario usuario = (Usuario) authentication.getPrincipal();
        String JWTtoken = tokenService.generateToken(usuario); // Crea el token
        LoginResponseDto loginResponseDto = new LoginResponseDto(JWTtoken,usuario.getRol().getRoleName(),usuario.getNombre_usuario(), usuario.getId()); // Crea un objeto respuesta login que guarda  el token y el rol
        return ResponseEntity.ok(loginResponseDto); // Devuelve la respuesta del login
    }

    //Listar Usuarios
    @GetMapping("/listar")
    public List<UsuarioDto> cargarUsuarios() {
        return usuarioService.getUsuarios();
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<UsuarioDto> eliminar(@PathVariable int id) {
        UsuarioDto obj = usuarioService.buscarUsuarioPorId(id);
        if (obj != null) {
            usuarioService.borrarUsuario(id);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    @PostMapping("/nuevo")
    public  ResponseEntity<UsuarioDto>agregar (@RequestBody Usuario usuario) {
        UsuarioDto obj = usuarioService.nuevoUsuario(usuario);
        return new ResponseEntity<>(obj, HttpStatus.OK);

    }

    @PutMapping("/editar")
    public  ResponseEntity<UsuarioDto>editar (@RequestBody Usuario usuario) {
        UsuarioDto obj = usuarioService.modificarUsuario(usuario);
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
