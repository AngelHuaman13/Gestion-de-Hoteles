package com.gestionhoteles.backend.repository;

import com.gestionhoteles.backend.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Integer> {
    List<Reserva> findByClienteIdCliente(Integer idCliente);
    List<Reserva> findByHabitacionIdHabitacion(Integer idHabitacion);
    List<Reserva> findByEstado(String estado);
}