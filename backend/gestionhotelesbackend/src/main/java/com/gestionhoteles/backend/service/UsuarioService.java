package com.gestionhoteles.backend.service;

import com.gestionhoteles.backend.entity.Usuario;
import com.gestionhoteles.backend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository,
                          PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario registrar(String nombre,
                             String email,
                             String password,
                             String telefono) {

        // Verificar si el correo ya está registrado
        if (usuarioRepository.findByEmail(email).isPresent()) {
            return null;
        }

        Usuario usuario = new Usuario();

        usuario.setNombre(nombre);
        usuario.setEmail(email);
        usuario.setPassword(passwordEncoder.encode(password));

        usuario.setTelefono(
            telefono != null && !telefono.trim().isEmpty()
                ? telefono.trim()
                : null
        );

        usuario.setRol("USER");

        return usuarioRepository.save(usuario);
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email).orElse(null);
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }
}