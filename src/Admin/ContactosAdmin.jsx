import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const datosIniciales = {
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
      icono: 'bi-facebook',
      imagen: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg',
      descripcion: 'Síguenos para conocer nuestras novedades.'
    },
    {
      nombre: 'Instagram',
      usuario: '@lasdelicias.restaurante',
      url: 'https://www.instagram.com/',
      color: 'danger',
      icono: 'bi-instagram',
      imagen: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg',
      descripcion: 'Descubre nuestros platos y fotografías.'
    },
    {
      nombre: 'TikTok',
      usuario: '@lasdeliciasrestaurante',
      url: 'https://www.tiktok.com/',
      color: 'dark',
      icono: 'bi-tiktok',
      // Enlace PNG estable y directo para TikTok
      imagen: 'https://static.vecteezy.com/system/resources/previews/016/716/450/non_2x/tiktok-icon-free-png.png',
      descripcion: 'Mira nuestros videos y momentos especiales.'
    }
  ]
};

export default function ContactosAdmin() {
  const [datos, setDatos] = useState(datosIniciales);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    try {
      const guardados = localStorage.getItem('contactosRestaurante');

      if (guardados) {
        const datosGuardados = JSON.parse(guardados);

        setDatos({
          ...datosIniciales,
          ...datosGuardados,
          redes: Array.isArray(datosGuardados.redes)
            ? datosGuardados.redes.map((r, i) => ({
                ...r,
                imagen: r.imagen || datosIniciales.redes[i]?.imagen
              }))
            : datosIniciales.redes
        });
      }
    } catch {
      setDatos(datosIniciales);
    }
  }, []);

  function cambiarCampo(campo, valor) {
    setDatos((actuales) => ({
      ...actuales,
      [campo]: valor
    }));

    setMensaje('');
  }

  function cambiarRed(indice, campo, valor) {
    setDatos((actuales) => ({
      ...actuales,
      redes: actuales.redes.map((red, i) =>
        i === indice ? { ...red, [campo]: valor } : red
      )
    }));

    setMensaje('');
  }

  function guardarCambios(evento) {
    evento.preventDefault();

    try {
      localStorage.setItem('contactosRestaurante', JSON.stringify(datos));
      setMensaje('¡Los datos de contacto y redes se guardaron correctamente!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setMensaje('No se pudieron guardar los cambios. Inténtalo nuevamente.');
    }
  }

  return (
    <div className="container py-4 py-md-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Administrar Contactos y Redes</h2>
          <p className="text-muted mb-0">Modifica los canales de comunicación oficiales de Las Delicias.</p>
        </div>

        <Link to="/admin" className="btn btn-outline-danger shadow-sm">
          ← Volver al panel
        </Link>
      </div>

      {mensaje && (
        <div className="alert alert-info shadow-sm border-0 rounded-3" role="alert">
          {mensaje}
        </div>
      )}

      <form onSubmit={guardarCambios}>
        {/* Tarjeta de Teléfono y Ubicación */}
        <div className="card shadow-sm border-0 rounded-4 mb-4">
          <div className="card-header bg-dark text-white py-3 rounded-top-4">
            <h5 className="mb-0 fw-bold">📞 Información de Contacto Directo</h5>
          </div>

          <div className="card-body p-4">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold text-muted">Número para WhatsApp</label>
                <input
                  className="form-control"
                  type="tel"
                  value={datos.telefono}
                  onChange={(e) => cambiarCampo('telefono', e.target.value)}
                  placeholder="51987654321"
                  required
                />
                <small className="text-muted">
                  Incluye el código del país (Ej. 51 para Perú) sin el signo +.
                </small>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-muted">Número visible en la página</label>
                <input
                  className="form-control"
                  value={datos.numeroVisible}
                  onChange={(e) => cambiarCampo('numeroVisible', e.target.value)}
                  placeholder="+51 987 654 321"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-muted">Dirección física del restaurante</label>
                <input
                  className="form-control"
                  value={datos.direccion}
                  onChange={(e) => cambiarCampo('direccion', e.target.value)}
                  placeholder="Escribe la dirección completa"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-muted">Correo electrónico institucional</label>
                <input
                  className="form-control"
                  type="email"
                  value={datos.correo}
                  onChange={(e) => cambiarCampo('correo', e.target.value)}
                  placeholder="contacto@lasdelicias.com"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta de Redes Sociales con Enlaces Verificados */}
        <div className="card shadow-sm border-0 rounded-4 mb-4">
          <div className="card-header bg-dark text-white py-3 rounded-top-4">
            <h5 className="mb-0 fw-bold">🌐 Canales de Redes Sociales Oficiales</h5>
          </div>

          <div className="card-body p-4">
            <div className="row g-4">
              {datos.redes.map((red, indice) => (
                <div className="col-12 col-md-4" key={red.nombre}>
                  <div className="card h-100 border rounded-4 p-3 bg-light shadow-sm text-center d-flex flex-column justify-content-between">
                    <div>
                      {/* Logotipo oficial de la red social */}
                      <div className="mb-3 position-relative d-inline-block mx-auto bg-white p-2 rounded-circle shadow-sm border">
                        <img
                          src={red.imagen}
                          alt={red.nombre}
                          className="object-fit-contain"
                          style={{ width: '45px', height: '45px' }}
                        />
                      </div>

                      <h5 className="fw-bold mb-1">{red.nombre}</h5>
                      <p className="text-muted small mb-3">{red.descripcion}</p>

                      <div className="mb-3 text-start">
                        <label className="form-label small fw-semibold text-muted">Usuario público</label>
                        <input
                          className="form-control form-control-sm"
                          value={red.usuario || ''}
                          onChange={(e) =>
                            cambiarRed(indice, 'usuario', e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="text-start mb-3">
                        <label className="form-label small fw-semibold text-muted">Enlace URL del perfil</label>
                        <input
                          className="form-control form-control-sm"
                          type="url"
                          value={red.url || ''}
                          onChange={(e) =>
                            cambiarRed(indice, 'url', e.target.value)
                          }
                          placeholder="https://..."
                          required
                        />
                      </div>
                    </div>

                    {/* Botón funcional para probar el enlace */}
                    <div>
                      {red.url ? (
                        <a
                          href={red.url}
                          target="_blank"
                          rel="noreferrer"
                          className={`btn btn-sm btn-outline-${red.color} w-100 rounded-pill fw-semibold`}
                        >
                          🔗 Probar Enlace de {red.nombre}
                        </a>
                      ) : (
                        <button type="button" className="btn btn-sm btn-outline-secondary w-100 rounded-pill" disabled>
                          Ingresa una URL válida
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botones de acción inferior */}
        <div className="d-flex flex-wrap gap-3 pb-4">
          <button type="submit" className="btn btn-danger btn-lg px-5 fw-bold shadow-sm">
            Guardar Cambios
          </button>

          <Link to="/contacto" className="btn btn-outline-secondary btn-lg px-4">
            Ver página de contacto pública
          </Link>
        </div>
      </form>
    </div>
  );
}