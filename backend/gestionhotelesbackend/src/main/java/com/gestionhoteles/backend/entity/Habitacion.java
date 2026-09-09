package com.gestionhoteles.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "habitaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Habitacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idHabitacion;

    @ManyToOne
    @JoinColumn(name = "id_hotel", nullable = false)
    private Hotel hotel;

    @Column(length = 10, nullable = false)
    private String numeroHabitacion;

    @Column(length = 50)
    private String tipo;

    @Column(name = "precio_noche")
    private BigDecimal precioNoche;

    @Column(length = 20)
    private String estado = "disponible";

    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion = LocalDateTime.now();
}