import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MesasIniciales = [
  { id: 1, nombre: 'Mesa 1 (Ventana)', capacidad: 2, estado: 'activo' },
  { id: 2, nombre: 'Mesa 2 (Centro)', capacidad: 4, estado: 'activo' },
  { id: 3, nombre: 'Mesa 3 (Terraza)', capacidad: 6, estado: 'inactivo' } // Ejemplo de una mesa inhabilitada (ej. dañada)
];

export default function MesasAdmin() {
  const [mesas, setMesas] = useState(() => {
    try {
      const guardadas = localStorage.getItem('mesasRestaurante');
      if (guardadas) {
        const parsed = JSON.parse(guardadas);
        // Asegurarnos de que todas tengan la propiedad 'estado'
        return parsed.map(m => ({ ...m, estado: m.estado || 'activo' }));
      }
      return MesasIniciales;
    } catch {
      return MesasIniciales;
    }
  });

  const [nombre, setNombre] = useState('');
  const [capacidad, setCapacidad] = useState('2');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    localStorage.setItem('mesasRestaurante', JSON.stringify(mesas));
  }, [mesas]);

  function agregarMesa(e) {
    e.preventDefault();
    if (!nombre.trim()) return;
    
    const nuevaMesa = {
      id: Date.now(),
      nombre: nombre.trim(),
      capacidad: Number(capacidad),
      estado: 'activo' // Por defecto se crea activa
    };

    setMesas([...mesas, nuevaMesa]);
    setNombre('');
    setCapacidad('2');
    setMensaje('Mesa agregada correctamente.');
  }

  // Alternar entre activo e inactivo (ej. si está dañada o en reparación)
  function alternarEstadoMesa(id) {
    setMesas(mesas.map(mesa => {
      if (mesa.id === id) {
        const nuevoEstado = mesa.estado === 'activo' ? 'inactivo' : 'activo';
        return { ...mesa, estado: nuevoEstado };
      }
      return mesa;
    }));
    setMensaje('Estado de la mesa actualizado.');
  }

  function eliminarMesa(id) {
    if (window.confirm('¿Seguro que deseas eliminar permanentemente esta mesa?')) {
      setMesas(mesas.filter(m => m.id !== id));
      setMensaje('Mesa eliminada.');
    }
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Administrar Mesas</h2>
          <p className="text-muted mb-0">Habilita, inhabilita por daños o agrega nuevas mesas.</p>
        </div>
        <Link to="/admin" className="btn btn-outline-danger">Volver al panel</Link>
      </div>

      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      <div className="card shadow-sm mb-5 border-0 rounded-4">
        <div className="card-header bg-danger text-white rounded-top-4 py-3">
          <h5 className="mb-0 fw-bold">Agregar nueva mesa</h5>
        </div>
        <div className="card-body p-4">
          <form onSubmit={agregarMesa} className="row g-3 align-items-end">
            <div className="col-12 col-md-6">
              <label className="form-label text-muted">Nombre o Ubicación</label>
              <input type="text" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ej. Mesa 5 (VIP)" required />
            </div>
            <div className="col-12 col-md-4">
              <label className="form-label text-muted">Capacidad (Personas)</label>
              <input type="number" className="form-control" min="1" value={capacidad} onChange={e => setCapacidad(e.target.value)} required />
            </div>
            <div className="col-12 col-md-2">
              <button type="submit" className="btn btn-danger w-100 fw-bold">Agregar</button>
            </div>
          </form>
        </div>
      </div>

      <h4 className="fw-bold mb-3">Mesas Registradas ({mesas.length})</h4>
      <div className="row g-4">
        {mesas.map(mesa => {
          const estaInactiva = mesa.estado === 'inactivo';

          return (
            <div key={mesa.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className={`card h-100 shadow-sm border-0 rounded-4 text-center p-3 ${estaInactiva ? 'bg-light opacity-75 border border-secondary' : ''}`}>
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <i className={`bi bi-shop mb-2 ${estaInactiva ? 'text-secondary' : 'text-danger'}`} style={{ fontSize: '2.5rem' }}></i>
                    <h5 className="card-title fw-bold text-dark">{mesa.nombre}</h5>
                    <p className="card-text text-muted mb-2">Capacidad: {mesa.capacidad} pers.</p>
                    
                    <div className="mb-3">
                      {estaInactiva ? (
                        <span className="badge bg-secondary px-3 py-1 rounded-pill">Inhabilitada (Dañada / Mantenimiento)</span>
                      ) : (
                        <span className="badge bg-success px-3 py-1 rounded-pill">Activa / Disponible</span>
                      )}
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    {/* Botón para Inhabilitar / Activar */}
                    <button 
                      onClick={() => alternarEstadoMesa(mesa.id)} 
                      className={`btn btn-sm rounded-pill fw-semibold ${estaInactiva ? 'btn-outline-success' : 'btn-outline-warning text-dark'}`}
                    >
                      {estaInactiva ? 'Activar mesa' : 'Inhabilitar (Dañada)'}
                    </button>

                    {/* Botón para eliminar definitivamente si ya no existe */}
                    <button onClick={() => eliminarMesa(mesa.id)} className="btn btn-outline-danger btn-sm rounded-pill">
                      Eliminar permanentemente
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}