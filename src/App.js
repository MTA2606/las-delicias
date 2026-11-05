import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';

// Componentes públicos
import Navegacion from './Component/Navegacion';
import Inicio from './Component/Inicio';
import Nosotros from './Component/Nosotros';
import Servicios from './Component/Servicios';
import Contacto from './Component/Contacto';
import Reservas from './Component/Reservas';
import Calendario from './Component/Calendario';

// Componentes de administración
import MesasAdmin from './Admin/MesasAdmin';
import Login from './Admin/Login';
import Registro from './Admin/Registro';
import PanelAdmin from './Admin/PanelAdmin';
import MenuAdmin from './Admin/MenuAdmin';
import CartaAdmin from './Admin/CartaAdmin';
import ContactosAdmin from './Admin/ContactosAdmin';

// Obtener la sesión guardada
function obtenerSesion() {
  try {
    return JSON.parse(
      localStorage.getItem('sesionPrueba')
    );
  } catch {
    return null;
  }
}

// Proteger las rutas del administrador
function ProtegerAdministrador() {
  const sesion = obtenerSesion();

  if (sesion?.rol !== 'administrador') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

// Proteger las rutas que requieren iniciar sesión
function ProtegerCliente() {
  const sesion = obtenerSesion();

  if (!sesion) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

// Mostrar las páginas del restaurante
function EstructuraPublica() {
  const ubicacion = useLocation();

  const dentroDeAdmin =
    ubicacion.pathname.startsWith('/admin');

  return (
    <>
      {!dentroDeAdmin && <Navegacion />}

      <Routes>
        {/* Páginas públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/calendario" element={<Calendario />} />

        {/* Inicio de sesión y registro */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Reservas del cliente */}
        <Route element={<ProtegerCliente />}>
          <Route
            path="/reservas"
            element={<Reservas />}
          />
        </Route>

        {/* Rutas protegidas del administrador */}
        <Route element={<ProtegerAdministrador />}>
          <Route path="/admin" element={<MenuAdmin />}>
            {/* Panel principal */}
            <Route
              index
              element={<PanelAdmin />}
            />

            {/* Administración de la carta */}
            <Route
              path="carta"
              element={<CartaAdmin />}
            />

            {/* Administración de contactos */}
            <Route
              path="contactos"
              element={<ContactosAdmin />}
            />

            {/* Calendario del administrador */}
            <Route
              path="calendario"
              element={<Calendario />}
            />

            {/* Reservas del administrador */}
            <Route
              path="reservas"
              element={<Reservas />}
            />

            {/* Administración de mesas */}
            <Route
              path="mesas"
              element={<MesasAdmin />}
            />

            {/* Administración de páginas */}
            <Route
              path="paginas"
              element={
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h3>Administración de páginas</h3>
                    <p>
                      Aquí podrás organizar las páginas
                      del restaurante.
                    </p>
                  </div>
                </div>
              }
            />

            {/* Clientes */}
            <Route
              path="clientes"
              element={
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h3>Clientes</h3>
                    <p>
                      Aquí podrás administrar los clientes
                      cuando conectemos sus datos.
                    </p>
                  </div>
                </div>
              }
            />

            {/* Vista del restaurante como cliente */}
            <Route
              path="cliente"
              element={<Inicio />}
            />

            <Route
              path="cliente/nosotros"
              element={<Nosotros />}
            />

            <Route
              path="cliente/carta"
              element={<Servicios />}
            />

            <Route
              path="cliente/calendario"
              element={<Calendario />}
            />

            <Route
              path="cliente/contacto"
              element={<Contacto />}
            />

            <Route
              path="cliente/reservas"
              element={<Reservas />}
            />
          </Route>
        </Route>

        {/* Página no encontrada */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}

// Aplicación principal
export default function App() {
  return (
    <BrowserRouter>
      <EstructuraPublica />
    </BrowserRouter>
  );
}