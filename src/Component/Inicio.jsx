import React from 'react';
import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <div>
      {/* Sección Principal (Hero con fotografía de alta calidad) */}
      <div 
        className="position-relative text-white py-5 mb-5 overflow-hidden rounded-bottom-5 shadow-lg"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.75)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '520px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div className="container py-4 text-center text-md-start position-relative z-1">
          <div className="row align-items-center">
            <div className="col-12 col-lg-8">
              <span className="badge bg-danger text-white px-3 py-2 rounded-pill mb-3 fw-semibold shadow-sm">
                🍽️ Bienvenidos a Restaurante Las Delicias
              </span>

              <h1 className="display-3 fw-bold mb-3 text-white">
                Disfruta de una experiencia gastronómica única
              </h1>

              <p className="lead text-light opacity-85 mb-4">
                Elige tu fecha, descubre nuestros platos estrella y asegura tu mesa favorita en segundos desde cualquier dispositivo.
              </p>

              <div className="d-flex justify-content-center justify-content-md-start gap-3 flex-wrap">
                <Link to="/reservas" className="btn btn-danger btn-lg px-4 py-3 rounded-pill fw-bold shadow">
                  📅 Reservar una Mesa
                </Link>

                <Link to="/servicios" className="btn btn-outline-light btn-lg px-4 py-3 rounded-pill fw-semibold">
                  📖 Ver Nuestra Carta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Accesos Rápidos con Imágenes Reales */}
      <div className="container py-4 mb-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark">Todo lo que tenemos para ti</h2>
          <p className="text-muted">Explora nuestros servicios principales pensados en tu comodidad.</p>
        </div>

        <div className="row g-4">
          {/* Tarjeta 1: Mesas */}
          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden bg-white transition-all hover-shadow">
              <div style={{ height: '185px' }} className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80" 
                  alt="Mesas del restaurante" 
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              <div className="card-body p-4 text-center d-flex flex-column justify-content-between">
                <div>
                  <h4 className="fw-bold mb-2 text-dark">Selección de Mesas</h4>
                  <p className="text-muted small mb-4">
                    Visualiza la distribución de nuestro salón y elige el espacio perfecto según tu preferencia y número de acompañantes.
                  </p>
                </div>
                <Link to="/reservas" className="btn btn-outline-danger btn-sm rounded-pill px-4 fw-semibold w-100">
                  Elegir Mesa →
                </Link>
              </div>
            </div>
          </div>

          {/* Tarjeta 2: Carta */}
          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden bg-white transition-all hover-shadow">
              <div style={{ height: '185px' }} className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80" 
                  alt="Platos y especialidades" 
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              <div className="card-body p-4 text-center d-flex flex-column justify-content-between">
                <div>
                  <h4 className="fw-bold mb-2 text-dark">Nuestra Carta</h4>
                  <p className="text-muted small mb-4">
                    Descubre entradas, platos de fondo, postres y bebidas preparados con ingredientes frescos y de la más alta calidad.
                  </p>
                </div>
                <Link to="/servicios" className="btn btn-outline-success btn-sm rounded-pill px-4 fw-semibold w-100">
                  Explorar Menú →
                </Link>
              </div>
            </div>
          </div>

          {/* Tarjeta 3: Calendario */}
          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden bg-white transition-all hover-shadow">
              <div style={{ height: '185px' }} className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80" 
                  alt="Calendario y horarios" 
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              <div className="card-body p-4 text-center d-flex flex-column justify-content-between">
                <div>
                  <h4 className="fw-bold mb-2 text-dark">Horarios y Calendario</h4>
                  <p className="text-muted small mb-4">
                    Revisa los días de atención, feriados y eventos especiales para planificar tu visita con total tranquilidad.
                  </p>
                </div>
                <Link to="/calendario" className="btn btn-outline-warning text-dark border-warning btn-sm rounded-pill px-4 fw-semibold w-100">
                  Ver Calendario →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Inferior de Llamado a la Acción (CTA) con Imagen de Fondo */}
      <div className="container mb-5">
        <div 
          className="card border-0 shadow rounded-4 text-white p-4 p-md-5 text-center position-relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(180, 40, 40, 0.9), rgba(130, 20, 20, 0.95)), url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="position-relative z-1">
            <h2 className="fw-bold mb-3 text-white">¿Listo para visitarnos?</h2>
            <p className="lead mb-4 text-white-50 mx-auto" style={{ maxWidth: '600px' }}>
              Comparte momentos inolvidables junto a tu familia o amigos disfrutando del mejor sabor. ¡Te esperamos!
            </p>
            <div>
              <Link to="/reservas" className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-bold text-danger shadow-sm">
                Hacer una Reservación Ahora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}