// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initApp);

// Variables globales
let currentSection = 'dashboard';
const ITEMS_PER_PAGE = 5;

// Función principal de inicialización
function initApp() {
    // Verificar si hay un usuario en sesión
    checkSession();
    
    // Configurar eventos de navegación
    setupNavigationEvents();
    
    // Configurar eventos de tabs
    setupTabEvents();
    
    // Configurar eventos de formularios
    setupFormEvents();
    
    // Configurar eventos de búsqueda y paginación
    setupSearchAndPaginationEvents();
    
    // Cargar datos en las tablas
    loadTableData();
}

// Comprobar si hay un usuario en sesión
function checkSession() {
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) {
        window.location.href = "../index.html";
        return;
    }
    
    const currentUser = JSON.parse(storedUser);
    if (currentUser.tipo !== "Administrador") {
        window.location.href = "../index.html";
    }
}

// Configurar eventos de navegación
function setupNavigationEvents() {
    // Botones de navegación en el sidebar
    document.getElementById('btn-dashboard').addEventListener('click', () => navigateTo('dashboard'));
    document.getElementById('btn-register').addEventListener('click', () => navigateTo('register'));
    document.getElementById('btn-modify').addEventListener('click', () => navigateTo('modify'));
    document.getElementById('btn-delete').addEventListener('click', () => navigateTo('delete'));
    document.getElementById('btn-show').addEventListener('click', () => navigateTo('show'));
    document.getElementById('btn-showUsers').addEventListener('click', () => navigateTo('showUsers'));
    document.getElementById('btn-showActas').addEventListener('click', () => navigateTo('showActas'));
    document.getElementById('btn-search').addEventListener('click', () => navigateTo('search'));
    document.getElementById('btn-logout').addEventListener('click', logout);
    
    // Botones móviles
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            document.getElementById('sidebar').classList.add('sidebar-expanded');
            document.getElementById('sidebar').classList.remove('sidebar-collapsed');
            document.querySelector('.sidebar-overlay').style.display = 'block';
        });
    }
    
    // Tarjetas del dashboard
    document.getElementById('card-register').addEventListener('click', () => navigateTo('register'));
    document.getElementById('card-modify').addEventListener('click', () => navigateTo('modify'));
    document.getElementById('card-delete').addEventListener('click', () => navigateTo('delete'));
    document.getElementById('card-show').addEventListener('click', () => navigateTo('show'));
    document.getElementById('card-showUsers').addEventListener('click', () => navigateTo('showUsers'));
    document.getElementById('card-showActas').addEventListener('click', () => navigateTo('showActas'));
    document.getElementById('card-search').addEventListener('click', () => navigateTo('search'));
    
    // Logo click
    document.querySelector('.sidebar-logo').addEventListener('click', function() {
        navigateTo('dashboard');
    });
    
    // Mobile theme toggle
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
}

// Navegar a una sección
function navigateTo(section) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Mostrar la sección seleccionada
    const sectionElement = document.getElementById(`section-${section}`);
    if (sectionElement) {
        sectionElement.classList.remove('hidden');
        currentSection = section;
    }
    
    // Cargar datos específicos de la sección si es necesario
    if (section === 'show') {
        loadEstablishmentsTable();
    } else if (section === 'showUsers') {
        loadUsersTable();
    } else if (section === 'showActas') {
        loadActasTable();
    }
    
    // Actualizar clase activa en el menú
    document.querySelectorAll('.sidebar-menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const menuItem = document.getElementById(`btn-${section}`);
    if (menuItem) {
        menuItem.classList.add('active');
    }
    
    // En móviles, cerrar el sidebar después de la navegación
    if (window.innerWidth < 768) {
        document.getElementById('sidebar').classList.remove('sidebar-expanded');
        document.getElementById('sidebar').classList.add('sidebar-collapsed');
        document.querySelector('.sidebar-overlay').style.display = 'none';
    }
}

// Cerrar sesión
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "../index.html";
}

// Configurar eventos de tabs
function setupTabEvents() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const tabContainer = this.closest('.tabs');
            
            // Desactivar todos los botones y contenidos
            tabContainer.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            tabContainer.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Activar el botón y contenido seleccionado
            this.classList.add('active');
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });
}

