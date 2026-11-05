import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

export default function MenuAdmin() {
  const navegar = useNavigate();
  const ubicacion = useLocation();

  function cerrarSesion() {
    localStorage.removeItem('sesionPrueba');
    navegar('/');
    window.location.reload();
  }

  const enRuta = (ruta) => ubicacion.pathname === ruta;

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Barra lateral elegante en color negro con foto de restaurante */}
      <div 
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark shadow-lg" 
        style={{ width: '280px', minHeight: '100vh', borderRight: '1px solid rgba(255,255,255,0.05)' }}
      >
        {/* Cabecera del menú con fotografía de restaurante */}
        <div className="text-center py-3 mb-3 border-bottom border-secondary">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80" 
            alt="Interior del Restaurante" 
            className="rounded-circle shadow mb-2 border border-danger border-2 object-fit-cover"
            style={{ width: '70px', height: '70px' }}
          />
          <h5 className="fw-bold mb-0 text-white">Las Delicias</h5>
          <span className="badge bg-danger text-white small px-2 py-1 mt-1 rounded-pill">Panel Administrador</span>
        </div>

        {/* Opciones de navegación */}
        <ul className="nav nav-pills flex-column mb-auto gap-2">
          <li>
            <Link 
              to="/admin" 
              className={`nav-link text-white py-2 px-3 rounded-3 d-flex align-items-center ${enRuta('/admin') ? 'bg-danger shadow-sm fw-bold' : 'hover-dark'}`}
              style={{ transition: 'all 0.2s' }}
            >
              <i className="bi bi-speedometer2 me-3 fs-5 text-danger-emphasis"></i> Panel Principal
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/mesas" 
              className={`nav-link text-white py-2 px-3 rounded-3 d-flex align-items-center ${enRuta('/admin/mesas') ? 'bg-danger shadow-sm fw-bold' : 'hover-dark'}`}
              style={{ transition: 'all 0.2s' }}
            >
              <i className="bi bi-grid-3x3-gap me-3 fs-5"></i> Gestión de Mesas
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/reservas" 
              className={`nav-link text-white py-2 px-3 rounded-3 d-flex align-items-center ${enRuta('/admin/reservas') ? 'bg-danger shadow-sm fw-bold' : 'hover-dark'}`}
              style={{ transition: 'all 0.2s' }}
            >
              <i className="bi bi-calendar-check me-3 fs-5"></i> Reservas Activas
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/carta" 
              className={`nav-link text-white py-2 px-3 rounded-3 d-flex align-items-center ${enRuta('/admin/carta') ? 'bg-danger shadow-sm fw-bold' : 'hover-dark'}`}
              style={{ transition: 'all 0.2s' }}
            >
              <i className="bi bi-journal-text me-3 fs-5"></i> Carta y Menú
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/calendario" 
              className={`nav-link text-white py-2 px-3 rounded-3 d-flex align-items-center ${enRuta('/admin/calendario') ? 'bg-danger shadow-sm fw-bold' : 'hover-dark'}`}
              style={{ transition: 'all 0.2s' }}
            >
              <i className="bi bi-calendar-event me-3 fs-5"></i> Calendario y Horarios
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/contactos" 
              className={`nav-link text-white py-2 px-3 rounded-3 d-flex align-items-center ${enRuta('/admin/contactos') ? 'bg-danger shadow-sm fw-bold' : 'hover-dark'}`}
              style={{ transition: 'all 0.2s' }}
            >
              <i className="bi bi-chat-dots me-3 fs-5"></i> Contactos y Redes
            </Link>
          </li>
        </ul>

        <hr className="border-secondary" />

        {/* Acciones inferiores */}
        <div className="d-grid gap-2">
          <Link to="/admin/cliente/reservas" className="btn btn-outline-light btn-sm rounded-pill py-2">
            <i className="bi bi-eye me-2"></i> Ver sitio como cliente
          </Link>
          <button 
            onClick={cerrarSesion} 
            className="btn btn-danger btn-sm fw-bold rounded-pill py-2 shadow-sm"
          >
            <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Contenido principal del panel con diseño fluido */}
      <div className="flex-grow-1 overflow-auto bg-light">
        <nav className="navbar navbar-light bg-white shadow-sm px-4 py-3 mb-4 border-bottom">
          <div className="d-flex align-items-center gap-3">
            <span className="navbar-brand mb-0 h5 fw-bold text-dark">
              🍽️ Sistema de Control Administrativo
            </span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-dark text-white px-3 py-2 rounded-pill shadow-sm">
              <i className="bi bi-shield-check text-success me-1"></i> Administrador Activo
            </span>
          </div>
        </nav>
        
        <div className="px-3 px-md-4 pb-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}