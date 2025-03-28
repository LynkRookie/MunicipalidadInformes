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
    
    // Configurar eventos de búsqueda y paginación
    setupSearchAndPaginationEvents();
    
    // Cargar datos en las tablas
    loadActasTable();
}

// Comprobar si hay un usuario en sesión
function checkSession() {
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) {
        window.location.href = "../index.html";
        return;
    }
    
    const currentUser = JSON.parse(storedUser);
    if (currentUser.tipo !== "Lector") {
        window.location.href = "../index.html";
    }
}

// Configurar eventos de navegación
function setupNavigationEvents() {
    // Botones de navegación en el sidebar
    document.getElementById('btn-dashboard').addEventListener('click', () => navigateTo('dashboard'));
    document.getElementById('btn-showActas').addEventListener('click', () => navigateTo('showActas'));
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
    document.getElementById('card-showActas').addEventListener('click', () => navigateTo('showActas'));
    
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
    if (section === 'showActas') {
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

// Configurar eventos de búsqueda y paginación
function setupSearchAndPaginationEvents() {
    // Búsqueda de actas
    const searchActasInput = document.getElementById('search-actas');
    if (searchActasInput) {
        searchActasInput.addEventListener('input', function() {
            loadActasTable(1, this.value);
        });
    }
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
window.loadActasTable = loadActasTable;