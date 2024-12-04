package com.example.models;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name=Usuario.TABLE_NAME)
public class Usuario implements UserDetails{

    public static final String TABLE_NAME = "Usuarios";


    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Id
    private int id;

    @Column(name = "nombre")
    private String nombre_usuario;

    @Column(name = "contraseña")
    private String password_hash;

    @Column(name = "correo")
    private String email;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "fecha_registro")
    private LocalDateTime fecha_registro;

    @Column(name = "rol_id")
    private int id_rol;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "rol_id", insertable=false, updatable=false)
    private Rol rol;



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("Bibliotecario"));
    }

    @Override
    public String getPassword() {
        return password_hash;
    }

    @Override
    public String getUsername() {
        return email;
    }
}
