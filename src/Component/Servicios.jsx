import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const categorias = [
  'Todos',
  'Entradas',
  'Segundos',
  'Parrillas',
  'Postres',
  'Bebidas',
  'Vinos',
  'Especiales'
];

// Imagen por defecto general por si algún plato no tiene foto
const IMAGEN_DEFAULT = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80';

const productosBase = [
  {
    id: 1,
    nombre: 'Tres leches',
    categoria: 'Postres',
    precio: 12,
    descripcion: 'Bizcocho suave bañado en tres tipos de leche.',
    imagen: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 2,
    nombre: 'Cheesecake de fresa',
    categoria: 'Postres',
    precio: 14,
    descripcion: 'Pastel cremoso con una deliciosa cobertura de fresa.',
    imagen: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 3,
    nombre: 'Brownie con helado',
    categoria: 'Postres',
    precio: 15,
    descripcion: 'Brownie de chocolate servido con helado.',
    imagen: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 4,
    nombre: 'Lomo saltado',
    categoria: 'Segundos',
    precio: 28,
    descripcion: 'Lomo de res salteado con cebolla, tomate, papas y arroz.',
    imagen: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 5,
    nombre: 'Arroz con pollo',
    categoria: 'Segundos',
    precio: 22,
    descripcion: 'Arroz sazonado con culantro, acompañado de pollo.',
    imagen: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 6,
    nombre: 'Pasta a la boloñesa',
    categoria: 'Segundos',
    precio: 25,
    descripcion: 'Pasta con salsa de tomate y carne molida.',
    imagen: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 7,
    nombre: 'Pollo a la parrilla',
    categoria: 'Segundos',
    precio: 26,
    descripcion: 'Pollo a la parrilla con papas y ensalada fresca.',
    imagen: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 8,
    nombre: 'Limonada de la casa',
    categoria: 'Bebidas',
    precio: 8,
    descripcion: 'Limonada natural preparada al momento.',
    imagen: 'https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 9,
    nombre: 'Chicha morada',
    categoria: 'Bebidas',
    precio: 7,
    descripcion: 'Bebida tradicional peruana de maíz morado.',
    imagen: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 10,
    nombre: 'Vino tinto',
    categoria: 'Bebidas',
    precio: 45,
    descripcion: 'Botella de vino tinto para acompañar tus platos.',
    imagen: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 11,
    nombre: 'Vino blanco',
    categoria: 'Bebidas',
    precio: 48,
    descripcion: 'Vino blanco ideal para compartir durante la comida.',
    imagen: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 12,
    nombre: 'Maracuyá frozen',
    categoria: 'Bebidas',
    precio: 10,
    descripcion: 'Bebida helada de maracuyá, refrescante y tropical.',
    imagen: 'https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 13,
    nombre: 'Parrilla para compartir',
    categoria: 'Especiales',
    precio: 75,
    descripcion: 'Selección de carnes a la parrilla para compartir.',
    imagen: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 14,
    nombre: 'Cena romántica',
    categoria: 'Especiales',
    precio: 95,
    descripcion: 'Una experiencia especial para celebrar en pareja.',
    imagen: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 15,
    nombre: 'Banquete familiar',
    categoria: 'Especiales',
    precio: 120,
    descripcion: 'Una selección variada de platos para disfrutar en familia.',
    imagen: 'https://images.unsplash.com/photo-1515003197210-e0cd7184f8b5?auto=format&fit=crop&w=700&q=80'
  }
];

