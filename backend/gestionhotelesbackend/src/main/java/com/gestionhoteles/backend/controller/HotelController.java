package com.gestionhoteles.backend.controller;

import com.gestionhoteles.backend.entity.Hotel;
import com.gestionhoteles.backend.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/hoteles")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @GetMapping
    public List<Hotel> listar() {
        return hotelService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hotel> obtener(@PathVariable Integer id) {
        return hotelService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/ciudad/{ciudad}")
    public List<Hotel> buscarPorCiudad(@PathVariable String ciudad) {
        return hotelService.buscarPorCiudad(ciudad);
    }

    @PostMapping
    public Hotel crear(@RequestBody Hotel hotel) {
        return hotelService.crear(hotel);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hotel> actualizar(@PathVariable Integer id, @RequestBody Hotel hotel) {
        Hotel actualizado = hotelService.actualizar(id, hotel);
        return actualizado != null ? ResponseEntity.ok(actualizado) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        return hotelService.eliminar(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}