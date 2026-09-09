package com.gestionhoteles.backend.service;

import com.gestionhoteles.backend.entity.Hotel;
import com.gestionhoteles.backend.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    public List<Hotel> obtenerTodos() {
        return hotelRepository.findAll();
    }

    public Optional<Hotel> obtenerPorId(Integer id) {
        return hotelRepository.findById(id);
    }

    public Hotel crear(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    public Hotel actualizar(Integer id, Hotel hotelActualizado) {
        return hotelRepository.findById(id).map(hotel -> {
            hotel.setNombre(hotelActualizado.getNombre());
            hotel.setCiudad(hotelActualizado.getCiudad());
            hotel.setPais(hotelActualizado.getPais());
            hotel.setDireccion(hotelActualizado.getDireccion());
            hotel.setTelefono(hotelActualizado.getTelefono());
            hotel.setEmail(hotelActualizado.getEmail());
            hotel.setEstrellas(hotelActualizado.getEstrellas());
            return hotelRepository.save(hotel);
        }).orElse(null);
    }

    public boolean eliminar(Integer id) {
        if (hotelRepository.existsById(id)) {
            hotelRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Hotel> buscarPorCiudad(String ciudad) {
        return hotelRepository.findByCiudad(ciudad);
    }
}