// Configurar eventos de formularios
function setupFormEvents() {
    // Formulario de registro de establecimiento
    const establishmentForm = document.getElementById('establishment-form');
    if (establishmentForm) {
        establishmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newEstablishment = {
                id: Date.now(),
                rut: document.getElementById('rut').value,
                nombre: document.getElementById('nombre').value,
                rbd: document.getElementById('rbd').value,
                director: document.getElementById('director').value,
                direccion: document.getElementById('direccion').value,
                telefono: document.getElementById('telefono').value
            };
            
            // Guardar establecimiento
            const establishments = JSON.parse(localStorage.getItem("establishments") || "[]");
            establishments.push(newEstablishment);
            localStorage.setItem("establishments", JSON.stringify(establishments));
            
            // Mostrar mensaje y resetear formulario
            showToast('Establecimiento registrado correctamente', 'success');
            establishmentForm.reset();
        });
    }
    
    // Botón para resetear formulario de establecimiento
    const resetEstablishmentBtn = document.getElementById('reset-establishment');
    if (resetEstablishmentBtn && establishmentForm) {
        resetEstablishmentBtn.addEventListener('click', function() {
            establishmentForm.reset();
        });
    }
    
    // Formulario de registro de usuario
    const userForm = document.getElementById('user-form');
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newUser = {
                id: Date.now(),
                tipo: document.getElementById('user-type-reg').value,
                user: document.getElementById('username-reg').value,
                pass: document.getElementById('password-reg').value
            };
            
            // Guardar usuario
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            
            // Mostrar mensaje y resetear formulario
            showToast('Usuario registrado correctamente', 'success');
            userForm.reset();
        });
    }
    
    // Botón para resetear formulario de usuario
    const resetUserBtn = document.getElementById('reset-user');
    if (resetUserBtn && userForm) {
        resetUserBtn.addEventListener('click', function() {
            userForm.reset();
        });
    }
    
    // Búsqueda de establecimiento para modificar
    const searchEstablishmentBtn = document.getElementById('search-establishment-btn');
    if (searchEstablishmentBtn) {
        searchEstablishmentBtn.addEventListener('click', function() {
            const searchRbd = document.getElementById('search-rbd').value;
            const searchRut = document.getElementById('search-rut').value;
            
            if (!searchRbd || !searchRut) {
                showToast('Debe ingresar RBD y RUT para buscar', 'error');
                return;
            }
            
            const establishments = JSON.parse(localStorage.getItem("establishments") || "[]");
            const found = establishments.find(e => e.rbd === searchRbd && e.rut === searchRut);
            
            if (found) {
                // Llenar formulario con datos encontrados
                document.getElementById('mod-rut').value = found.rut;
                document.getElementById('mod-nombre').value = found.nombre;
                document.getElementById('mod-rbd').value = found.rbd;
                document.getElementById('mod-director').value = found.director;
                document.getElementById('mod-direccion').value = found.direccion;
                document.getElementById('mod-telefono').value = found.telefono;
                
                // Habilitar campos y botón de modificar
                document.getElementById('mod-rut').disabled = false;
                document.getElementById('mod-nombre').disabled = false;
                document.getElementById('mod-rbd').disabled = false;
                document.getElementById('mod-director').disabled = false;
                document.getElementById('mod-direccion').disabled = false;
                document.getElementById('mod-telefono').disabled = false;
                document.querySelector('#modify-establishment-form button[type="submit"]').disabled = false;
                
                showToast('Establecimiento encontrado', 'success');
            } else {
                showToast('No se encontró el establecimiento con los datos proporcionados', 'error');
            }
        });
    }
    
    // Formulario para modificar establecimiento
    const modifyEstablishmentForm = document.getElementById('modify-establishment-form');
    if (modifyEstablishmentForm) {
        modifyEstablishmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchRbd = document.getElementById('search-rbd').value;
            const searchRut = document.getElementById('search-rut').value;
            
            const updatedEstablishment = {
                rut: document.getElementById('mod-rut').value,
                nombre: document.getElementById('mod-nombre').value,
                rbd: document.getElementById('mod-rbd').value,
                director: document.getElementById('mod-director').value,
                direccion: document.getElementById('mod-direccion').value,
                telefono: document.getElementById('mod-telefono').value
            };
            
            // Actualizar establecimiento
            const establishments = JSON.parse(localStorage.getItem("establishments") || "[]");
            const updatedEstablishments = establishments.map(e => {
                if (e.rbd === searchRbd && e.rut === searchRut) {
                    return { ...e, ...updatedEstablishment };
                }
                return e;
            });
            
            localStorage.setItem("establishments", JSON.stringify(updatedEstablishments));
            
            // Mostrar mensaje y resetear formulario
            showToast('Establecimiento modificado correctamente', 'success');
            resetModifyEstablishmentForm();
        });
    }
    
    // Botón para resetear formulario de modificación de establecimiento
    const resetModEstablishmentBtn = document.getElementById('reset-mod-establishment');
    if (resetModEstablishmentBtn) {
        resetModEstablishmentBtn.addEventListener('click', resetModifyEstablishmentForm);
    }
    
    // Búsqueda de usuario para modificar
    const searchUserBtn = document.getElementById('search-user-btn');
    if (searchUserBtn) {
        searchUserBtn.addEventListener('click', function() {
            const searchUsername = document.getElementById('search-username').value;
            
            if (!searchUsername) {
                showToast('Debe ingresar un nombre de usuario para buscar', 'error');
                return;
            }
            
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            const found = users.find(u => u.user === searchUsername);
            
            if (found) {
                // Llenar formulario con datos encontrados
                document.getElementById('mod-username').value = found.user;
                document.getElementById('mod-password').value = found.pass;
                document.getElementById('mod-user-type').value = found.tipo;
                
                // Habilitar campos y botón de modificar
                document.getElementById('mod-username').disabled = false;
                document.getElementById('mod-password').disabled = false;
                document.getElementById('mod-user-type').disabled = false;
                document.querySelector('#modify-user-form button[type="submit"]').disabled = false;
                
                showToast('Usuario encontrado', 'success');
            } else {
                showToast('No se encontró el usuario con el nombre proporcionado', 'error');
            }
        });
    }
    
    // Formulario para modificar usuario
    const modifyUserForm = document.getElementById('modify-user-form');
    if (modifyUserForm) {
        modifyUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchUsername = document.getElementById('search-username').value;
            
            const updatedUser = {
                user: document.getElementById('mod-username').value,
                pass: document.getElementById('mod-password').value,
                tipo: document.getElementById('mod-user-type').value
            };
            
            // Actualizar usuario
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            const updatedUsers = users.map(u => {
                if (u.user === searchUsername) {
                    return { ...u, ...updatedUser };
                }
                return u;
            });
            
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            
            // Mostrar mensaje y resetear formulario
            showToast('Usuario modificado correctamente', 'success');
            resetModifyUserForm();
        });
    }
    
    // Botón para resetear formulario de modificación de usuario
    const resetModUserBtn = document.getElementById('reset-mod-user');
    if (resetModUserBtn) {
        resetModUserBtn.addEventListener('click', resetModifyUserForm);
    }
    
    // Formulario para eliminar establecimiento
    const deleteEstablishmentForm = document.getElementById('delete-establishment-form');
    if (deleteEstablishmentForm) {
        deleteEstablishmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const rbd = document.getElementById('del-rbd').value;
            const rut = document.getElementById('del-rut').value;
            
            if (!rbd || !rut) {
                showToast('Debe ingresar RBD y RUT para eliminar un establecimiento', 'error');
                return;
            }
            
            const establishments = JSON.parse(localStorage.getItem("establishments") || "[]");
            const establishmentExists = establishments.some(e => e.rbd === rbd && e.rut === rut);
            
            if (!establishmentExists) {
                showToast('No se encontró el establecimiento con los datos proporcionados', 'error');
                return;
            }
            
            // Eliminar establecimiento
            const updatedEstablishments = establishments.filter(e => !(e.rbd === rbd && e.rut === rut));
            localStorage.setItem("establishments", JSON.stringify(updatedEstablishments));
            
            // Mostrar mensaje y resetear formulario
            showToast('Establecimiento eliminado correctamente', 'success');
            deleteEstablishmentForm.reset();
        });
    }
    
    // Botón para resetear formulario de eliminación de establecimiento
    const resetDelEstablishmentBtn = document.getElementById('reset-del-establishment');
    if (resetDelEstablishmentBtn && deleteEstablishmentForm) {
        resetDelEstablishmentBtn.addEventListener('click', function() {
            deleteEstablishmentForm.reset();
        });
    }
    
    // Formulario para eliminar usuario
    const deleteUserForm = document.getElementById('delete-user-form');
    if (deleteUserForm) {
        deleteUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('del-username').value;
            
            if (!username) {
                showToast('Debe ingresar un nombre de usuario para eliminar', 'error');
                return;
            }
            
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            const userExists = users.some(u => u.user === username);
            
            if (!userExists) {
                showToast('No se encontró el usuario con el nombre proporcionado', 'error');
                return;
            }
            
            // Eliminar usuario
            const updatedUsers = users.filter(u => u.user !== username);
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            
            // Mostrar mensaje y resetear formulario
            showToast('Usuario eliminado correctamente', 'success');
            deleteUserForm.reset();
        });
    }
    
    // Botón para resetear formulario de eliminación de usuario
    const resetDelUserBtn = document.getElementById('reset-del-user');
    if (resetDelUserBtn && deleteUserForm) {
        resetDelUserBtn.addEventListener('click', function() {
            deleteUserForm.reset();
        });
    }
    
    // Búsqueda de establecimiento para acta
    const searchActaBtn = document.getElementById('search-acta-btn');
    if (searchActaBtn) {
        searchActaBtn.addEventListener('click', function() {
            const searchRbd = document.getElementById('search-acta-rbd').value;
            
            if (!searchRbd) {
                showToast('Debe ingresar un RBD para buscar', 'error');
                return;
            }
            
            const establishments = JSON.parse(localStorage.getItem("establishments") || "[]");
            const found = establishments.find(e => e.rbd === searchRbd);
            
            if (found) {
                // Mostrar formulario
                document.getElementById('acta-form').classList.remove('hidden');
                
                // Calcular siguiente número de acta
                const actas = JSON.parse(localStorage.getItem("actas") || "[]");
                const nextActaNumber = actas.length > 0 ? Math.max(...actas.map(a => a.num_acta)) + 1 : 1;
                
                // Llenar formulario con datos encontrados
                document.getElementById('acta-num').value = nextActaNumber;
                document.getElementById('acta-fecha').value = new Date().toISOString().split('T')[0];
                document.getElementById('acta-rut').value = found.rut;
                document.getElementById('acta-nombre').value = found.nombre;
                document.getElementById('acta-rbd').value = found.rbd;
                document.getElementById('acta-director').value = found.director;
                document.getElementById('acta-direccion').value = found.direccion;
                document.getElementById('acta-telefono').value = found.telefono;
                
                showToast('Establecimiento encontrado', 'success');
            } else {
                showToast('No se encontró el establecimiento con el RBD proporcionado', 'error');
            }
        });
    }
    
    // Formulario para registrar acta
    const actaForm = document.getElementById('acta-form');
    if (actaForm) {
        actaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newActa = {
                id: Date.now(),
                num_acta: parseInt(document.getElementById('acta-num').value),
                tema: "Informática",
                fecha: document.getElementById('acta-fecha').value,
                rut_acta: document.getElementById('acta-rut').value,
                nombre_acta: document.getElementById('acta-nombre').value,
                rbd_acta: document.getElementById('acta-rbd').value,
                director_acta: document.getElementById('acta-director').value,
                direccion_acta: document.getElementById('acta-direccion').value,
                responsable_acta: document.getElementById('acta-responsable').value,
                telefono: document.getElementById('acta-telefono').value,
                motivo: document.getElementById('acta-motivo').value,
                descripcion: document.getElementById('acta-descripcion').value,
                recepcion: document.getElementById('acta-recepcion').value
            };
            
            // Guardar acta
            const actas = JSON.parse(localStorage.getItem("actas") || "[]");
            actas.push(newActa);
            localStorage.setItem("actas", JSON.stringify(actas));
            
            // Generar PDF
            generatePDF(newActa);
            
            // Mostrar mensaje y resetear formulario
            showToast('Acta registrada y descargada correctamente', 'success');
            resetActaForm();
        });
    }
    
    // Botón para resetear formulario de acta
    const resetActaBtn = document.getElementById('reset-acta');
    if (resetActaBtn) {
        resetActaBtn.addEventListener('click', resetActaForm);
    }
}

