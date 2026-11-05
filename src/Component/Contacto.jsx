import React, { useEffect, useState } from 'react';

const datosPorDefecto = {
  telefono: '51987654321',
  numeroVisible: '+51 987 654 321',
  direccion: 'Av. Las Palmeras 123, Santa Anita, Lima',
  correo: 'contacto@lasdelicias.example',
  redes: [
    {
      nombre: 'Facebook',
      usuario: '@LasDeliciasRestaurante',
      url: 'https://www.facebook.com/',
      color: 'primary',
      imagen: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg',
      descripcion: 'Síguenos para conocer nuestras novedades y eventos.'
    },
    {
      nombre: 'Instagram',
      usuario: '@lasdelicias.restaurante',
      url: 'https://www.instagram.com/',
      color: 'danger',
      imagen: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg',
      descripcion: 'Descubre nuestros platos, postres y fotografías.'
    },
    {
      nombre: 'TikTok',
      usuario: '@lasdeliciasrestaurante',
      url: 'https://www.tiktok.com/',
      color: 'dark',
      imagen: 'https://static.vecteezy.com/system/resources/previews/016/716/450/non_2x/tiktok-icon-free-png.png',
      descripcion: 'Mira nuestros videos y los mejores momentos del local.'
    }
  ]
};

export default function Contacto() {
  const [datos, setDatos] = useState(datosPorDefecto);

  // Carga automática de los datos actualizados desde el localStorage del administrador
  useEffect(() => {
    try {
      const guardados = localStorage.getItem('contactosRestaurante');
      if (guardados) {
        const parsed = JSON.parse(guardados);
        setDatos({
          ...datosPorDefecto,
          ...parsed,
          redes: Array.isArray(parsed.redes)
            ? parsed.redes.map((r, i) => ({
                ...r,
                imagen: r.imagen || datosPorDefecto.redes[i]?.imagen
              }))
            : datosPorDefecto.redes
        });
      }
    } catch {
      setDatos(datosPorDefecto);
    }
  }, []);

  return (
    <div className="container py-4 py-md-5">
      {/* Cabecera de la sección */}
      <div className="text-center mb-5">
        <span className="badge bg-danger text-white px-3 py-2 rounded-pill mb-2 fw-semibold">
          📞 Estamos para atenderte
        </span>
        <h1 className="display-4 fw-bold text-dark">Ponte en contacto con nosotros</h1>
        <p className="lead text-secondary mx-auto" style={{ maxWidth: '600px' }}>
          ¿Tienes alguna consulta, sugerencia o deseas realizar un pedido especial? Comunícate por nuestros canales oficiales.
        </p>
      </div>

      {/* Tarjetas de Información Directa con Imágenes Estilo TikTok */}
      <div className="row g-4 mb-5">
        {/* Teléfono / WhatsApp */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 text-center p-4 bg-white d-flex flex-column justify-content-between">
            <div>
              <div className="mb-3 position-relative d-inline-block mx-auto bg-light p-3 rounded-circle shadow-xs border">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WhatsApp"
                  className="object-fit-contain"
                  style={{ width: '45px', height: '45px' }}
                />
              </div>
              <h4 className="fw-bold mb-2 text-dark">WhatsApp y Teléfono</h4>
              <p className="text-muted small mb-4">Escríbenos o llámanos directamente para reservas rápidas.</p>
            </div>
            <div>
              <a
                href={`https://wa.me/${datos.telefono}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-success rounded-pill px-4 fw-semibold shadow-sm w-100"
              >
                💬 {datos.numeroVisible}
              </a>
            </div>
          </div>
        </div>

        {/* Dirección */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 text-center p-4 bg-white d-flex flex-column justify-content-between">
            <div>
              <div className="mb-3 position-relative d-inline-block mx-auto bg-light p-3 rounded-circle shadow-xs border">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                  alt="Ubicación"
                  className="object-fit-contain"
                  style={{ width: '45px', height: '45px' }}
                />
              </div>
              <h4 className="fw-bold mb-2 text-dark">Ubicación Física</h4>
              <p className="text-muted small mb-4">Visítanos en nuestro local principal y vive la mejor experiencia.</p>
            </div>
            <div>
              <span className="text-dark fw-bold d-block p-2 bg-light rounded-pill border small">
                📍 {datos.direccion}
              </span>
            </div>
          </div>
        </div>

        {/* Correo Electrónico */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 text-center p-4 bg-white d-flex flex-column justify-content-between">
            <div>
              <div className="mb-3 position-relative d-inline-block mx-auto bg-light p-3 rounded-circle shadow-xs border">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
                  alt="Correo"
                  className="object-fit-contain"
                  style={{ width: '45px', height: '45px' }}
                />
              </div>
              <h4 className="fw-bold mb-2 text-dark">Correo Electrónico</h4>
              <p className="text-muted small mb-4">Envíanos tus consultas institucionales o corporativas.</p>
            </div>
            <div>
              <a
                href={`mailto:${datos.correo}`}
                className="btn btn-outline-primary rounded-pill px-4 fw-semibold shadow-xs w-100 text-truncate"
              >
                ✉️ {datos.correo}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Redes Sociales con Logos Oficiales */}
      <div className="mb-5">
        <div className="text-center mb-4">
          <h3 className="fw-bold text-dark">Síguenos en nuestras redes sociales</h3>
          <p className="text-muted small">Entérate de nuestras promociones, fotos y nuevos platos del día.</p>
        </div>

        <div className="row g-4 justify-content-center">
          {datos.redes.map((red) => (
            <div className="col-12 col-md-4" key={red.nombre}>
              <div className="card border-0 shadow-sm rounded-4 h-100 p-4 bg-white text-center d-flex flex-column justify-content-between">
                <div>
                  <div className="mb-3 position-relative d-inline-block mx-auto bg-light p-3 rounded-circle shadow-xs border">
                    <img
                      src={red.imagen}
                      alt={red.nombre}
                      className="object-fit-contain"
                      style={{ width: '45px', height: '45px' }}
                    />
                  </div>

                  <h4 className="fw-bold mb-1 text-dark">{red.nombre}</h4>
                  <p className="text-danger fw-semibold small mb-2">{red.usuario}</p>
                  <p className="text-muted small mb-4">{red.descripcion}</p>
                </div>

                <div>
                  <a
                    href={red.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`btn btn-outline-${red.color} rounded-pill w-100 fw-semibold py-2 shadow-xs`}
                  >
                    Visitar {red.nombre} →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}