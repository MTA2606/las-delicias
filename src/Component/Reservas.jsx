import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
  '08:00', '10:00', '12:00', '14:00',
  '16:00', '18:00', '20:00', '22:00'
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
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    setMesas(cargarMesas());
    setReservas(cargarReservas());
  }, [location]);

  const estaOcupada = (mesaId) => {
    return reservas.some(
      (r) =>
        Number(r.mesaId) === Number(mesaId) &&
        r.fecha === fecha &&
        r.hora === hora &&
        r.estado !== 'cancelada'
    );
  };

  const mesasDisponibles = mesas.filter((mesa) => {
    const activa = (mesa.estado || 'activo') === 'activo';
    const coincideCapacidad = Number(mesa.capacidad) >= Number(personas);
    const coincideZona = zona === 'Todas' || mesa.zona === zona;
    return activa && coincideCapacidad && coincideZona;
  });

  const cambiarHora = (nuevaHora) => {
    setHora(nuevaHora);
    setMesaSeleccionada(null);
  };

  const cambiarFecha = (nuevaFecha) => {
    setFecha(nuevaFecha);
    setMesaSeleccionada(null);
  };

  const cambiarPersonas = (nuevasPersonas) => {
    setPersonas(nuevasPersonas);
    setMesaSeleccionada(null);
  };

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
      estado: 'confirmada',
    };

    const nuevasReservas = [...reservas, nuevaReserva];
    setReservas(nuevasReservas);
    localStorage.setItem('reservas', JSON.stringify(nuevasReservas));

    setMensajeExito(`¡Reserva confirmada en ${mesaSeleccionada.nombre} para ${personas} personas el ${fecha} a las ${hora}!`);
    setMesaSeleccionada(null);
    setNombreCliente('');
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: '#212529' }}>Reserva tu Mesa</h2>
          <p className="text-muted small mb-0">Elige tu fecha, horario y selecciona tu mesa favorita en el mapa.</p>
        </div>
        <Link to="/" className="btn btn-outline-secondary btn-sm">Volver al Inicio</Link>
      </div>

      {mensajeExito && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {mensajeExito}
          <button type="button" className="btn-close" onClick={() => setMensajeExito('')}></button>
        </div>
      )}

      <div className="row g-4">
        {/* Columna Izquierda: Datos y Horario (Estilo de la imagen de referencia) */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-header text-white fw-bold py-3" style={{ backgroundColor: '#dc3545' }}>
              1. Tus Datos y Horario
            </div>
            <div className="card-body">
              <form onSubmit={confirmarReserva}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-muted">Nombre completo *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={nombreCliente}
                    onChange={(e) => setNombreCliente(e.target.value)}
                    placeholder="Ingrese su nombre"
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-7">
                    <label className="form-label small fw-semibold text-muted">Fecha *</label>
                    <input
                      type="date"
                      className="form-control"
                      required
                      min={obtenerFechaLocal()}
                      value={fecha}
                      onChange={(e) => cambiarFecha(e.target.value)}
                    />
                  </div>
                  <div className="col-5">
                    <label className="form-label small fw-semibold text-muted">Personas *</label>
                    <select
                      className="form-select"
                      required
                      value={personas}
                      onChange={(e) => cambiarPersonas(Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={`pers-${num}`} value={num}>
                          {num} {num === 1 ? 'persona' : 'personas'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-muted">Horario disponible *</label>
                  <div className="row g-2">
                    {horarios.map((h) => {
                      const esSeleccionado = hora === h;
                      return (
                        <div className="col-6" key={`horario-${h}`}>
                          <button
                            type="button"
                            className="btn w-100 btn-sm py-2"
                            style={{
                              backgroundColor: esSeleccionado ? '#dc3545' : '#fff',
                              color: esSeleccionado ? '#fff' : '#dc3545',
                              border: '1px solid #dc3545',
                              fontWeight: esSeleccionado ? 'bold' : 'normal'
                            }}
                            onClick={() => cambiarHora(h)}
                          >
                            {h}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {mesaSeleccionada && (
                  <button type="submit" className="btn w-100 mt-3 fw-bold text-white" style={{ backgroundColor: '#dc3545' }}>
                    Confirmar Reserva ({mesaSeleccionada.nombre})
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Selección de Mesa (Estilo limpio e idéntico al diseño de referencia) */}
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header text-white fw-bold py-3 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#212529' }}>
              <span>2. Escoge tu Mesa</span>
              <div className="d-flex gap-2 small">
                <span className="badge" style={{ backgroundColor: '#198754' }}>Libre</span>
                <span className="badge" style={{ backgroundColor: '#dc3545' }}>Elegida</span>
                <span className="badge" style={{ backgroundColor: '#6c757d' }}>Ocupada / Inhabilitada</span>
              </div>
            </div>
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted small">Mesas aptas para {personas} personas</span>
                  <select
                    className="form-select form-select-sm w-auto"
                    value={zona}
                    onChange={(e) => setZona(e.target.value)}
                  >
                    <option value="Todas">Todas las zonas</option>
                    <option value="Interior">Interior</option>
                    <option value="Terraza">Terraza</option>
                    <option value="Salón Privado">Salón Privado</option>
                  </select>
                </div>

                {mesasDisponibles.length === 0 ? (
                  <div className="text-center py-5 text-muted">
                    <p className="mb-1">No hay mesas disponibles con capacidad para {personas} personas.</p>
                    <small>Prueba seleccionando menos personas o cambiando de zona/horario.</small>
                  </div>
                ) : (
                  <div className="row g-2" style={{ maxHeight: '420px', overflowY: 'auto' }}>
                    {mesasDisponibles.map((mesa) => {
                      const ocupada = estaOcupada(mesa.id);
                      const seleccionada = mesaSeleccionada?.id === mesa.id;

                      let estilosTarjeta = { backgroundColor: '#f8f9fa', color: '#212529', border: '1px solid #dee2e6' };
                      if (ocupada) estilosTarjeta = { backgroundColor: '#6c757d', color: '#fff', opacity: '0.6', border: 'none' };
                      if (seleccionada) estilosTarjeta = { backgroundColor: '#dc3545', color: '#fff', border: '1px solid #dc3545' };

                      return (
                        <div className="col-6 col-md-4" key={`mesa-item-${mesa.id}`}>
                          <div
                            onClick={() => !ocupada && setMesaSeleccionada(mesa)}
                            className="p-2 rounded transition-all shadow-sm"
                            style={{ cursor: ocupada ? 'not-allowed' : 'pointer', minHeight: '75px', ...estilosTarjeta }}
                          >
                            <div className="fw-bold small">{mesa.nombre}</div>
                            <div className="small opacity-75" style={{ fontSize: '11px' }}>Cap: {mesa.capacidad} | {mesa.zona}</div>
                            <div className="badge mt-1 font-monospace" style={{ fontSize: '9px', backgroundColor: ocupada ? '#495057' : seleccionada ? '#a71d2a' : '#198754' }}>
                              {ocupada ? 'Ocupada' : seleccionada ? 'Seleccionada' : 'Libre'}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {!mesaSeleccionada ? (
                <div className="text-center py-3 mt-3 rounded text-white fw-bold" style={{ backgroundColor: '#f8d7da', color: '#842029 !important', border: '1px solid #f5c2c7' }}>
                  <span style={{ color: '#842029' }}>Selecciona una mesa para confirmar</span>
                </div>
              ) : (
                <div className="alert alert-danger mt-3 mb-0 py-2 text-center small fw-bold">
                  Mesa seleccionada: {mesaSeleccionada.nombre} (Capacidad: {mesaSeleccionada.capacidad})
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}