// Resetear formulario de modificación de establecimiento
function resetModifyEstablishmentForm() {
    document.getElementById('search-rbd').value = '';
    document.getElementById('search-rut').value = '';
    document.getElementById('mod-rut').value = '';
    document.getElementById('mod-nombre').value = '';
    document.getElementById('mod-rbd').value = '';
    document.getElementById('mod-director').value = '';
    document.getElementById('mod-direccion').value = '';
    document.getElementById('mod-telefono').value = '';
    
    // Deshabilitar campos y botón de modificar
    document.getElementById('mod-rut').disabled = true;
    document.getElementById('mod-nombre').disabled = true;
    document.getElementById('mod-rbd').disabled = true;
    document.getElementById('mod-director').disabled = true;
    document.getElementById('mod-direccion').disabled = true;
    document.getElementById('mod-telefono').disabled = true;
    document.querySelector('#modify-establishment-form button[type="submit"]').disabled = true;
}

// Resetear formulario de modificación de usuario
function resetModifyUserForm() {
    document.getElementById('search-username').value = '';
    document.getElementById('mod-username').value = '';
    document.getElementById('mod-password').value = '';
    document.getElementById('mod-user-type').value = '';
    
    // Deshabilitar campos y botón de modificar
    document.getElementById('mod-username').disabled = true;
    document.getElementById('mod-password').disabled = true;
    document.getElementById('mod-user-type').disabled = true;
    document.querySelector('#modify-user-form button[type="submit"]').disabled = true;
}

