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
    
    // Configurar eventos de formularios
    setupFormEvents();
    
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
    if (currentUser.tipo !== "Usuario") {
        window.location.href = "../index.html";
    }
}

// Configurar eventos de navegación
function setupNavigationEvents() {
    // Botones de navegación en el sidebar
    document.getElementById('btn-dashboard').addEventListener('click', () => navigateTo('dashboard'));
    document.getElementById('btn-search').addEventListener('click', () => navigateTo('search'));
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
    document.getElementById('card-search').addEventListener('click', () => navigateTo('search'));
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

// Configurar eventos de formularios
function setupFormEvents() {
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
window.loadActasTable = loadActasTable;