export default function Servicios() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [productosAdmin, setProductosAdmin] = useState([]);

  useEffect(() => {
    function cargarProductos() {
      try {
        const guardados = JSON.parse(
          localStorage.getItem('productosCarta') || '[]'
        );
        setProductosAdmin(Array.isArray(guardados) ? guardados : []);
      } catch {
        setProductosAdmin([]);
      }
    }

    cargarProductos();
    window.addEventListener('focus', cargarProductos);

    return () => {
      window.removeEventListener('focus', cargarProductos);
    };
  }, []);

  // Fusionamos los productos base con los datos actualizados del admin
  const productos = productosBase.map(base => {
    const actualizado = productosAdmin.find(
      producto =>
        producto.nombre.trim().toLowerCase() === base.nombre.toLowerCase()
    );

    if (!actualizado) return base;

    return {
      ...base,
      categoria: actualizado.categoria || base.categoria,
      precio: Number(actualizado.precio),
      descuento: Number(actualizado.descuento) || 0,
      motivoDescuento: actualizado.motivoDescuento || '',
      descripcion: actualizado.descripcion || base.descripcion,
      imagen: actualizado.imagen?.trim() ? actualizado.imagen : base.imagen
    };
  });

  // Agregamos los nuevos productos creados por el administrador
  const productosNuevos = productosAdmin
    .filter(producto =>
      !productosBase.some(
        base => base.nombre.toLowerCase() === producto.nombre.trim().toLowerCase()
      )
    )
    .map(producto => ({
      ...producto,
      descripcion: producto.descripcion || 'Consulta por este plato en nuestro restaurante.',
      imagen: producto.imagen?.trim() ? producto.imagen : IMAGEN_DEFAULT
    }));

  const todosLosProductos = [...productos, ...productosNuevos];

  const productosFiltrados = todosLosProductos.filter(producto =>
    categoriaActiva === 'Todos' || producto.categoria === categoriaActiva
  );

  function precioFinal(producto) {
    return Number(producto.precio) *
      (1 - (Number(producto.descuento) || 0) / 100);
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <p className="text-danger fw-bold text-uppercase">
          Sabores para disfrutar
        </p>

        <h1 className="display-4 fw-bold">Nuestra carta</h1>

        <p className="lead text-secondary">
          En Restaurante Las Delicias encontrarás platos,
          postres y bebidas para todos los gustos.
        </p>
      </div>

      <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
        {categorias.map(categoria => (
          <button
            key={categoria}
            type="button"
            className={
              categoriaActiva === categoria
                ? 'btn btn-danger'
                : 'btn btn-outline-danger'
            }
            onClick={() => setCategoriaActiva(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>

      <div className="row g-4">
        {productosFiltrados.map(producto => {
          const descuento = Number(producto.descuento) || 0;
          const tieneDescuento = descuento > 0;
          // Garantizamos que nunca se quede sin imagen
          const urlImagen = producto.imagen?.trim() ? producto.imagen : IMAGEN_DEFAULT;

          return (
            <div className="col-sm-6 col-lg-4" key={producto.id}>
              <div className="card h-100 border-0 shadow-sm overflow-hidden rounded-4">
                <div className="position-relative" style={{ height: '220px' }}>
                  <img
                    src={urlImagen}
                    className="card-img-top w-100 h-100 object-fit-cover"
                    alt={producto.nombre}
                    onError={(e) => {
                      // Si la imagen externa falla al cargar, coloca la imagen por defecto automáticamente
                      e.target.src = IMAGEN_DEFAULT;
                    }}
                  />

                  {tieneDescuento && (
                    <span
                      className="badge bg-dark bg-opacity-75 text-white border border-danger position-absolute top-0 start-0 m-3 p-2 px-3 rounded-pill shadow"
                      style={{ fontSize: '0.85rem' }}
                    >
                      🔥 -{descuento}% ({producto.motivoDescuento})
                    </span>
                  )}

                  <span className="badge bg-danger position-absolute bottom-0 end-0 m-3 px-3 py-1 rounded-pill shadow-sm">
                    {producto.categoria}
                  </span>
                </div>

                <div className="card-body d-flex flex-column p-4">
                  <h5 className="card-title fw-bold text-dark">
                    {producto.nombre}
                  </h5>

                  <p className="card-text text-secondary small mb-4">
                    {producto.descripcion}
                  </p>

                  <div className="mt-auto">
                    {tieneDescuento ? (
                      <div className="mb-3">
                        <span className="text-secondary text-decoration-line-through me-2 small">
                          S/ {Number(producto.precio).toFixed(2)}
                        </span>

                        <span className="fs-4 fw-bold text-danger">
                          S/ {precioFinal(producto).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <p className="fs-4 fw-bold text-dark mb-3">
                        S/ {Number(producto.precio).toFixed(2)}
                      </p>
                    )}

                    <Link
                      to="/reservas"
                      className="btn btn-outline-danger btn-sm rounded-pill w-150 fw-semibold"
                    >
                      Reservar mesa
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {productosFiltrados.length === 0 && (
          <div className="col-12 text-center py-5">
            <p className="text-secondary">
              No hay productos en esta categoría por el momento.
            </p>
          </div>
        )}
      </div>

      <div className="text-center bg-light rounded-4 p-4 mt-5">
        <h3 className="fw-bold">
          ¡Ven a disfrutar de nuestros sabores!
        </h3>

        <p className="text-secondary mb-0">
          Te esperamos de lunes a domingo,
          de 8:00 a. m. hasta la medianoche.
        </p>
      </div>
    </div>
  );
}