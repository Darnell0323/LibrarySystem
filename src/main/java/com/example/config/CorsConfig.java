package com.example.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        // Permitir solicitudes de cualquier origen, o puedes cambiar el dominio a http://localhost:3000 si quieres restringirlo
        corsConfiguration.addAllowedOrigin("http://localhost:3000");
        corsConfiguration.addAllowedMethod("*"); // Permitir todos los métodos (POST, GET, OPTIONS, PUT, DELETE)
        corsConfiguration.addAllowedHeader("*"); // Permitir todos los encabezados
        corsConfiguration.setAllowCredentials(true); // Permitir credenciales si es necesario

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration); // Aplica a todas las rutas

        return new CorsFilter(source);
    }
}
