package com.gestionhoteles.backend.repository;

import com.gestionhoteles.backend.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Integer> {
    List<Hotel> findByCiudad(String ciudad);
    List<Hotel> findByPais(String pais);
}