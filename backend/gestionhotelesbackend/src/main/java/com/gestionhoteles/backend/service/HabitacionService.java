package com.gestionhoteles.backend.service;

import com.gestionhoteles.backend.entity.Habitacion;
import com.gestionhoteles.backend.repository.HabitacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class HabitacionService {

    @Autowired
    private HabitacionRepository habitacionRepository;

    public List<Habitacion> obtenerTodos() {
        return habitacionRepository.findAll();
    }

    public Optional<Habitacion> obtenerPorId(Integer id) {
        return habitacionRepository.findById(id);
    }

    public Habitacion crear(Habitacion habitacion) {
        return habitacionRepository.save(habitacion);
    }

    public Habitacion actualizar(Integer id, Habitacion habitacionActualizada) {
        return habitacionRepository.findById(id).map(hab -> {
            hab.setNumeroHabitacion(habitacionActualizada.getNumeroHabitacion());
            hab.setTipo(habitacionActualizada.getTipo());
            hab.setPrecioNoche(habitacionActualizada.getPrecioNoche());
            hab.setEstado(habitacionActualizada.getEstado());
            return habitacionRepository.save(hab);
        }).orElse(null);
    }

    public boolean eliminar(Integer id) {
        if (habitacionRepository.existsById(id)) {
            habitacionRepository.deleteById(id);
            return true;
        }
        return false;
    }
}