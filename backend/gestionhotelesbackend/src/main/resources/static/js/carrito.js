/*
 * carrito.js - Funcionalidad del carrito de compras
 * Guarda los productos en localStorage para que no se pierdan al recargar la página
 */

document.addEventListener('DOMContentLoaded', function () {

    var CLAVE_STORAGE = 'carritoMareaAzul';

    // Elementos del carrito
    var contador = document.getElementById('carritoContador');
    var lista = document.getElementById('carritoItems');
    var total = document.getElementById('carritoTotal');
    var vacio = document.getElementById('carritoVacio');
    var resumen = document.getElementById('carritoResumen');
    var exito = document.getElementById('carritoExito');
    var exitoTexto = document.getElementById('carritoExitoTexto');
    var btnVaciar = document.getElementById('btnVaciarCarrito');
    var btnFinalizar = document.getElementById('btnFinalizarPedido');
    var panel = document.getElementById('carritoPanel');
    var toastElemento = document.getElementById('carritoToast');
    var toastTexto = document.getElementById('carritoToastTexto');

    if (!lista) {
        return;
    }

    var carrito = cargarCarrito();

    // ============================================================
    // 1. BOTONES "AGREGAR AL CARRITO"
    // ============================================================

    document.querySelectorAll('.btn-agregar[data-id]').forEach(function (boton) {
        boton.addEventListener('click', function () {
            agregarProducto({
                id: boton.dataset.id,
                nombre: boton.dataset.nombre,
                precio: parseFloat(boton.dataset.precio),
                img: boton.dataset.img
            });
            marcarBotonAgregado(boton);
            mostrarAviso(boton.dataset.nombre + ' agregado al carrito');
        });
    });

    // ============================================================
    // 2. ACCIONES DENTRO DEL CARRITO (+, -, eliminar)
    // ============================================================

    lista.addEventListener('click', function (e) {
        var boton = e.target.closest('button[data-accion]');
        if (!boton) {
            return;
        }

        var id = boton.dataset.id;

        if (boton.dataset.accion === 'sumar') {
            cambiarCantidad(id, 1);
        } else if (boton.dataset.accion === 'restar') {
            cambiarCantidad(id, -1);
        } else if (boton.dataset.accion === 'eliminar') {
            eliminarProducto(id);
        }
    });

    btnVaciar.addEventListener('click', function () {
        if (confirm('¿Deseas vaciar el carrito?')) {
            carrito = [];
            guardarYActualizar();
        }
    });

    btnFinalizar.addEventListener('click', function () {
        if (carrito.length === 0) {
            return;
        }

        exitoTexto.textContent = 'Total a pagar: ' + formatearPrecio(calcularTotal())
            + '. Nos comunicaremos contigo para coordinar la entrega.';

        carrito = [];
        guardarYActualizar();

        vacio.style.display = 'none';
        exito.style.display = 'block';
    });

    // Al cerrar el panel se oculta el mensaje de pedido confirmado
    panel.addEventListener('hidden.bs.offcanvas', function () {
        exito.style.display = 'none';
        actualizarVista();
    });

    actualizarVista();

    // ============================================================
    // 3. FUNCIONES DEL CARRITO
    // ============================================================

    function agregarProducto(producto) {
        var existente = buscarProducto(producto.id);

        if (existente) {
            existente.cantidad++;
        } else {
            producto.cantidad = 1;
            carrito.push(producto);
        }

        guardarYActualizar();
        animarContador();
    }

    function cambiarCantidad(id, cambio) {
        var producto = buscarProducto(id);
        if (!producto) {
            return;
        }

        producto.cantidad += cambio;

        if (producto.cantidad <= 0) {
            eliminarProducto(id);
            return;
        }

        guardarYActualizar();
    }

    function eliminarProducto(id) {
        carrito = carrito.filter(function (p) {
            return p.id !== id;
        });
        guardarYActualizar();
    }

    function buscarProducto(id) {
        return carrito.find(function (p) {
            return p.id === id;
        });
    }

    function calcularTotal() {
        return carrito.reduce(function (suma, p) {
            return suma + p.precio * p.cantidad;
        }, 0);
    }

    function contarUnidades() {
        return carrito.reduce(function (suma, p) {
            return suma + p.cantidad;
        }, 0);
    }

    // ============================================================
    // 4. PERSISTENCIA (localStorage)
    // ============================================================

    function cargarCarrito() {
        try {
            var guardado = JSON.parse(localStorage.getItem(CLAVE_STORAGE));
            return Array.isArray(guardado) ? guardado : [];
        } catch (error) {
            return [];
        }
    }

    function guardarYActualizar() {
        try {
            localStorage.setItem(CLAVE_STORAGE, JSON.stringify(carrito));
        } catch (error) {
            // Si el navegador bloquea localStorage el carrito sigue funcionando en memoria
        }
        actualizarVista();
    }

    // ============================================================
    // 5. ACTUALIZAR LA VISTA
    // ============================================================

    function actualizarVista() {
        contador.textContent = contarUnidades();
        lista.innerHTML = '';

        carrito.forEach(function (p) {
            lista.appendChild(crearItem(p));
        });

        var hayProductos = carrito.length > 0;
        var mostrandoExito = exito.style.display === 'block';

        vacio.style.display = hayProductos || mostrandoExito ? 'none' : 'block';
        resumen.style.display = hayProductos ? 'block' : 'none';
        total.textContent = formatearPrecio(calcularTotal());
    }

    function crearItem(p) {
        var li = document.createElement('li');
        li.className = 'carrito-item';

        var img = document.createElement('img');
        img.src = p.img;
        img.alt = p.nombre;

        var info = document.createElement('div');
        info.className = 'carrito-item-info';

        var nombre = document.createElement('div');
        nombre.className = 'carrito-item-nombre';
        nombre.textContent = p.nombre;

        var precio = document.createElement('div');
        precio.className = 'carrito-item-precio';
        precio.textContent = formatearPrecio(p.precio) + ' c/u';

        var cantidad = document.createElement('div');
        cantidad.className = 'carrito-cantidad';
        cantidad.appendChild(crearBoton('restar', p.id, '−', 'Quitar uno'));
        var numero = document.createElement('span');
        numero.textContent = p.cantidad;
        cantidad.appendChild(numero);
        cantidad.appendChild(crearBoton('sumar', p.id, '+', 'Agregar uno'));

        info.appendChild(nombre);
        info.appendChild(precio);
        info.appendChild(cantidad);

        var derecha = document.createElement('div');
        derecha.className = 'text-end';

        var subtotal = document.createElement('div');
        subtotal.className = 'carrito-item-subtotal';
        subtotal.textContent = formatearPrecio(p.precio * p.cantidad);

        var eliminar = crearBoton('eliminar', p.id, '', 'Eliminar producto');
        eliminar.className = 'btn carrito-eliminar mt-1';
        eliminar.innerHTML = '<i class="bi bi-trash3"></i>';

        derecha.appendChild(subtotal);
        derecha.appendChild(eliminar);

        li.appendChild(img);
        li.appendChild(info);
        li.appendChild(derecha);
        return li;
    }

    function crearBoton(accion, id, texto, etiqueta) {
        var boton = document.createElement('button');
        boton.type = 'button';
        boton.dataset.accion = accion;
        boton.dataset.id = id;
        boton.textContent = texto;
        boton.setAttribute('aria-label', etiqueta);
        return boton;
    }

    function formatearPrecio(valor) {
        return 'S/ ' + valor.toFixed(2);
    }

    // ============================================================
    // 6. EFECTOS VISUALES
    // ============================================================

    function animarContador() {
        contador.classList.remove('animar');
        void contador.offsetWidth; // reinicia la animación
        contador.classList.add('animar');
    }

    function marcarBotonAgregado(boton) {
        var textoOriginal = boton.innerHTML;
        boton.classList.add('agregado');
        boton.innerHTML = '<i class="bi bi-check2 me-1"></i>Agregado';
        boton.disabled = true;

        setTimeout(function () {
            boton.classList.remove('agregado');
            boton.innerHTML = textoOriginal;
            boton.disabled = false;
        }, 900);
    }

    function mostrarAviso(texto) {
        if (!toastElemento || typeof bootstrap === 'undefined') {
            return;
        }
        toastTexto.textContent = texto;
        bootstrap.Toast.getOrCreateInstance(toastElemento, { delay: 1800 }).show();
    }

});