// Resetear formulario de acta
function resetActaForm() {
    document.getElementById('search-acta-rbd').value = '';
    document.getElementById('acta-form').classList.add('hidden');
    document.getElementById('acta-num').value = '';
    document.getElementById('acta-fecha').value = '';
    document.getElementById('acta-rut').value = '';
    document.getElementById('acta-nombre').value = '';
    document.getElementById('acta-rbd').value = '';
    document.getElementById('acta-director').value = '';
    document.getElementById('acta-direccion').value = '';
    document.getElementById('acta-responsable').value = '';
    document.getElementById('acta-telefono').value = '';
    document.getElementById('acta-motivo').value = '';
    document.getElementById('acta-descripcion').value = '';
    document.getElementById('acta-recepcion').value = '';
}

// Configurar eventos de búsqueda y paginación
function setupSearchAndPaginationEvents() {
    // Búsqueda de establecimientos
    const searchEstablishmentsInput = document.getElementById('search-establishments');
    if (searchEstablishmentsInput) {
        searchEstablishmentsInput.addEventListener('input', function() {
            loadEstablishmentsTable(1, this.value);
        });
    }
    
    // Búsqueda de usuarios
    const searchUsersInput = document.getElementById('search-users');
    if (searchUsersInput) {
        searchUsersInput.addEventListener('input', function() {
            loadUsersTable(1, this.value);
        });
    }
    
    // Búsqueda de actas
    const searchActasInput = document.getElementById('search-actas');
    if (searchActasInput) {
        searchActasInput.addEventListener('input', function() {
            loadActasTable(1, this.value);
        });
    }
}

