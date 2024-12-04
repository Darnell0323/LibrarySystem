package com.example.services;

import com.example.models.PasswordResetToken;
import com.example.models.Usuario;
import com.example.repositorys.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetService {

    private PasswordResetTokenRepository tokenRepository;

    public PasswordResetToken createPasswordResetToken(Usuario usuario) {
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken(token, usuario, LocalDateTime.now().plusHours(1));
        return tokenRepository.save(resetToken);
    }

    @Autowired
    public void setTokenRepository(PasswordResetTokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }
}

