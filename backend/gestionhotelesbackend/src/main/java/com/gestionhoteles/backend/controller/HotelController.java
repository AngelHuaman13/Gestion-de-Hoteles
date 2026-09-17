package com.gestionhoteles.backend.controller;

import com.gestionhoteles.backend.entity.Hotel;
import com.gestionhoteles.backend.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/hoteles")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @GetMapping
    public List<Hotel> obtenerTodos() {
        return hotelService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Optional<Hotel> obtenerPorId(@PathVariable Integer id) {
        return hotelService.obtenerPorId(id);
    }

    @PostMapping
    public Hotel crear(@RequestBody Hotel hotel) {
        return hotelService.crear(hotel);
    }

    @PutMapping("/{id}")
    public Hotel actualizar(@PathVariable Integer id, @RequestBody Hotel hotel) {
        return hotelService.actualizar(id, hotel);
    }

    @DeleteMapping("/{id}")
    public boolean eliminar(@PathVariable Integer id) {
        return hotelService.eliminar(id);
    }

    @GetMapping("/buscar")
    public List<Hotel> buscarPorCiudad(@RequestParam String ciudad) {
        return hotelService.buscarPorCiudad(ciudad);
    }
}