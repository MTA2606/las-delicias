import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Dos mesas por cada capacidad: de 1 a 10 personas.
const MesasIniciales = [
  { id: 1, numero: 1, nombre: 'Mesa 1 · Individual', capacidad: 1, zona: 'Interior', estado: 'activo' },
  { id: 2, numero: 2, nombre: 'Mesa 2 · Individual', capacidad: 1, zona: 'Terraza', estado: 'activo' },
  { id: 3, numero: 3, nombre: 'Mesa 3 · Ventana', capacidad: 2, zona: 'Interior', estado: 'activo' },
  { id: 4, numero: 4, nombre: 'Mesa 4 · Romántica', capacidad: 2, zona: 'Terraza', estado: 'activo' },
  { id: 5, numero: 5, nombre: 'Mesa 5 · Familiar', capacidad: 3, zona: 'Interior', estado: 'activo' },
  { id: 6, numero: 6, nombre: 'Mesa 6 · Terraza', capacidad: 3, zona: 'Terraza', estado: 'activo' },
  { id: 7, numero: 7, nombre: 'Mesa 7 · Central', capacidad: 4, zona: 'Interior', estado: 'activo' },
  { id: 8, numero: 8, nombre: 'Mesa 8 · Familiar', capacidad: 4, zona: 'Terraza', estado: 'activo' },
  { id: 9, numero: 9, nombre: 'Mesa 9 · Grupo', capacidad: 5, zona: 'Interior', estado: 'activo' },
  { id: 10, numero: 10, nombre: 'Mesa 10 · Grupo', capacidad: 5, zona: 'Terraza', estado: 'activo' },
  { id: 11, numero: 11, nombre: 'Mesa 11 · VIP', capacidad: 6, zona: 'Salón Privado', estado: 'activo' },
  { id: 12, numero: 12, nombre: 'Mesa 12 · Familiar', capacidad: 6, zona: 'Interior', estado: 'activo' },
  { id: 13, numero: 13, nombre: 'Mesa 13 · Grupo Grande', capacidad: 7, zona: 'Terraza', estado: 'activo' },
  { id: 14, numero: 14, nombre: 'Mesa 14 · Grupo Grande', capacidad: 7, zona: 'Salón Privado', estado: 'activo' },
  { id: 15, numero: 15, nombre: 'Mesa 15 · Familiar Grande', capacidad: 8, zona: 'Interior', estado: 'activo' },
  { id: 16, numero: 16, nombre: 'Mesa 16 · Familiar Grande', capacidad: 8, zona: 'Terraza', estado: 'activo' },
  { id: 17, numero: 17, nombre: 'Mesa 17 · Evento', capacidad: 9, zona: 'Salón Privado', estado: 'activo' },
  { id: 18, numero: 18, nombre: 'Mesa 18 · Evento', capacidad: 9, zona: 'Interior', estado: 'activo' },
  { id: 19, numero: 19, nombre: 'Mesa 19 · VIP Grande', capacidad: 10, zona: 'Salón Privado', estado: 'activo' },
  { id: 20, numero: 20, nombre: 'Mesa 20 · VIP Grande', capacidad: 10, zona: 'Terraza', estado: 'activo' },
];

const horarios = [
  '08:00 AM',
  '10:00 AM',
  '12:00 PM',
  '02:00 PM',
  '04:00 PM',
  '06:00 PM',
  '08:00 PM',
  '10:00 PM',
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
    const CLAVE_STORAGE = 'mesasRestaurante_v2';
    const datos = JSON.parse(localStorage.getItem(CLAVE_STORAGE) || '[]');

    if (Array.isArray(datos) && datos.length > 0) {
      const mesasGuardadas = new Map(datos.map((mesa) => [Number(mesa.id), mesa]));
      const mesasActualizadas = MesasIniciales.map((mesa) => {
        const guardada = mesasGuardadas.get(mesa.id);
        return guardada
          ? { ...guardada, ...mesa, estado: guardada.estado || 'activo' }
          : mesa;
      });

      const idsIniciales = new Set(MesasIniciales.map((mesa) => mesa.id));
      const mesasAdicionales = datos.filter((mesa) => !idsIniciales.has(Number(mesa.id)));

      const resultado = [...mesasActualizadas, ...mesasAdicionales];
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(resultado));
      return resultado;
    }

    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(MesasIniciales));
    return MesasIniciales;
  } catch {
    return MesasIniciales;
  }
}

