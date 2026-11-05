import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MesasIniciales = [
  { id: 1, numero: 1, nombre: 'Mesa 1 · Ventana', capacidad: 2, zona: 'Interior', estado: 'activo' },
  { id: 2, numero: 2, nombre: 'Mesa 2 · Romántica', capacidad: 2, zona: 'Terraza', estado: 'activo' },
  { id: 3, numero: 3, nombre: 'Mesa 3 · Central', capacidad: 4, zona: 'Interior', estado: 'activo' },
  { id: 4, numero: 4, nombre: 'Mesa 4 · Familiar', capacidad: 4, zona: 'Terraza', estado: 'activo' },
  { id: 5, numero: 5, nombre: 'Mesa 5 · VIP', capacidad: 6, zona: 'Salón Privado', estado: 'activo' },
];

const horarios = [
  '08:00',
  '10:00',
  '12:00',
  '14:00',
  '16:00',
  '18:00',
  '20:00',
  '22:00',
];

function obtenerFechaLocal() {
  const fecha = new Date();
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}

function cargarReservas() {
  try {
    const datos = JSON.parse(localStorage.getItem('reservas') || '[]');
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

function cargarMesas() {
  try {
    const datos = JSON.parse(localStorage.getItem('mesasRestaurante') || 'null');
    if (Array.isArray(datos) && datos.length > 0) {
      return datos.map(m => ({ ...m, estado: m.estado || 'activo' }));
    }
    localStorage.setItem('mesasRestaurante', JSON.stringify(MesasIniciales));
    return MesasIniciales;
  } catch {
    return MesasIniciales;
  }
}

function cargarFechasEspeciales() {
  try {
    const datos = JSON.parse(localStorage.getItem('fechasEspeciales') || '[]');
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

function obtenerSesion() {
  try {
    const datos = JSON.parse(localStorage.getItem('sesionPrueba') || 'null');
    return datos && typeof datos === 'object' ? datos : null;
  } catch {
    return null;
  }
}

export default function Reservas() {
  const ubicacion = useLocation();
  const [sesion] = useState(obtenerSesion);

  // Detecta si estamos exactamente en la ruta de administración (/admin/reservas)
  const enRutaAdmin = ubicacion.pathname === '/admin/reservas';
  const mostrarVistaAdmin = sesion?.rol === 'administrador' && enRutaAdmin;
  const mostrarVistaCliente =
    !mostrarVistaAdmin &&
    (sesion?.rol === 'cliente' || sesion?.rol === 'administrador');

  const [nombre, setNombre] = useState(sesion?.nombre || '');
  const [fecha, setFecha] = useState(obtenerFechaLocal);
  const [hora, setHora] = useState('');
  const [personas, setPersonas] = useState('2');
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);

  const [reservas, setReservas] = useState(cargarReservas);
  const [mesas, setMesas] = useState(cargarMesas);
  const [fechasEspeciales, setFechasEspeciales] = useState(cargarFechasEspeciales);

  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('success');

  useEffect(() => {
    function sincronizarDatos() {
      setMesas(cargarMesas());
      setReservas(cargarReservas());
      setFechasEspeciales(cargarFechasEspeciales());
    }
    window.addEventListener('focus', sincronizarDatos);
    return () => window.removeEventListener('focus', sincronizarDatos);
  }, []);

  const fechaNoLaborable = fechasEspeciales.find(
    (item) => item.fecha === fecha && item.tipo === 'noLaborable'
  );

  const cantidadPersonas = Number(personas);

  // Comprobar si una mesa específica está ocupada en la fecha y hora elegidas
  function estaMesaOcupada(mesa) {
    const identificador = mesa.numero || mesa.id;
    return reservas.some(
      (r) =>
        r.fecha === fecha &&
        r.hora === hora &&
        (Number(r.mesa) === Number(identificador) || Number(r.mesaId) === Number(mesa.id))
    );
  }

  // Filtrar horarios que tengan al menos una mesa libre, activa y con capacidad suficiente
  const horariosDisponibles = horarios.filter((horario) => {
    if (!fecha || fechaNoLaborable) return false;
    const mesasAdecuadas = mesas.filter((m) => Number(m.capacidad) >= cantidadPersonas && m.estado !== 'inactivo');

    return mesasAdecuadas.some((mesa) => {
      const identificador = mesa.numero || mesa.id;
      const ocupada = reservas.some(
        (r) =>
          r.fecha === fecha &&
          r.hora === horario &&
          (Number(r.mesa) === Number(identificador) || Number(r.mesaId) === Number(mesa.id))
      );
      return !ocupada;
    });
  });

  function registrarReserva(e) {
    e.preventDefault();
    setMensaje('');

    if (!nombre.trim() || !fecha || !hora || !personas) {
      setTipoMensaje('danger');
      setMensaje('Completa todos los datos de tu reserva.');
      return;
    }

    if (!mesaSeleccionada) {
      setTipoMensaje('danger');
      setMensaje('Por favor, haz clic en una de las mesas disponibles para elegir tu lugar.');
      return;
    }

    const mesaObj = mesas.find((m) => m.id === mesaSeleccionada);
    if (!mesaObj || mesaObj.estado === 'inactivo' || estaMesaOcupada(mesaObj)) {
      setTipoMensaje('danger');
      setMensaje('La mesa seleccionada está inhabilitada o ya no está disponible en ese horario.');
      setMesaSeleccionada(null);
      return;
    }

    const nuevaReserva = {
      id: Date.now(),
      nombre: nombre.trim(),
      fecha,
      hora,
      personas: cantidadPersonas,
      mesa: mesaObj.numero || mesaObj.id,
      nombreMesa: mesaObj.nombre || `Mesa ${mesaObj.numero || mesaObj.id}`,
      mesaId: mesaObj.id,
      correo: sesion?.correo || '',
      estado: 'Confirmada',
    };

    const nuevasReservas = [...reservas, nuevaReserva];
    localStorage.setItem('reservas', JSON.stringify(nuevasReservas));
    setReservas(nuevasReservas);

    setTipoMensaje('success');
    setMensaje(`¡Reserva confirmada! Te esperamos en: ${nuevaReserva.nombreMesa}.`);
    setHora('');
    setMesaSeleccionada(null);
  }

  function eliminarReserva(id) {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta reserva?')) return;
    const nuevasReservas = reservas.filter((r) => r.id !== id);
    localStorage.setItem('reservas', JSON.stringify(nuevasReservas));
    setReservas(nuevasReservas);
    setTipoMensaje('success');
    setMensaje('La reserva se eliminó correctamente.');
  }

  if (!sesion) {
    return (
      <div className="container py-5">
        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body text-center p-4 p-md-5">
            <h2 className="fw-bold mb-3">Reservas</h2>
            <p className="text-secondary mb-4">
              Para realizar una reserva y elegir tu mesa, inicia sesión con tu cuenta.
            </p>
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              <Link to="/login" className="btn btn-danger px-4">
                Iniciar sesión
              </Link>
              <Link to="/registro" className="btn btn-outline-danger px-4">
                Crear cuenta
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4 py-md-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            {mostrarVistaAdmin ? 'Administración de Reservas' : 'Reserva tu Mesa'}
          </h2>
          <p className="text-muted mb-0">
            {mostrarVistaAdmin
              ? 'Gestiona las reservas activas de los clientes.'
              : 'Elige tu fecha, horario y selecciona tu mesa favorita en el mapa.'}
          </p>
        </div>

        {sesion?.rol === 'administrador' && (
          <div className="d-flex gap-2">
            {mostrarVistaAdmin ? (
              <>
                <Link to="/admin/mesas" className="btn btn-danger">
                  + Administrar Mesas
                </Link>
                <Link to="/admin/cliente/reservas" className="btn btn-outline-secondary">
                  Ver como cliente
                </Link>
              </>
            ) : (
              <Link to="/admin/reservas" className="btn btn-outline-danger btn-sm">
                Ir a tabla de admin
              </Link>
            )}
          </div>
        )}
      </div>

      {mensaje && (
        <div className={`alert alert-${tipoMensaje} shadow-sm rounded-3`} role="alert">
          {mensaje}
        </div>
      )}

      {/* ENTORNO CLIENTE: FORMULARIO + SELECCIÓN VISUAL DE MESAS */}
      {mostrarVistaCliente && (
        <form onSubmit={registrarReserva}>
          <div className="row g-4">
            {/* Columna izquierda: Datos */}
            <div className="col-12 col-lg-5">
              <div className="card shadow-sm border-0 rounded-4 h-100">
                <div className="card-header bg-danger text-white py-3 rounded-top-4">
                  <h5 className="mb-0 fw-bold">1. Tus Datos y Horario</h5>
                </div>
                <div className="card-body p-4">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Nombre completo</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Ingresa tu nombre"
                      required
                    />
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-6">
                      <label className="form-label fw-semibold">Fecha</label>
                      <input
                        type="date"
                        className="form-control"
                        min={obtenerFechaLocal()}
                        value={fecha}
                        onChange={(e) => {
                          setFecha(e.target.value);
                          setHora('');
                          setMesaSeleccionada(null);
                          setFechasEspeciales(cargarFechasEspeciales());
                        }}
                        required
                      />
                    </div>

                    <div className="col-12 col-sm-6">
                      <label className="form-label fw-semibold">Personas</label>
                      <select
                        className="form-select"
                        value={personas}
                        onChange={(e) => {
                          setPersonas(e.target.value);
                          setMesaSeleccionada(null);
                        }}
                        required
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'persona' : 'personas'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {fechaNoLaborable && (
                    <div className="alert alert-danger small">
                      <strong>Restaurante cerrado: {fechaNoLaborable.titulo}</strong>
                      {fechaNoLaborable.nota && <p className="mb-0 mt-1">{fechaNoLaborable.nota}</p>}
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Horario disponible</label>
                    <div className="row g-2">
                      {horarios.map((h) => {
                        const disponible = horariosDisponibles.includes(h);
                        const activo = hora === h;
                        return (
                          <div className="col-6 col-sm-3 col-lg-6" key={h}>
                            <button
                              type="button"
                              disabled={!disponible}
                              onClick={() => {
                                setHora(h);
                                setMesaSeleccionada(null);
                              }}
                              className={`btn w-100 fw-semibold ${
                                activo
                                  ? 'btn-danger'
                                  : disponible
                                  ? 'btn-outline-danger'
                                  : 'btn-light text-muted border'
                              }`}
                            >
                              {h}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha: Mapa interactivo de mesas */}
            <div className="col-12 col-lg-7">
              <div className="card shadow-sm border-0 rounded-4 h-100">
                <div className="card-header bg-dark text-white py-3 rounded-top-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <h5 className="mb-0 fw-bold">2. Escoge tu Mesa</h5>
                  <div className="d-flex gap-2 small">
                    <span className="badge bg-success">Libre</span>
                    <span className="badge bg-danger">Elegida</span>
                    <span className="badge bg-secondary">Ocupada / Inhabilitada</span>
                  </div>
                </div>

                <div className="card-body p-4 d-flex flex-column justify-content-between">
                  {!hora || fechaNoLaborable ? (
                    <div className="text-center py-5 my-auto text-muted">
                      <p className="fs-5 mb-1">Selecciona primero una fecha y un horario</p>
                      <small>Aquí aparecerán las mesas disponibles en tiempo real.</small>
                    </div>
                  ) : (
                    <div className="row g-3">
                      {mesas.map((mesa) => {
                        const ocupada = estaMesaOcupada(mesa);
                        const inhabilitada = mesa.estado === 'inactivo';
                        const capacidadInsuficiente = Number(mesa.capacidad) < cantidadPersonas;
                        const deshabilitada = ocupada || capacidadInsuficiente || inhabilitada;
                        const seleccionada = mesaSeleccionada === mesa.id;

                        return (
                          <div className="col-6 col-sm-4" key={mesa.id}>
                            <div
                              onClick={() => !deshabilitada && setMesaSeleccionada(mesa.id)}
                              style={{
                                cursor: deshabilitada ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s ease',
                              }}
                              className={`card h-100 text-center rounded-4 border-2 ${
                                seleccionada
                                  ? 'border-danger bg-danger text-white shadow'
                                  : deshabilitada
                                  ? 'border-secondary-subtle bg-light text-muted opacity-50'
                                  : 'border-success bg-white shadow-sm'
                              }`}
                            >
                              <div className="card-body p-3 d-flex flex-column align-items-center justify-content-center">
                                {/* Icono visual de mesa con sillas */}
                                <svg
                                  width="40"
                                  height="40"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="mb-2"
                                >
                                  <rect x="3" y="8" width="18" height="8" rx="2" />
                                  <path d="M5 16v4M19 16v4M4 8V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
                                </svg>

                                <h6 className="fw-bold mb-1">
                                  {mesa.nombre || `Mesa ${mesa.numero || mesa.id}`}
                                </h6>
                                {mesa.zona && (
                                  <small className={seleccionada ? 'text-white-50' : 'text-secondary'}>
                                    {mesa.zona}
                                  </small>
                                )}

                                <span
                                  className={`badge rounded-pill mt-2 ${
                                    seleccionada
                                      ? 'bg-white text-danger'
                                      : inhabilitada
                                      ? 'bg-danger text-white'
                                      : ocupada
                                      ? 'bg-secondary'
                                      : capacidadInsuficiente
                                      ? 'bg-warning text-dark'
                                      : 'bg-success-subtle text-success border border-success'
                                  }`}
                                >
                                  {inhabilitada
                                    ? 'En Mantenimiento'
                                    : ocupada
                                    ? 'Ocupada'
                                    : capacidadInsuficiente
                                    ? `Máx. ${mesa.capacidad} pers.`
                                    : `Para ${mesa.capacidad} pers.`}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-top">
                    <button
                      type="submit"
                      className="btn btn-danger btn-lg w-100 fw-bold rounded-3 shadow-sm"
                      disabled={!fecha || !hora || Boolean(fechaNoLaborable) || !mesaSeleccionada}
                    >
                      {mesaSeleccionada
                        ? `Confirmar reserva en ${
                            mesas.find((m) => m.id === mesaSeleccionada)?.nombre || 'Mesa elegida'
                          }`
                        : 'Selecciona una mesa para confirmar'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* ENTORNO ADMINISTRADOR: TABLA DE RESERVAS */}
      {mostrarVistaAdmin && (
        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body p-4">
            <h4 className="fw-bold mb-3">Reservas registradas ({reservas.length})</h4>

            {reservas.length === 0 ? (
              <p className="text-muted mb-0">Todavía no hay reservas registradas.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                  <thead className="table-danger">
                    <tr>
                      <th>Cliente</th>
                      <th>Correo</th>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Personas</th>
                      <th>Mesa elegida</th>
                      <th>Estado</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservas.map((reserva) => (
                      <tr key={reserva.id}>
                        <td className="fw-semibold">{reserva.nombre}</td>
                        <td>{reserva.correo || 'No disponible'}</td>
                        <td>{reserva.fecha}</td>
                        <td>{reserva.hora}</td>
                        <td>{reserva.personas}</td>
                        <td>
                          <span className="badge bg-danger">
                            {reserva.nombreMesa || `Mesa ${reserva.mesa}`}
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-success">
                            {reserva.estado || 'Confirmada'}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => eliminarReserva(reserva.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}