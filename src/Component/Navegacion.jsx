import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavbarCliente() {
  const ubicacion = useLocation();

  const enRuta = (ruta) => ubicacion.pathname === ruta;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm py-3">
      <div className="container">
        {/* Logotipo / Nombre del restaurante */}
        <Link to="/" className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2 text-white">
          <span className="bg-danger text-white rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
            🍽️
          </span>
          Las Delicias
        </Link>

        {/* Botón responsive para celulares */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces de navegación con el resaltado activo más pronunciado */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-1 gap-lg-2">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link px-3 py-2 rounded-pill fw-semibold transition-all ${
                  enRuta('/') 
                    ? 'bg-danger text-white shadow-sm' 
                    : 'text-white-50 hover-text-white'
                }`}
              >
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/reservas"
                className={`nav-link px-3 py-2 rounded-pill fw-semibold transition-all ${
                  enRuta('/reservas') 
                    ? 'bg-danger text-white shadow-sm' 
                    : 'text-white-50 hover-text-white'
                }`}
              >
                Reservas y Mesas
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/servicios"
                className={`nav-link px-3 py-2 rounded-pill fw-semibold transition-all ${
                  enRuta('/servicios') 
                    ? 'bg-danger text-white shadow-sm' 
                    : 'text-white-50 hover-text-white'
                }`}
              >
                Nuestra Carta
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/calendario"
                className={`nav-link px-3 py-2 rounded-pill fw-semibold transition-all ${
                  enRuta('/calendario') 
                    ? 'bg-danger text-white shadow-sm' 
                    : 'text-white-50 hover-text-white'
                }`}
              >
                Horarios y Calendario
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/contacto"
                className={`nav-link px-3 py-2 rounded-pill fw-semibold transition-all ${
                  enRuta('/contacto') 
                    ? 'bg-danger text-white shadow-sm' 
                    : 'text-white-50 hover-text-white'
                }`}
              >
                Contacto
              </Link>
            </li>

            {/* Botón de Iniciar Sesión (para acceder con credenciales de administrador) */}
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <Link
                to="/login"
                className={`btn btn-sm rounded-pill px-4 py-2 fw-semibold ${
                  enRuta('/login') 
                    ? 'btn-danger text-white shadow-sm' 
                    : 'btn-outline-light'
                }`}
              >
                🔑 Iniciar Sesión
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}