export default function Reservas() {
  const location = useLocation();
  const [mesas, setMesas] = useState(cargarMesas);
  const [reservas, setReservas] = useState(cargarReservas);

  const [fecha, setFecha] = useState(obtenerFechaLocal());
  const [hora, setHora] = useState(horarios[0]);
  const [personas, setPersonas] = useState(2);
  const [zona, setZona] = useState('Todas');
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);

  const [nombreCliente, setNombreCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');
  const [correoCliente, setCorreoCliente] = useState('');
  const [notas, setNotas] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    setMesas(cargarMesas());
    setReservas(cargarReservas());
  }, [location]);

  // Verifica si una mesa ya está reservada en esa fecha y hora
  const estaOcupada = (mesaId) => {
    return reservas.some(
      (r) =>
        Number(r.mesaId) === Number(mesaId) &&
        r.fecha === fecha &&
        r.hora === hora &&
        r.estado !== 'cancelada'
    );
  };

  // Filtra las mesas permitiendo hasta 10 personas
  const mesasDisponibles = mesas.filter((mesa) => {
    const activa = (mesa.estado || 'activo') === 'activo';
    const coincideCapacidad = Number(mesa.capacidad) >= Number(personas);
    const coincideZona = zona === 'Todas' || mesa.zona === zona;
    return activa && coincideCapacidad && coincideZona;
  });

  const confirmarReserva = (e) => {
    e.preventDefault();
    if (!mesaSeleccionada) return;

    const nuevaReserva = {
      id: Date.now(),
      mesaId: mesaSeleccionada.id,
      mesaNombre: mesaSeleccionada.nombre,
      zona: mesaSeleccionada.zona,
      capacidad: mesaSeleccionada.capacidad,
      fecha,
      hora,
      personas: Number(personas),
      cliente: nombreCliente,
      telefono: telefonoCliente,
      correo: correoCliente,
      notas,
      estado: 'confirmada',
    };

    const nuevasReservas = [...reservas, nuevaReserva];
    setReservas(nuevasReservas);
    localStorage.setItem('reservas', JSON.stringify(nuevasReservas));

    setMensajeExito(`¡Reserva confirmada en ${mesaSeleccionada.nombre} para ${personas} persona(s) el ${fecha} a las ${hora}!`);
    setMesaSeleccionada(null);
    setNombreCliente('');
    setTelefonoCliente('');
    setCorreoCliente('');
    setNotas('');
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Reserva tu Mesa en Las Delicias</h2>
        <Link to="/" className="btn btn-outline-secondary">
          Volver al Inicio
        </Link>
      </div>

      {mensajeExito && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {mensajeExito}
          <button type="button" className="btn-close" onClick={() => setMensajeExito('')}></button>
        </div>
      )}

      {/* Filtros de búsqueda */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label fw-semibold">Fecha</label>
              <input
                type="date"
                className="form-control"
                min={obtenerFechaLocal()}
                value={fecha}
                onChange={(e) => {
                  setFecha(e.target.value);
                  setMesaSeleccionada(null);
                }}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">Horario (Turnos de 2h)</label>
              <select
                className="form-select"
                value={hora}
                onChange={(e) => {
                  setHora(e.target.value);
                  setMesaSeleccionada(null);
                }}
              >
                {horarios.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">Número de Personas</label>
              <select
                className="form-select"
                value={personas}
                onChange={(e) => {
                  setPersonas(Number(e.target.value));
                  setMesaSeleccionada(null);
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'persona' : 'personas'}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">Zona</label>
              <select
                className="form-select"
                value={zona}
                onChange={(e) => {
                  setZona(e.target.value);
                  setMesaSeleccionada(null);
                }}
              >
                <option value="Todas">Todas las zonas</option>
                <option value="Interior">Interior</option>
                <option value="Terraza">Terraza</option>
                <option value="Salón Privado">Salón Privado</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Mesas */}
      <h4 className="mb-3">Mesas Disponibles ({mesasDisponibles.length})</h4>
      {mesasDisponibles.length === 0 ? (
        <div className="alert alert-warning">
          No hay mesas disponibles con capacidad para {personas} personas en la zona seleccionada.
        </div>
      ) : (
        <div className="row g-3 mb-4">
          {mesasDisponibles.map((mesa) => {
            const ocupada = estaOcupada(mesa.id);
            const seleccionada = mesaSeleccionada?.id === mesa.id;

            return (
              <div key={mesa.id} className="col-md-4 col-lg-3">
                <div
                  className={`card h-100 shadow-sm ${
                    ocupada
                      ? 'border-danger bg-light text-muted'
                      : seleccionada
                      ? 'border-primary border-2'
                      : 'border-success'
                  }`}
                >
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title fw-bold mb-0">{mesa.nombre}</h5>
                        <span className={`badge ${ocupada ? 'bg-danger' : 'bg-success'}`}>
                          {ocupada ? 'Ocupada' : 'Libre'}
                        </span>
                      </div>
                      <p className="card-text mb-1">
                        <strong>Capacidad:</strong> Hasta {mesa.capacidad} personas
                      </p>
                      <p className="card-text text-secondary small mb-3">
                        <strong>Zona:</strong> {mesa.zona}
                      </p>
                    </div>

                    <button
                      type="button"
                      className={`btn w-100 ${
                        ocupada
                          ? 'btn-secondary'
                          : seleccionada
                          ? 'btn-primary'
                          : 'btn-outline-success'
                      }`}
                      disabled={ocupada}
                      onClick={() => setMesaSeleccionada(mesa)}
                    >
                      {ocupada ? 'No disponible' : seleccionada ? 'Mesa Seleccionada' : 'Seleccionar'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Formulario para confirmar reserva */}
      {mesaSeleccionada && (
        <div className="card shadow border-primary">
          <div className="card-header bg-primary text-white fw-bold">
            Completar Reserva · {mesaSeleccionada.nombre} ({fecha} - {hora})
          </div>
          <div className="card-body">
            <form onSubmit={confirmarReserva} className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Nombre Completo *</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={nombreCliente}
                  onChange={(e) => setNombreCliente(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Teléfono *</label>
                <input
                  type="tel"
                  className="form-control"
                  required
                  value={telefonoCliente}
                  onChange={(e) => setTelefonoCliente(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  value={correoCliente}
                  onChange={(e) => setCorreoCliente(e.target.value)}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Notas adicionales (alergias, ocasión especial)</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                ></textarea>
              </div>
              <div className="col-12 d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setMesaSeleccionada(null)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirmar Reserva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}