// Inicializar el tema cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initTheme);

// Función principal de inicialización del tema
function initTheme() {
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Aplicar tema guardado o usar el predeterminado (claro)
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        updateThemeToggle(true);
    } else {
        document.documentElement.classList.remove('dark');
        updateThemeToggle(false);
    }
    
    // Configurar evento del botón de cambio de tema
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Configurar evento del botón de cambio de tema móvil
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
    
    // Configurar evento para expandir/colapsar sidebar
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Configurar evento para abrir sidebar en móvil
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            document.getElementById('sidebar').classList.add('sidebar-expanded');
            document.getElementById('sidebar').classList.remove('sidebar-collapsed');
            document.querySelector('.sidebar-overlay').style.display = 'block';
        });
    }
    
    // Configurar evento para cerrar sidebar en móvil
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            document.getElementById('sidebar').classList.remove('sidebar-expanded');
            document.getElementById('sidebar').classList.add('sidebar-collapsed');
            sidebarOverlay.style.display = 'none';
        });
    }
}

// Cambiar entre tema claro y oscuro
function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        // Cambiar a tema claro
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        updateThemeToggle(false);
    } else {
        // Cambiar a tema oscuro
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        updateThemeToggle(true);
    }
}

// Actualizar el botón de cambio de tema
function updateThemeToggle(isDark) {
    const themeToggles = document.querySelectorAll('.theme-toggle');
    themeToggles.forEach(toggle => {
        if (isDark) {
            toggle.innerHTML = '<i class="fas fa-sun"></i>';
            toggle.setAttribute('title', 'Cambiar a modo claro');
        } else {
            toggle.innerHTML = '<i class="fas fa-moon"></i>';
            toggle.setAttribute('title', 'Cambiar a modo oscuro');
        }
    });
}

// Expandir/colapsar sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('sidebar-collapsed')) {
        sidebar.classList.remove('sidebar-collapsed');
        sidebar.classList.add('sidebar-expanded');
    } else {
        sidebar.classList.remove('sidebar-expanded');
        sidebar.classList.add('sidebar-collapsed');
    }
}

// Exponer funciones globalmente
window.toggleTheme = toggleTheme;
window.toggleSidebar = toggleSidebar;