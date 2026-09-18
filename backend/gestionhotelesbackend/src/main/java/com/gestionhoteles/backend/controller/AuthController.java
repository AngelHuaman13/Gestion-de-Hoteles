package com.gestionhoteles.backend.controller;

import com.gestionhoteles.backend.entity.Usuario;
import com.gestionhoteles.backend.service.UsuarioService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AuthController {

    private final UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/registro")
    public String procesarRegistro(
            @RequestParam String nombre,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String confirmarPassword,
            @RequestParam(required = false) String telefono,
            HttpSession session,
            Model model) {

        boolean hasError = false;

        if (nombre == null || nombre.trim().isEmpty()) {
            model.addAttribute("errorNombre", "El nombre es obligatorio");
            hasError = true;
        }

        if (email == null || email.trim().isEmpty()) {
            model.addAttribute("errorEmail", "El email es obligatorio");
            hasError = true;
        } else if (!email.matches(
                "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")) {

            model.addAttribute("errorEmail", "Formato de email inválido");
            hasError = true;
        }

        if (password == null || password.length() < 6) {
            model.addAttribute(
                "errorPassword",
                "La contraseña debe tener al menos 6 caracteres"
            );
            hasError = true;
        }

        if (password == null || !password.equals(confirmarPassword)) {
            model.addAttribute(
                "errorConfirmarPassword",
                "Las contraseñas no coinciden"
            );
            hasError = true;
        }

        if (telefono != null
                && !telefono.trim().isEmpty()
                && !telefono.trim().matches("^[0-9]{9}$")) {

            model.addAttribute(
                "errorTelefono",
                "El teléfono debe tener 9 dígitos"
            );
            hasError = true;
        }

        if (hasError) {
            model.addAttribute("nombre", nombre);
            model.addAttribute("email", email);
            model.addAttribute("telefono", telefono);

            return "registro";
        }

        try {

            Usuario usuario = usuarioService.registrar(
                nombre.trim(),
                email.trim(),
                password,
                telefono
            );

            if (usuario == null) {
                model.addAttribute(
                    "errorEmail",
                    "El email ya está registrado"
                );

                model.addAttribute("nombre", nombre);
                model.addAttribute("email", email);
                model.addAttribute("telefono", telefono);

                return "registro";
            }

            session.setAttribute("usuarioId", usuario.getId());
            session.setAttribute("usuarioNombre", usuario.getNombre());
            session.setAttribute("usuarioRol", usuario.getRol());

            return "redirect:/habitaciones";

        } catch (Exception e) {

            model.addAttribute(
                "error",
                "Error al registrar. Intente nuevamente."
            );

            return "registro";
        }
    }
}