package com.spotifyclone.api.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.spotifyclone.api.filters.JwtAuthFilter;
import com.spotifyclone.api.services.UserService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Autowired
    private JwtAuthFilter authFilter;

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserService();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> 
                auth.requestMatchers("/**").permitAll()
                    .requestMatchers("/api/v1/audios", "api/v1/artists", "api/v1/albums").permitAll()
                    .requestMatchers("/upload/**").permitAll()
                    .requestMatchers("/auth", "/auth/all", "/auth/register", "/auth/login").permitAll()
                    .requestMatchers("/auth/verify").authenticated()
                    .requestMatchers("/auth/profile").authenticated()
                    .requestMatchers("/auth/refresh").authenticated()
                    .requestMatchers("/auth/user/**").authenticated()
                    .requestMatchers("/auth/admin/**").authenticated()
                    .requestMatchers("/api/v1/add/artist", "/api/v1/edit/artist", "/api/v1/delete/artist/**").authenticated()
                    .requestMatchers("/api/v1/add/audio", "/api/v1/delete/audio/**").authenticated()
                    .requestMatchers("/api/v1/add/album", "/api/v1/edit/album", "/api/v1/delete/album/**").authenticated()
                    .requestMatchers("/api/v1/add/playlist", "/api/v1/edit/playlist", "/api/v1/delete/playlist/**").authenticated()
                    .requestMatchers("/api/v1/stripe/**").permitAll() // Add this line to permit all requests to /api/v1/stripe/**
                    .requestMatchers("/error").permitAll()
                    .anyRequest().authenticated()
            );

        http.cors();

        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:5173");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}