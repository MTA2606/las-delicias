import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const categorias = [
  'Entradas',
  'Segundos',
  'Parrillas',
  'Postres',
  'Bebidas',
  'Vinos',
  'Especiales'
];

const motivos = [
  'Por fiestas',
  'Por aniversario',
  'Promoción especial',
  'Otro'
];

// Función para asignar una imagen elegante según el plato o categoría de forma automática
function obtenerImagenPorDefecto(categoria, nombre = '') {
  const nombreMin = nombre.toLowerCase();
  const catMin = (categoria || '').toLowerCase();

  if (nombreMin.includes('vino') || catMin.includes('vinos')) {
    return 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=700&q=80';
  }
  if (nombreMin.includes('bebida') || nombreMin.includes('limonada') || nombreMin.includes('chicha') || catMin.includes('bebidas')) {
    return 'https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=700&q=80';
  }
  if (nombreMin.includes('postre') || nombreMin.includes('cheesecake') || nombreMin.includes('tres leches') || nombreMin.includes('brownie') || catMin.includes('postres')) {
    return 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=700&q=80';
  }
  if (nombreMin.includes('parrilla') || nombreMin.includes('carne') || catMin.includes('parrillas')) {
    return 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80';
  }
  if (catMin.includes('entradas')) {
    return 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=700&q=80';
  }
  return 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80';
}

const productosIniciales = [
  {
    id: 1,
    nombre: 'Parrilla familiar',
    categoria: 'Especiales',
    precio: 75,
    descuento: 20,
    motivoDescuento: 'Por aniversario',
    descripcion: 'Selección de carnes a la parrilla para compartir.',
    imagen: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 2,
    nombre: 'Lomo saltado',
    categoria: 'Segundos',
    precio: 25,
    descuento: 0,
    motivoDescuento: '',
    descripcion: 'Lomo de res salteado con cebolla, tomate, papas y arroz.',
    imagen: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 3,
    nombre: 'Cheesecake',
    categoria: 'Postres',
    precio: 12,
    descuento: 10,
    motivoDescuento: 'Por fiestas',
    descripcion: 'Pastel cremoso con una deliciosa cobertura de fresa.',
    imagen: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 4,
    nombre: 'Limonada',
    categoria: 'Bebidas',
    precio: 8,
    descuento: 0,
    motivoDescuento: '',
    descripcion: 'Limonada natural preparada al momento.',
    imagen: 'https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=700&q=80'
  }
];

