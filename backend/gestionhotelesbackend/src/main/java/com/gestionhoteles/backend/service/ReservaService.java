package com.gestionhoteles.backend.service;

import com.gestionhoteles.backend.entity.Reserva;
import com.gestionhoteles.backend.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    public List<Reserva> obtenerTodos() {
        return reservaRepository.findAll();
    }

    public Optional<Reserva> obtenerPorId(Integer id) {
        return reservaRepository.findById(id);
    }

    public Reserva crear(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    public Reserva actualizar(Integer id, Reserva reservaActualizada) {
        return reservaRepository.findById(id).map(reserva -> {
            reserva.setFechaEntrada(reservaActualizada.getFechaEntrada());
            reserva.setFechaSalida(reservaActualizada.getFechaSalida());
            reserva.setEstado(reservaActualizada.getEstado());
            reserva.setPrecioTotal(reservaActualizada.getPrecioTotal());
            return reservaRepository.save(reserva);
        }).orElse(null);
    }

    public boolean eliminar(Integer id) {
        if (reservaRepository.existsById(id)) {
            reservaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}