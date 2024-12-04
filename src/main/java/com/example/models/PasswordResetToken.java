package com.example.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "password_reset_token")
public class PasswordResetToken {

    // Getters y setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Generación automática del ID
    private Long id;

    @Column(nullable = false, unique = true) // El token debe ser único
    private String token;

    @ManyToOne(fetch = FetchType.EAGER) // Relación con el usuario
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false, name = "expiration_date") // Fecha de expiración obligatoria
    private LocalDateTime expirationDate;

    // Constructor vacío
    public PasswordResetToken() {}

    public PasswordResetToken(String token, Usuario usuario) {
        this.token = token;
        this.usuario = usuario;
    }

    // Constructor personalizado
    public PasswordResetToken(String token, Usuario usuario, LocalDateTime expirationDate) {
        this.token = token;
        this.usuario = usuario;
        this.expirationDate = expirationDate;
    }

}
