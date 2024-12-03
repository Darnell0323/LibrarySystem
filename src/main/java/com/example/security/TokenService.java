package com.example.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.example.models.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class TokenService {

    @Value("${keySecurity}")
    private String secret;

    public String generateToken(Usuario usuario) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("auth0")
                    .withSubject(usuario.getUsername())
                    .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 2))
                    .sign(algorithm);
        } catch (
                JWTCreationException exception) {
                throw new RuntimeException(exception.getMessage());
            // Invalid Signing configuration / Couldn't convert Claims.
        }
    }
    public String verifyToken(String token) {
        if (token == null || token.isEmpty()) {
            throw new RuntimeException("Token invalid");
        }
        DecodedJWT verifier;
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            verifier = JWT.require(algorithm)
                    // specify any specific claim validations
                    .withIssuer("auth0")
                    // reusable verifier instance
                    .build().verify(token);

        } catch (JWTVerificationException exception){
            throw new RuntimeException(exception.getMessage());
        }
        return verifier.getSubject();
    }
}
