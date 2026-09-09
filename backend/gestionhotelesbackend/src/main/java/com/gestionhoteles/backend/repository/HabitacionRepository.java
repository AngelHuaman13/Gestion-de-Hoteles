package com.gestionhoteles.backend.repository;

import com.gestionhoteles.backend.entity.Habitacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HabitacionRepository extends JpaRepository<Habitacion, Integer> {
    List<Habitacion> findByHotelIdHotel(Integer idHotel);
    List<Habitacion> findByEstado(String estado);
}