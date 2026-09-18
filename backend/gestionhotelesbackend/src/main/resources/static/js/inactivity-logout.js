var INACTIVITY_TIMEOUT = 180000;
var WARNING_BEFORE = 30000;
var warningTimer = null;
var logoutTimer = null;
var lastActivity = Date.now();

var INACTIVITY_KEY = 'ultimaActividad';

function sincronizarActividad() {
    localStorage.setItem(INACTIVITY_KEY, Date.now().toString());
}

function verificarOtrasPestanas() {
    var ultima = localStorage.getItem(INACTIVITY_KEY);
    if (ultima) {
        var diff = Date.now() - parseInt(ultima);
        if (diff > INACTIVITY_TIMEOUT) {
            sincronizarActividad();
        }
    }
}

function reiniciarTimers() {
    lastActivity = Date.now();
    sincronizarActividad();

    if (warningTimer) clearTimeout(warningTimer);
    if (logoutTimer) clearTimeout(logoutTimer);

    warningTimer = setTimeout(mostrarAdvertencia, INACTIVITY_TIMEOUT - WARNING_BEFORE);
}

function mostrarAdvertencia() {
    var modal = new bootstrap.Modal(document.getElementById('inactivityModal'), {
        backdrop: 'static',
        keyboard: false
    });
    modal.show();

    logoutTimer = setTimeout(function() {
        window.location.href = '/logout';
    }, WARNING_BEFORE);
}

function cerrarAdvertencia() {
    if (logoutTimer) clearTimeout(logoutTimer);

    var modalEl = document.getElementById('inactivityModal');
    var modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();

    reiniciarTimers();
}

document.addEventListener('DOMContentLoaded', function() {
    var body = document.body;

    verificarOtrasPestanas();

    var eventos = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    eventos.forEach(function(evento) {
        body.addEventListener(evento, reiniciarTimers, { passive: true });
    });

    window.addEventListener('storage', function(e) {
        if (e.key === INACTIVITY_KEY) {
            verificarOtrasPestanas();
        }
    });

    reiniciarTimers();
});