export default function CartaAdmin() {
  const [productos, setProductos] = useState(() => {
    try {
      const guardados = localStorage.getItem('productosCarta');
      if (guardados) {
        const parsed = JSON.parse(guardados);
        return parsed.map((p, index) => ({
          ...p,
          id: p.id || Date.now() + index, // Garantiza que siempre exista un ID único
          imagen: p.imagen && p.imagen.trim() !== '' ? p.imagen : obtenerImagenPorDefecto(p.categoria, p.nombre),
          descripcion: p.descripcion || 'Delicioso plato del restaurante.'
        }));
      }
      return productosIniciales;
    } catch {
      return productosIniciales;
    }
  });

  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const [formulario, setFormulario] = useState({
    nombre: '',
    categoria: 'Segundos',
    precio: '',
    descuento: '0',
    motivoDescuento: '',
    descripcion: '',
    imagen: ''
  });

  useEffect(() => {
    localStorage.setItem('productosCarta', JSON.stringify(productos));
  }, [productos]);

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFormulario(actual => ({
      ...actual,
      [name]: value
    }));
  }

  function limpiarFormulario() {
    setFormulario({
      nombre: '',
      categoria: 'Segundos',
      precio: '',
      descuento: '0',
      motivoDescuento: '',
      descripcion: '',
      imagen: ''
    });
    setEditandoId(null);
  }

  function guardarProducto(evento) {
    evento.preventDefault();

    const nombre = formulario.nombre.trim();
    const precio = Number(formulario.precio);
    const descuento = Number(formulario.descuento);

    if (!nombre) {
      setMensaje('Escribe el nombre del producto.');
      return;
    }

    if (formulario.precio === '' || !Number.isFinite(precio) || precio <= 0) {
      setMensaje('El precio debe ser mayor que cero.');
      return;
    }

    if (descuento < 0 || descuento > 100) {
      setMensaje('El descuento debe estar entre 0 y 100 %.');
      return;
    }

    const duplicado = productos.some(producto =>
      producto.nombre.toLowerCase() === nombre.toLowerCase() &&
      producto.id !== editandoId
    );

    if (duplicado) {
      setMensaje('Ya existe un producto con ese nombre.');
      return;
    }

    const imagenFinal = formulario.imagen.trim() !== '' 
      ? formulario.imagen.trim() 
      : obtenerImagenPorDefecto(formulario.categoria, nombre);

    const producto = {
      id: editandoId ?? Date.now(),
      nombre,
      categoria: formulario.categoria,
      precio,
      descuento,
      motivoDescuento: descuento > 0 ? formulario.motivoDescuento : '',
      descripcion: formulario.descripcion.trim() || 'Delicioso plato preparado en el momento.',
      imagen: imagenFinal
    };

    if (editandoId !== null) {
      setProductos(actuales =>
        actuales.map(elemento =>
          elemento.id === editandoId ? producto : elemento
        )
      );
      setMensaje('¡Producto actualizado correctamente!');
    } else {
      setProductos(actuales => [...actuales, producto]);
      setMensaje('¡Producto agregado a la carta correctamente!');
    }

    limpiarFormulario();
  }

  function editarProducto(producto) {
    setFormulario({
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: String(producto.precio),
      descuento: String(producto.descuento ?? 0),
      motivoDescuento: producto.motivoDescuento || '',
      descripcion: producto.descripcion || '',
      imagen: '' 
    });

    setEditandoId(producto.id);
    setMensaje('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function eliminarProducto(id) {
    if (!window.confirm('¿Deseas eliminar este producto de la carta?')) return;

    setProductos(actuales =>
      actuales.filter(producto => producto.id !== id)
    );

    if (editandoId === id) limpiarFormulario();
    setMensaje('Producto eliminado correctamente.');
  }

  function calcularPrecioFinal(producto) {
    return producto.precio * (1 - (producto.descuento || 0) / 100);
  }

  const productosFiltrados = productos.filter(producto => {
    const texto = busqueda.toLowerCase().trim();
    const cumpleTexto = producto.nombre.toLowerCase().includes(texto) || producto.categoria.toLowerCase().includes(texto);
    const cumpleCategoria = categoriaFiltro === 'Todas' || producto.categoria === categoriaFiltro;
    return cumpleTexto && cumpleCategoria;
  });

  const totalProductos = productos.length;
  const totalEnPromocion = productos.filter(p => (p.descuento || 0) > 0).length;

  return (
    <div className="container py-4 py-md-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Administración de la Carta</h2>
          <p className="text-muted mb-0">Diseña, edita precios y gestiona las promociones del menú.</p>
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

      {/* Tarjetas de Estadísticas */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 bg-danger text-white p-3">
            <h6 className="text-uppercase small fw-bold opacity-75">Platos y Bebidas en la Carta</h6>
            <h3 className="fw-bold mb-0">{totalProductos} ítems</h3>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 bg-dark text-white p-3 border-start border-danger border-4">
            <h6 className="text-uppercase small fw-bold opacity-75 text-danger">Promociones Activas</h6>
            <h3 className="fw-bold mb-0 text-white">{totalEnPromocion} con descuento</h3>
          </div>
        </div>
      </div>

      {/* Formulario Moderno */}
      <div className="card shadow-sm border-0 rounded-4 mb-5">
        <div className="card-header bg-dark text-white py-3 rounded-top-4">
          <h5 className="mb-0 fw-bold">
            {editandoId !== null ? '✏️ Modificar Plato o Bebida' : '➕ Agregar Nuevo Plato o Bebida'}
          </h5>
        </div>

        <div className="card-body p-4">
          <form onSubmit={guardarProducto}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold text-muted">Nombre del plato o bebida</label>
                <input
                  name="nombre"
                  className="form-control"
                  value={formulario.nombre}
                  onChange={manejarCambio}
                  placeholder="Ej. Ceviche mixto"
                  maxLength={100}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-muted">Categoría</label>
                <select
                  name="categoria"
                  className="form-select"
                  value={formulario.categoria}
                  onChange={manejarCambio}
                >
                  {categorias.map(categoria => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-muted">Precio original (S/)</label>
                <input
                  type="number"
                  name="precio"
                  className="form-control"
                  value={formulario.precio}
                  onChange={manejarCambio}
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-muted">Descuento (%)</label>
                <input
                  type="number"
                  name="descuento"
                  className="form-control"
                  value={formulario.descuento}
                  onChange={manejarCambio}
                  min="0"
                  max="100"
                  step="1"
                  required
                />
              </div>

              {Number(formulario.descuento) > 0 && (
                <div className="col-md-6">
                  <label className="form-label fw-semibold text-muted">Motivo del descuento</label>
                  <select
                    name="motivoDescuento"
                    className="form-select"
                    value={formulario.motivoDescuento}
                    onChange={manejarCambio}
                    required
                  >
                    <option value="">Selecciona el motivo</option>
                    {motivos.map(motivo => (
                      <option key={motivo} value={motivo}>
                        {motivo}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="col-md-6">
                <label className="form-label fw-semibold text-muted">Enlace de imagen (URL)</label>
                <input
                  type="url"
                  name="imagen"
                  className="form-control"
                  value={formulario.imagen}
                  onChange={manejarCambio}
                  placeholder="Si lo dejas vacío, se asignará una foto acorde al plato automáticamente"
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold text-muted">Descripción breve</label>
                <textarea
                  name="descripcion"
                  className="form-control"
                  rows="2"
                  value={formulario.descripcion}
                  onChange={manejarCambio}
                  placeholder="Ej. Ingredientes frescos, servido con guarnición..."
                  maxLength={250}
                />
              </div>

              <div className="col-12">
                <div className="alert alert-light border mb-0 d-flex justify-content-between align-items-center">
                  <span>Previsualización del precio con descuento:</span>
                  <strong className="text-success fs-5">
                    S/{(
                      Math.max(0, Number(formulario.precio) || 0) *
                      (1 - Math.min(100, Math.max(0, Number(formulario.descuento) || 0)) / 100)
                    ).toFixed(2)}
                  </strong>
                </div>
              </div>

              <div className="col-12 d-flex flex-wrap gap-2 pt-2">
                <button type="submit" className="btn btn-danger px-4 fw-bold shadow-sm">
                  {editandoId !== null ? 'Guardar Cambios' : 'Agregar a la Carta'}
                </button>

                {editandoId !== null && (
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
        </div>
      </div>

      {/* Filtros y Buscador */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div className="d-flex flex-wrap gap-1">
          {['Todas', ...categorias].map(cat => (
            <button
              key={cat}
              className={`btn btn-sm rounded-pill px-3 ${categoriaFiltro === cat ? 'btn-danger' : 'btn-outline-secondary'}`}
              onClick={() => setCategoriaFiltro(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="search"
          className="form-control"
          style={{ maxWidth: '300px' }}
          placeholder="🔍 Buscar plato..."
          value={busqueda}
          onChange={evento => setBusqueda(evento.target.value)}
        />
      </div>

      {/* Grid de Tarjetas Visuales con Claves Únicas Garantizadas */}
      <div className="row g-4">
        {productosFiltrados.map((producto, index) => {
          const tieneDescuento = (producto.descuento || 0) > 0;
          const precioFinal = calcularPrecioFinal(producto);
          const urlImagen = producto.imagen && producto.imagen.trim() !== '' 
            ? producto.imagen 
            : obtenerImagenPorDefecto(producto.categoria, producto.nombre);

          return (
            <div className="col-12 col-sm-6 col-lg-4" key={producto.id || `producto-${index}`}>
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
                <div className="position-relative" style={{ height: '180px' }}>
                  <img
                    src={urlImagen}
                    alt={producto.nombre}
                    className="w-100 h-100 object-fit-cover"
                    onError={(e) => {
                      e.target.src = obtenerImagenPorDefecto(producto.categoria, producto.nombre);
                    }}
                  />
                  {tieneDescuento && (
                    <span className="badge bg-dark bg-opacity-75 text-white border border-danger position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill shadow">
                      🔥 -{producto.descuento}% ({producto.motivoDescuento})
                    </span>
                  )}
                  <span className="badge bg-danger position-absolute bottom-0 end-0 m-3 px-3 py-1 rounded-pill shadow-sm">
                    {producto.categoria}
                  </span>
                </div>

                <div className="card-body p-4 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="fw-bold mb-1 text-dark">{producto.nombre}</h5>
                    <p className="text-muted small mb-3">{producto.descripcion}</p>
                  </div>

                  <div>
                    <div className="d-flex align-items-center gap-2 mb-3">
                      {tieneDescuento ? (
                        <>
                          <span className="text-muted text-decoration-line-through small">
                            S/ {Number(producto.precio).toFixed(2)}
                          </span>
                          <span className="fs-5 fw-bold text-danger">
                            S/ {precioFinal.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="fs-5 fw-bold text-dark">
                          S/ {Number(producto.precio).toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="d-flex gap-2 pt-2 border-top">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm rounded-pill w-50 fw-semibold"
                        onClick={() => editarProducto(producto)}
                      >
                        ✏️ Editar
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm rounded-pill w-50 fw-semibold"
                        onClick={() => eliminarProducto(producto.id)}
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {productosFiltrados.length === 0 && (
          <div className="col-12 text-center py-5 text-muted">
            <p className="fs-5">No se encontraron platos que coincidan con la búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}