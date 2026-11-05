import React from 'react';
import { Link } from 'react-router-dom';

export default function PanelAdmin() {
  return (
    <div className="container-fluid py-2">
      {/* Banner de bienvenida superior */}
      <div className="card border-0 shadow-sm rounded-4 bg-dark text-white p-4 p-md-5 mb-4 position-relative overflow-hidden">
        <div className="position-relative z-1">
          <span className="badge bg-danger text-white px-3 py-2 rounded-pill mb-2 fw-semibold">
            ✨ Panel de Control General
          </span>
          <h1 className="fw-bold display-6 mb-2">Restaurante Las Delicias</h1>
          <p className="text-white-50 lead mb-0" style={{ maxWidth: '600px' }}>
            Administra de forma ágil las mesas, reservas, cartas, horarios y canales de contacto desde un solo lugar.
          </p>
        </div>
      </div>

      {/* Tarjetas de Módulos */}
      <div className="row g-4">
        {/* Gestión de Mesas */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 transition-all hover-shadow">
            <div className="card-body p-4 d-flex flex-column justify-content-between">
              <div>
                <div className="d-inline-block p-3 bg-danger-subtle text-danger rounded-4 mb-3 fs-3">
                  <i className="bi bi-grid-3x3-gap-fill"></i>
                </div>
                <h4 className="fw-bold text-dark">Gestión de Mesas</h4>
                <p className="text-muted small mb-4">
                  Crea nuevas mesas, configura su capacidad por zona e inhabilita temporalmente aquellas que se encuentren dañadas o en mantenimiento.
                </p>
              </div>
              <Link to="/admin/mesas" className="btn btn-outline-danger rounded-pill fw-semibold py-2">
                Administrar Mesas →
              </Link>
            </div>
          </div>
        </div>

        {/* Reservas de Clientes */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 transition-all hover-shadow">
            <div className="card-body p-4 d-flex flex-column justify-content-between">
              <div>
                <div className="d-inline-block p-3 bg-primary-subtle text-primary rounded-4 mb-3 fs-3">
                  <i className="bi bi-calendar-check-fill"></i>
                </div>
                <h4 className="fw-bold text-dark">Reservas Activas</h4>
                <p className="text-muted small mb-4">
                  Visualiza el listado detallado de las reservas confirmadas por los clientes, horarios elegidos y mesas asignadas en tiempo real.
                </p>
              </div>
              <Link to="/admin/reservas" className="btn btn-outline-primary rounded-pill fw-semibold py-2">
                Ver Reservas →
              </Link>
            </div>
          </div>
        </div>

        {/* Carta y Menú */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 transition-all hover-shadow">
            <div className="card-body p-4 d-flex flex-column justify-content-between">
              <div>
                <div className="d-inline-block p-3 bg-success-subtle text-success rounded-4 mb-3 fs-3">
                  <i className="bi bi-journal-bookmark-fill"></i>
                </div>
                <h4 className="fw-bold text-dark">Carta y Menú</h4>
                <p className="text-muted small mb-4">
                  Agrega platos o bebidas, modifica precios originales, edita descripciones y aplica porcentajes de descuento por promociones.
                </p>
              </div>
              <Link to="/admin/carta" className="btn btn-outline-success rounded-pill fw-semibold py-2">
                Gestionar Carta →
              </Link>
            </div>
          </div>
        </div>

        {/* Calendario y Horarios */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 transition-all hover-shadow">
            <div className="card-body p-4 d-flex flex-column justify-content-between">
              <div>
                <div className="d-inline-block p-3 bg-warning-subtle text-warning-emphasis rounded-4 mb-3 fs-3">
                  <i className="bi bi-calendar-event-fill"></i>
                </div>
                <h4 className="fw-bold text-dark">Horarios y Calendario</h4>
                <p className="text-muted small mb-4">
                  Configura días festivos, avisos especiales o programa fechas concretas en las que el restaurante permanecerá cerrado.
                </p>
              </div>
              <Link to="/admin/calendario" className="btn btn-outline-warning text-dark border-warning rounded-pill fw-semibold py-2">
                Modificar Calendario →
              </Link>
            </div>
          </div>
        </div>

        {/* Contactos y Redes */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 transition-all hover-shadow">
            <div className="card-body p-4 d-flex flex-column justify-content-between">
              <div>
                <div className="d-inline-block p-3 bg-info-subtle text-info rounded-4 mb-3 fs-3">
                  <i className="bi bi-chat-left-text-fill"></i>
                </div>
                <h4 className="fw-bold text-dark">Contactos y Redes</h4>
                <p className="text-muted small mb-4">
                  Actualiza el número de WhatsApp corporativo, la dirección física del local, el correo electrónico y los perfiles sociales.
                </p>
              </div>
              <Link to="/admin/contactos" className="btn btn-outline-info text-dark border-info rounded-pill fw-semibold py-2">
                Editar Contactos →
              </Link>
            </div>
          </div>
        </div>

        {/* Acceso Rápido al Sitio Público */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-gradient text-dark border border-secondary-subtle">
            <div className="card-body p-4 d-flex flex-column justify-content-between">
              <div>
                <div className="d-inline-block p-3 bg-secondary text-white rounded-4 mb-3 fs-3">
                  <i className="bi bi-shop"></i>
                </div>
                <h4 className="fw-bold text-dark">Sitio Público</h4>
                <p className="text-secondary small mb-4">
                  Visualiza de forma directa cómo interactúan los clientes con la página web, el catálogo de platos y la selección de mesas.
                </p>
              </div>
              <Link to="/admin/cliente/reservas" className="btn btn-dark rounded-pill fw-semibold py-2 shadow-sm">
                Abrir Vista de Cliente →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}