package com.example.repositorys;

import com.example.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    @Query("select p from Usuario as p where p.email=:correo and p.password_hash=:contraseña")
    Usuario findByEmailAndPassword_hash(@Param("correo") String email,@Param("contraseña") String password_hash);

    @Query("select p from Usuario as p where p.email=:email")
    UserDetails findByEmail(String email);
}
