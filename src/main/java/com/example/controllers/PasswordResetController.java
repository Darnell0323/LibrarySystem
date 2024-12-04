package com.example.controllers;
/*
import com.example.models.PasswordResetToken;
import com.example.models.Usuario;
import com.example.repositorys.PasswordResetTokenRepository;
import com.example.services.EmailService;
import com.example.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class PasswordResetController {

    private EmailService emailService;

    private UsuarioService usuarioService;

    private PasswordResetTokenRepository passwordResetTokenRepository;

    @PostMapping("/recuperarContraseña")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        Usuario usuario = usuarioService.EmailExiste(email);
        // Verificar si el email existe en la base de datos
        if(usuario!=null) {
            // Generar un token único y temporal
            String token = UUID.randomUUID().toString();
            // Guardar el token asociado al usuario en la base de datos con una fecha de expiración
            passwordResetTokenRepository.save(new PasswordResetToken(token,usuario));
            // Enviar el token al correo del usuario
            emailService.sendEmail(email, "Solicitud de recuperar contraseña",
                    "Usa el siguiente link para recuperar tu contraseña: http://localhost:3000/RecuperarContraseña?token=" + token);

        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok("Si el correo existe.El link para recuperar tu contraseña ha sido enviado.");

    }

    @Autowired
    public void setEmailService(EmailService emailService) {
        this.emailService = emailService;
    }

    @Autowired
    public void setUsuarioService(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @Autowired
    public void setPasswordResetTokenRepository(PasswordResetTokenRepository passwordResetTokenRepository) {
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }
}*/
import com.example.models.PasswordResetToken;
import com.example.models.Usuario;
import com.example.repositorys.PasswordResetTokenRepository;
import com.example.services.EmailService;
import com.example.services.PasswordResetService;
import com.example.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class PasswordResetController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordResetService passwordResetService;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @PostMapping("/recuperarContrasena")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        Usuario usuario = usuarioService.EmailExiste(email);
        if (usuario == null) {
            return ResponseEntity.badRequest().body("El email no existe");
        }

        var resetToken = passwordResetService.createPasswordResetToken(usuario);

        String resetUrl = "http://localhost:3000/cambiarContraseña?token=" + resetToken.getToken();
        emailService.sendEmail(email, "Recuperar Contraseña", "Haz clic en el siguiente enlace: " + resetUrl);

        return ResponseEntity.ok("Correo enviado");
    }

    @PostMapping("/cambiarContrasena")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("password");

        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token inválido o expirado."));

        // Verificar que el token no haya expirado
        if (resetToken.getExpirationDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("El token ha expirado.");
        }

        // Cambiar la contraseña del usuario
        Usuario usuario = resetToken.getUsuario();
        usuario.setPassword_hash(newPassword); // Asegúrate de encriptar la contraseña
        usuarioService.modificarUsuario(usuario);

        // Eliminar el token después de su uso
        tokenRepository.delete(resetToken);

        return ResponseEntity.ok("Contraseña cambiada exitosamente.");
    }
}