// Cargar datos en las tablas
function loadTableData() {
    loadEstablishmentsTable();
    loadUsersTable();
    loadActasTable();
}

// Cargar tabla de establecimientos
function loadEstablishmentsTable(page = 1, searchTerm = '') {
    const tableBody = document.getElementById('establishments-table-body');
    const pagination = document.getElementById('establishments-pagination');
    const countElement = document.getElementById('establishment-count');
    
    if (!tableBody || !pagination || !countElement) return;
    
    const establishments = JSON.parse(localStorage.getItem("establishments") || "[]");
    
    // Filtrar por término de búsqueda
    const filteredEstablishments = establishments.filter(e => 
        e.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.rbd.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.rut.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Actualizar contador
    countElement.textContent = `Establecimientos registrados: ${establishments.length}`;
    
    // Calcular paginación
    const totalPages = Math.ceil(filteredEstablishments.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = filteredEstablishments.slice(startIndex, endIndex);
    
    // Limpiar tabla
    tableBody.innerHTML = '';
    
    // Si no hay datos, mostrar mensaje
    if (currentItems.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="7" class="text-center">No hay establecimientos registrados</td>`;
        tableBody.appendChild(row);
    } else {
        // Llenar tabla con datos
        currentItems.forEach(establishment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${establishment.id}</td>
                <td>${establishment.rut}</td>
                <td>${establishment.nombre}</td>
                <td>${establishment.rbd}</td>
                <td>${establishment.director}</td>
                <td>${establishment.direccion}</td>
                <td>${establishment.telefono}</td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    // Generar paginación
    generatePagination(pagination, page, totalPages, 'loadEstablishmentsTable', searchTerm);
}

// Cargar tabla de usuarios
function loadUsersTable(page = 1, searchTerm = '') {
    const tableBody = document.getElementById('users-table-body');
    const pagination = document.getElementById('users-pagination');
    const countElement = document.getElementById('user-count');
    
    if (!tableBody || !pagination || !countElement) return;
    
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Filtrar por término de búsqueda
    const filteredUsers = users.filter(u => 
        u.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Actualizar contador
    countElement.textContent = `Usuarios registrados: ${users.length}`;
    
    // Calcular paginación
    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = filteredUsers.slice(startIndex, endIndex);
    
    // Limpiar tabla
    tableBody.innerHTML = '';
    
    // Si no hay datos, mostrar mensaje
    if (currentItems.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="4" class="text-center">No hay usuarios registrados</td>`;
        tableBody.appendChild(row);
    } else {
        // Llenar tabla con datos
        currentItems.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.user}</td>
                <td class="password-cell">
                    <span class="password-dots" id="password-dots-${index}">••••••••</span>
                    <span class="password-text hidden" id="password-text-${index}">${user.pass}</span>
                    <button type="button" class="toggle-password-btn" data-index="${index}">
                        <i class="fas fa-eye" id="password-icon-${index}"></i>
                    </button>
                </td>
                <td>${user.tipo}</td>
            `;
            tableBody.appendChild(row);
        });
        
        // Agregar eventos a los botones de mostrar/ocultar contraseña
        document.querySelectorAll('.toggle-password-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                const dotsElement = document.getElementById(`password-dots-${index}`);
                const textElement = document.getElementById(`password-text-${index}`);
                const iconElement = document.getElementById(`password-icon-${index}`);
                
                if (dotsElement.classList.contains('hidden')) {
                    // Mostrar puntos, ocultar texto
                    dotsElement.classList.remove('hidden');
                    textElement.classList.add('hidden');
                    iconElement.className = 'fas fa-eye';
                } else {
                    // Mostrar texto, ocultar puntos
                    dotsElement.classList.add('hidden');
                    textElement.classList.remove('hidden');
                    iconElement.className = 'fas fa-eye-slash';
                }
            });
        });
    }
    
    // Generar paginación
    generatePagination(pagination, page, totalPages, 'loadUsersTable', searchTerm);
}

// Cargar tabla de actas
function loadActasTable(page = 1, searchTerm = '') {
    const tableBody = document.getElementById('actas-table-body');
    const pagination = document.getElementById('actas-pagination');
    const countElement = document.getElementById('acta-count');
    
    if (!tableBody || !pagination || !countElement) return;
    
    const actas = JSON.parse(localStorage.getItem("actas") || "[]");
    
    // Filtrar por término de búsqueda
    const filteredActas = actas.filter(a => 
        a.nombre_acta.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.rbd_acta.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.rut_acta.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.tema.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Actualizar contador
    countElement.textContent = `Actas registradas: ${actas.length}`;
    
    // Calcular paginación
    const totalPages = Math.ceil(filteredActas.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = filteredActas.slice(startIndex, endIndex);
    
    // Limpiar tabla
    tableBody.innerHTML = '';
    
    // Si no hay datos, mostrar mensaje
    if (currentItems.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="10" class="text-center">No hay actas registradas</td>`;
        tableBody.appendChild(row);
    } else {
        // Llenar tabla con datos
        currentItems.forEach(acta => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${acta.num_acta}</td>
                <td>${acta.tema}</td>
                <td>${acta.fecha}</td>
                <td>${acta.rut_acta}</td>
                <td>${acta.nombre_acta}</td>
                <td>${acta.rbd_acta}</td>
                <td>${acta.director_acta}</td>
                <td>${acta.direccion_acta}</td>
                <td>${acta.responsable_acta}</td>
                <td>${acta.telefono}</td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    // Generar paginación
    generatePagination(pagination, page, totalPages, 'loadActasTable', searchTerm);
}

// Generar paginación
function generatePagination(container, currentPage, totalPages, loadFunction, searchTerm) {
    container.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    const paginationContent = document.createElement('div');
    paginationContent.className = 'pagination-content';
    
    // Botón anterior
    const prevItem = document.createElement('div');
    prevItem.className = 'pagination-item';
    const prevButton = document.createElement('button');
    prevButton.className = `pagination-prev ${currentPage === 1 ? 'pagination-disabled' : ''}`;
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    if (currentPage > 1) {
        prevButton.addEventListener('click', () => {
            window[loadFunction](currentPage - 1, searchTerm);
        });
    }
    prevItem.appendChild(prevButton);
    paginationContent.appendChild(prevItem);
    
    // Números de página
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('div');
        pageItem.className = 'pagination-item';
        const pageLink = document.createElement('button');
        pageLink.className = `pagination-link ${i === currentPage ? 'active' : ''}`;
        pageLink.textContent = i;
        pageLink.addEventListener('click', () => {
            window[loadFunction](i, searchTerm);
        });
        pageItem.appendChild(pageLink);
        paginationContent.appendChild(pageItem);
    }
    
    // Botón siguiente
    const nextItem = document.createElement('div');
    nextItem.className = 'pagination-item';
    const nextButton = document.createElement('button');
    nextButton.className = `pagination-next ${currentPage === totalPages ? 'pagination-disabled' : ''}`;
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    if (currentPage < totalPages) {
        nextButton.addEventListener('click', () => {
            window[loadFunction](currentPage + 1, searchTerm);
        });
    }
    nextItem.appendChild(nextButton);
    paginationContent.appendChild(nextItem);
    
    container.appendChild(paginationContent);
}

// Generar PDF del acta
function generatePDF(acta) {
    // Asegurarse de que jsPDF esté disponible
    if (typeof jspdf === 'undefined' || typeof jspdf.jsPDF === 'undefined') {
        console.error('jsPDF no está disponible');
        return;
    }
    
    const { jsPDF } = jspdf;
    const doc = new jsPDF();
    
    // Añadir encabezado
    doc.setFontSize(18);
    doc.text("INFORME ÁREA INFORMÁTICA", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.text(`N° Acta: ${acta.num_acta}`, 20, 30);
    doc.text(`Tema: ${acta.tema}`, 20, 40);
    doc.text(`Fecha: ${acta.fecha}`, 20, 50);
    
    // Añadir información del establecimiento
    doc.text("DATOS DEL ESTABLECIMIENTO", 105, 65, { align: "center" });
    doc.text(`RUT: ${acta.rut_acta}`, 20, 75);
    doc.text(`Establecimiento: ${acta.nombre_acta}`, 20, 85);
    doc.text(`RBD: ${acta.rbd_acta}`, 20, 95);
    doc.text(`Director: ${acta.director_acta}`, 20, 105);
    doc.text(`Dirección: ${acta.direccion_acta}`, 20, 115);
    doc.text(`Responsable: ${acta.responsable_acta}`, 20, 125);
    doc.text(`Teléfono: ${acta.telefono}`, 20, 135);
    
    // Añadir contenido
    doc.text("MOTIVO DE VISITA", 105, 150, { align: "center" });
    const motivoLines = doc.splitTextToSize(acta.motivo, 170);
    doc.text(motivoLines, 20, 160);
    
    doc.text("DESCRIPCIÓN DE EQUIPOS", 105, 190, { align: "center" });
    const descripcionLines = doc.splitTextToSize(acta.descripcion, 170);
    doc.text(descripcionLines, 20, 200);
    
    doc.text("RECEPCIÓN DE EQUIPO", 105, 230, { align: "center" });
    const recepcionLines = doc.splitTextToSize(acta.recepcion, 170);
    doc.text(recepcionLines, 20, 240);
    
    // Añadir pie de página
    doc.text("Firma Responsable", 50, 270, { align: "center" });
    doc.text("Firma Técnico", 150, 270, { align: "center" });
    
    // Guardar PDF
    doc.save(`Acta_${acta.num_acta}_${acta.nombre_acta}.pdf`);
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

// Exponer funciones para la paginación
window.loadEstablishmentsTable = loadEstablishmentsTable;
window.loadUsersTable = loadUsersTable;
window.loadActasTable = loadActasTable;

// Dummy function for toggleTheme
function toggleTheme() {
    console.log('toggleTheme function called');
}