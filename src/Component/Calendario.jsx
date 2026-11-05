import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const CLAVE_FECHAS = 'fechasEspeciales';

function cargarFechas() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE_FECHAS) || '[]');
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

function guardarFechas(fechas) {
  localStorage.setItem(CLAVE_FECHAS, JSON.stringify(fechas));
}

function obtenerFechaLocal() {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}

export default function Calendario() {
  const ubicacion = useLocation();
  const esAdministrador = ubicacion.pathname === '/admin/calendario';

  const [fechaActual, setFechaActual] = useState(() => new Date());
  const [fechas, setFechas] = useState(cargarFechas);
  const [fecha, setFecha] = useState(obtenerFechaLocal);
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('especial');
  const [nota, setNota] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  const anio = fechaActual.getFullYear();
  const mes = fechaActual.getMonth();

  const nombresMeses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const cantidadDias = new Date(anio, mes + 1, 0).getDate();
  const primerDia = (new Date(anio, mes, 1).getDay() + 6) % 7;

  const diasCalendario = [
    ...Array(primerDia).fill(null),
    ...Array.from({ length: cantidadDias }, (_, i) => i + 1)
  ];

  while (diasCalendario.length % 7 !== 0) {
    diasCalendario.push(null);
  }

  const fechaDeDia = (dia) =>
    `${anio}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;

  const cambiarMes = (cantidad) => {
    setFechaActual(new Date(anio, mes + cantidad, 1));
  };

  function limpiarFormulario() {
    setTitulo('');
    setNota('');
    setTipo('especial');
    setFecha(obtenerFechaLocal());
    setEditandoId(null);
    setMensaje('');
  }

  function guardarFecha(evento) {
    evento.preventDefault();
    if (!esAdministrador) return;

    if (!fecha || !titulo.trim() || !nota.trim()) {
      setMensaje('Completa la fecha, el nombre y la nota.');
      return;
    }

    const registro = {
      id: editandoId || Date.now(),
      fecha,
      titulo: titulo.trim(),
      tipo,
      nota: nota.trim()
    };

    const nuevasFechas = editandoId
      ? fechas.map((item) => item.id === editandoId ? registro : item)
      : [...fechas, registro];

    guardarFechas(nuevasFechas);
    setFechas(nuevasFechas);

    setFechaActual(new Date(
      Number(fecha.slice(0, 4)),
      Number(fecha.slice(5, 7)) - 1,
      1
    ));

    limpiarFormulario();
    setMensaje('¡La fecha se guardó correctamente!');
  }

  function editarFecha(registro) {
    setFecha(registro.fecha);
    setTitulo(registro.titulo);
    setTipo(registro.tipo);
    setNota(registro.nota);
    setEditandoId(registro.id);
    setMensaje('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function eliminarFecha(id) {
    if (!esAdministrador) return;
    if (!window.confirm('¿Seguro que deseas eliminar esta fecha?')) return;

    const nuevasFechas = fechas.filter((item) => item.id !== id);
    guardarFechas(nuevasFechas);
    setFechas(nuevasFechas);

    if (editandoId === id) limpiarFormulario();
    setMensaje('La fecha se eliminó correctamente.');
  }

  const fechaAniversario = '2026-08-26';

  const fechasDelMes = fechas.filter((item) =>
    item.fecha.startsWith(`${anio}-${String(mes + 1).padStart(2, '0')}`)
  );

  const hoy = obtenerFechaLocal();

  function obtenerEvento(dia) {
    if (!dia) return null;
    const fechaBuscada = fechaDeDia(dia);

    return fechas.find((item) => item.fecha === fechaBuscada) ||
      (fechaBuscada === fechaAniversario
        ? {
            id: 'aniversario',
            fecha: fechaAniversario,
            titulo: 'Aniversario del restaurante',
            tipo: 'especial',
            nota: '¡Una fecha especial para celebrar con nosotros!'
          }
        : null);
  }

  function formatoFecha(fechaTexto) {
    const partes = fechaTexto.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  return (
    <div className="container py-4 py-md-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Calendario y Horarios</h2>
          <p className="text-muted mb-0">Consulta nuestros horarios de atención y programa fechas especiales o cierres.</p>
        </div>

        {esAdministrador && (
          <Link to="/admin" className="btn btn-outline-danger shadow-sm">
            ← Volver al panel
          </Link>
        )}
      </div>

      {esAdministrador && (
        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-header bg-dark text-white py-3 rounded-top-4">
            <h5 className="mb-0 fw-bold">
              {editandoId ? '✏️ Editar fecha del calendario' : '➕ Agregar fecha especial o cierre'}
            </h5>
          </div>

          <div className="card-body p-4">
            <form onSubmit={guardarFecha}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label fw-semibold text-muted">Fecha</label>
                  <input
                    type="date"
                    className="form-control"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold text-muted">Nombre del evento</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej. Fiestas Patrias / Navidad"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    maxLength={80}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold text-muted">Tipo de fecha</label>
                  <select
                    className="form-select"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                  >
                    <option value="especial">Día especial</option>
                    <option value="festivo">Día festivo</option>
                    <option value="noLaborable">Día no laborable (Cerrado)</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold text-muted">Nota o descripción</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="Ej. Celebraremos con música en vivo o cerramos por mantenimiento."
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                    maxLength={300}
                    required
                  />
                </div>

                <div className="col-12 d-flex flex-wrap gap-2 pt-2">
                  <button type="submit" className="btn btn-danger px-4 fw-bold shadow-sm">
                    {editandoId ? 'Guardar Cambios' : 'Registrar Fecha'}
                  </button>

                  {editandoId && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4"
                      onClick={limpiarFormulario}
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </form>

            {mensaje && (
              <div className="alert alert-info mt-3 mb-0 border-0 rounded-3 shadow-sm" role="status">
                {mensaje}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tarjeta de Horario General */}
      <div className="card border-0 shadow-sm rounded-4 mb-4 bg-white">
        <div className="card-body text-center p-4">
          <h5 className="fw-bold mb-2 text-dark">🕒 Horario de Atención Habitual</h5>
          <p className="text-secondary mb-1">De lunes a domingo</p>
          <h3 className="fw-bold text-danger mb-2">
            8:00 a. m. – 12:00 a. m.
          </h3>
          <p className="text-muted small mb-0">Atendemos hasta la medianoche, excepto los días marcados como cerrados en el calendario.</p>
        </div>
      </div>

      {/* Cuadrícula del Calendario Compacta y Estilizada */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm rounded-pill px-3"
              onClick={() => cambiarMes(-1)}
            >
              ‹ Mes anterior
            </button>

            <h4 className="fw-bold text-dark mb-0 text-capitalize">
              {nombresMeses[mes]} {anio}
            </h4>

            <button
              type="button"
              className="btn btn-outline-secondary btn-sm rounded-pill px-3"
              onClick={() => cambiarMes(1)}
            >
              Mes siguiente ›
            </button>
          </div>

          <div className="text-center mb-3">
            <button
              type="button"
              className="btn btn-sm btn-outline-danger rounded-pill px-3"
              onClick={() => setFechaActual(new Date())}
            >
              Ir a hoy
            </button>
          </div>

          {/* Días de la semana */}
          <div className="row g-1 mb-2 text-center">
            {diasSemana.map((dia) => (
              <div key={dia} className="col fw-bold text-muted small py-1">
                {dia}
              </div>
            ))}
          </div>

          {/* Celdas de los días en formato compacto */}
          <div className="row g-1">
            {diasCalendario.map((dia, indice) => {
              const fechaTexto = dia ? fechaDeDia(dia) : '';
              const evento = obtenerEvento(dia);
              const esHoy = fechaTexto === hoy;

              let estilosCelda = 'rounded-3 text-center p-2 d-flex flex-column align-items-center justify-content-center position-relative';
              let colorTexto = 'text-dark';

              if (!dia) {
                estilosCelda += ' bg-transparent border-0';
              } else {
                estilosCelda += ' bg-white border border-secondary-subtle shadow-xs';
                
                if (esHoy) {
                  estilosCelda += ' border-danger border-2';
                  colorTexto = 'text-danger fw-bold';
                }
              }

              return (
                <div key={`${anio}-${mes}-${indice}`} className="col" style={{ maxWidth: '14.28%' }}>
                  <div
                    className={estilosCelda}
                    style={{ height: '68px' }}
                    title={evento ? `${evento.titulo}: ${evento.nota}` : ''}
                  >
                    {dia && (
                      <>
                        <span className={`fs-6 fw-semibold ${colorTexto}`}>{dia}</span>

                        {/* Indicadores compactos según el tipo de evento */}
                        {evento ? (
                          <span
                            className={`badge mt-1 rounded-pill px-1 text-truncate w-100 ${
                              evento.tipo === 'noLaborable'
                                ? 'bg-danger text-white'
                                : evento.tipo === 'festivo'
                                  ? 'bg-warning text-dark'
                                  : 'bg-info text-dark'
                            }`}
                            style={{ fontSize: '0.55rem' }}
                          >
                            {evento.titulo}
                          </span>
                        ) : (
                          <span className="text-muted opacity-50 mt-1" style={{ fontSize: '0.55rem' }}>
                            {esHoy ? 'Hoy' : 'Abierto'}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Leyenda */}
          <div className="d-flex flex-wrap justify-content-center gap-4 mt-4 pt-3 border-top small text-secondary">
            <span><span className="badge bg-white text-dark border me-1">■</span>Abierto</span>
            <span><span className="badge bg-warning text-dark me-1">■</span>Festivo</span>
            <span><span className="badge bg-info text-dark me-1">■</span>Especial</span>
            <span><span className="badge bg-danger me-1">■</span>Cerrado</span>
          </div>
        </div>
      </div>

      {/* Listado de Eventos del Mes */}
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <h4 className="fw-bold mb-3">
            {esAdministrador ? 'Gestionar fechas de este mes' : 'Eventos y cierres programados'}
          </h4>

          {fechasDelMes.length === 0 ? (
            <p className="text-muted mb-0">
              No hay fechas especiales registradas para este mes.
            </p>
          ) : (
            <div className="list-group list-group-flush">
              {fechasDelMes
                .slice()
                .sort((a, b) => a.fecha.localeCompare(b.fecha))
                .map((evento) => (
                  <div key={evento.id} className="list-group-item py-3 px-0 border-bottom">
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                      <div>
                        <div className="fw-bold text-dark fs-6">{evento.titulo}</div>
                        <small className="text-danger fw-semibold">
                          📅 {formatoFecha(evento.fecha)} · {
                            evento.tipo === 'noLaborable'
                              ? '🔴 Día no laborable (Cerrado)'
                              : evento.tipo === 'festivo'
                                ? '🟡 Día festivo'
                                : '🔵 Día especial'
                          }
                        </small>
                        <p className="mb-0 mt-1 text-secondary small">{evento.nota}</p>
                      </div>

                      {esAdministrador && (
                        <div className="d-flex align-items-center gap-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary rounded-pill px-3"
                            onClick={() => editarFecha(evento)}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger rounded-pill px-3"
                            onClick={() => eliminarFecha(evento.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}