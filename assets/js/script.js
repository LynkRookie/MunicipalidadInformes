// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initApp);

// Función principal de inicialización
function initApp() {
    // Inicializar datos de ejemplo si no existen
    initializeData();

    // Configurar eventos de login
    setupLoginEvents();
}

// Inicializar datos de ejemplo
function initializeData() {
    // Usuarios iniciales
    if (!localStorage.getItem("users")) {
        const initialUsers = [
            { id: 1, tipo: "Administrador", user: "admin", pass: "admin123" },
            { id: 2, tipo: "Usuario", user: "usuario", pass: "user123" },
            { id: 3, tipo: "Lector", user: "lector", pass: "lector123" },
        ];
        localStorage.setItem("users", JSON.stringify(initialUsers));
    }

    // Establecimientos iniciales
    if (!localStorage.getItem("establishments")) {
        const initialEstablishments = [
            {
                id: 1,
                rut: "12345678-9",
                nombre: "Escuela Municipal N°1",
                rbd: "RBD001",
                director: "Juan Pérez",
                direccion: "Calle Principal 123",
                telefono: "123456789",
            },
            {
                id: 2,
                rut: "98765432-1",
                nombre: "Liceo Técnico Municipal",
                rbd: "RBD002",
                director: "María González",
                direccion: "Avenida Central 456",
                telefono: "987654321",
            },
        ];
        localStorage.setItem("establishments", JSON.stringify(initialEstablishments));
    }

    // Actas iniciales
    if (!localStorage.getItem("actas")) {
        const initialActas = [
            {
                id: 1,
                num_acta: 1,
                tema: "Informática",
                fecha: "2023-01-15",
                rut_acta: "12345678-9",
                nombre_acta: "Escuela Municipal N°1",
                rbd_acta: "RBD001",
                director_acta: "Juan Pérez",
                direccion_acta: "Calle Principal 123",
                responsable_acta: "Carlos Rodríguez",
                telefono: "123456789",
                motivo: "Mantenimiento de equipos",
                descripcion: "Se realizó mantenimiento preventivo a 10 computadores del laboratorio",
                recepcion: "Se recibieron todos los equipos en buen estado",
            },
        ];
        localStorage.setItem("actas", JSON.stringify(initialActas));
    }
}

// Configurar eventos de login
function setupLoginEvents() {
    const loginForm = document.getElementById('login-form');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userType = document.getElementById('user-type').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Autenticar usuario
            const result = authenticateUser(userType, username, password);
            
            if (result.success) {
                // Guardar usuario en localStorage
                localStorage.setItem("currentUser", JSON.stringify(result.user));
                
                // Redirigir según el tipo de usuario
                switch(userType) {
                    case "Administrador":
                        window.location.href = "vista/administrador.html";
                        break;
                    case "Usuario":
                        window.location.href = "vista/usuario.html";
                        break;
                    case "Lector":
                        window.location.href = "vista/lector.html";
                        break;
                }
            } else {
                showToast('Error: Credenciales incorrectas', 'error');
            }
        });
    }

    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePasswordBtn.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }
}

// Autenticar usuario
function authenticateUser(tipo, username, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.tipo === tipo && u.user === username && u.pass === password);
    
    if (user) {
        return { success: true, user };
    }
    
    return { success: false, message: "Credenciales incorrectas" };
}

// Mostrar notificación toast
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button class="toast-close">&times;</button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Configurar botón de cerrar
    const closeButton = toast.querySelector('.toast-close');
    closeButton.addEventListener('click', () => {
        toast.classList.add('hide');
        setTimeout(() => {
            toast.remove();
        }, 300);
    });
    
    // Eliminar automáticamente después de 5 segundos
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 5000);
}