/*
 * scripts.js - Validaciones del formulario de contacto y lógica del modal de reserva
 */

document.addEventListener('DOMContentLoaded', function () {

    // ============================================================
    // 1. VALIDACIÓN DEL FORMULARIO DE CONTACTO
    // ============================================================

    const formulario = document.getElementById('formulario');

    if (formulario) {
        // Inputs del formulario
        const nombre = document.getElementById('nombre');
        const apellido = document.getElementById('apellido');
        const correo = document.getElementById('correo');
        const telefono = document.getElementById('telefono');

        // --- Validación en tiempo real (mientras el usuario escribe) ---

        // Solo letras (incluye tildes y ñ)
        validarSoloLetras(nombre);
        validarSoloLetras(apellido);

        // Email válido
        validarEmail(correo);

        // Solo números (y opcionalmente +)
        validarTelefono(telefono);

        // --- Validación al enviar el formulario ---
        formulario.addEventListener('submit', function (e) {
            e.preventDefault();

            if (validarFormulario()) {
                // Si todo está correcto, mostrar modal de éxito
                const modal = new bootstrap.Modal(document.getElementById('modalFormulario'));
                modal.show();
                formulario.reset(); // Limpiar campos
                limpiarErrores();
            }
        });
    }

    // ============================================================
    // 2. FUNCIONES DE VALIDACIÓN INDIVIDUAL
    // ============================================================

    /*
     * Valida que un campo contenga solo letras (incluye tildes, ñ, espacios)
     */
    function validarSoloLetras(input) {
        input.addEventListener('input', function () {
            var valor = input.value;
            var soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]*$/;

            if (!soloLetras.test(valor)) {
                // Eliminar caracteres no permitidos
                input.value = valor.replace(/[^A-Za-zÁÉÍÓÚáéíóúñÑ ]/g, '');
                mostrarError(input, 'Solo se permiten letras');
            } else if (valor.trim() === '') {
                mostrarError(input, 'Este campo es obligatorio');
            } else {
                limpiarError(input);
            }
        });
    }

    /*
     * Valida que el email tenga un formato correcto
     */
    function validarEmail(input) {
        input.addEventListener('input', function () {
            var valor = input.value;
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (valor.trim() === '') {
                mostrarError(input, 'El correo es obligatorio');
            } else if (!emailRegex.test(valor)) {
                mostrarError(input, 'Ingrese un correo válido (ej: usuario@correo.com)');
            } else {
                limpiarError(input);
            }
        });
    }

    /*
     * Valida que el teléfono contenga solo números y opcionalmente +
     */
    function validarTelefono(input) {
        input.addEventListener('input', function () {
            var valor = input.value;
            var soloNumeros = /^[0-9+]*$/;

            if (!soloNumeros.test(valor)) {
                // Eliminar caracteres no permitidos
                input.value = valor.replace(/[^0-9+]/g, '');
                mostrarError(input, 'Solo se permiten números y +');
            } else if (valor.replace(/[+]/g, '').trim().length < 7) {
                mostrarError(input, 'El teléfono debe tener al menos 7 dígitos');
            } else {
                limpiarError(input);
            }
        });
    }

    /*
     * Valida todos los campos obligatorios al enviar el formulario
     */
    function validarFormulario() {
        var valido = true;

        // Validar nombre
        if (nombre.value.trim() === '') {
            mostrarError(nombre, 'El nombre es obligatorio');
            valido = false;
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(nombre.value.trim())) {
            mostrarError(nombre, 'El nombre solo puede contener letras');
            valido = false;
        }

        // Validar apellido
        if (apellido.value.trim() === '') {
            mostrarError(apellido, 'El apellido es obligatorio');
            valido = false;
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(apellido.value.trim())) {
            mostrarError(apellido, 'El apellido solo puede contener letras');
            valido = false;
        }

        // Validar correo
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (correo.value.trim() === '') {
            mostrarError(correo, 'El correo es obligatorio');
            valido = false;
        } else if (!emailRegex.test(correo.value.trim())) {
            mostrarError(correo, 'Ingrese un correo válido');
            valido = false;
        }

        // Validar teléfono
        if (telefono.value.trim() === '') {
            mostrarError(telefono, 'El teléfono es obligatorio');
            valido = false;
        } else if (!/^[0-9+]{7,15}$/.test(telefono.value.trim())) {
            mostrarError(telefono, 'Ingrese un teléfono válido (solo números)');
            valido = false;
        }

        return valido;
    }

    // ============================================================
    // 3. FUNCIONES AUXILIARES (mostrar/limpiar errores)
    // ============================================================

    /*
     * Muestra un mensaje de error debajo del campo
     */
    function mostrarError(input, mensaje) {
        var feedback = input.nextElementSibling;
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');

        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = mensaje;
        }
    }

    /*
     * Limpia el error de un campo específico
     */
    function limpiarError(input) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    }

    /*
     * Limpia todos los errores y estados de validación del formulario
     */
    function limpiarErrores() {
        var inputs = formulario.querySelectorAll('input, textarea');
        inputs.forEach(function (input) {
            input.classList.remove('is-invalid', 'is-valid');
            var feedback = input.nextElementSibling;
            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.textContent = '';
            }
        });
    }

    // ============================================================
    // 4. LÓGICA DEL MODAL DE RESERVA (pasos)
    // ============================================================

    var pasoFecha = document.getElementById('pasoFecha');
    var pasoDias = document.getElementById('pasoDias');
    var pasoExito = document.getElementById('pasoExito');

    var btnAceptarFecha = document.getElementById('btnAceptarFecha');
    var btnConfirmarReserva = document.getElementById('btnConfirmarReserva');
    var fechaReserva = document.getElementById('fechaReserva');
    var diasReserva = document.getElementById('diasReserva');

    if (btnAceptarFecha) {
        btnAceptarFecha.addEventListener('click', function () {
            if (fechaReserva.value === '') {
                alert('Por favor seleccione una fecha.');
                return;
            }
            pasoFecha.style.display = 'none';
            pasoDias.style.display = 'block';
        });
    }

    if (btnConfirmarReserva) {
        btnConfirmarReserva.addEventListener('click', function () {
            var noches = parseInt(diasReserva.value) || 1;

            pasoDias.style.display = 'none';
            pasoExito.style.display = 'block';

            var mensajeFinal = document.getElementById('mensajeFinal');
            if (mensajeFinal) {
                mensajeFinal.textContent = 'Reserva confirmada para el '
                    + fechaReserva.value
                    + ' por ' + noches + ' noche(s). '
                    + '¡Gracias por elegirnos!';
            }
        });
    }

    // Resetear el modal al cerrarse
    var modalReserva = document.getElementById('modalReserva');
    if (modalReserva) {
        modalReserva.addEventListener('hidden.bs.modal', function () {
            if (pasoFecha) pasoFecha.style.display = 'block';
            if (pasoDias) pasoDias.style.display = 'none';
            if (pasoExito) pasoExito.style.display = 'none';
        });
    }

});
