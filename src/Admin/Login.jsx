
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');

  const navegar = useNavigate();

  function iniciarSesion(e) {
    e.preventDefault();
    setMensaje('');

    const correoNormalizado = correo.trim().toLowerCase();

    // Cuenta administrativa fija para las pruebas.
    if (
      correoNormalizado === 'admin@lasdelicias.test' &&
      contrasena === 'AdminPrueba123!'
    ) {
      localStorage.setItem(
        'sesionPrueba',
        JSON.stringify({
          correo: correoNormalizado,
          nombre: 'Administrador',
          rol: 'administrador'
        })
      );

      navegar('/admin');
      return;
    }

    // Buscar cuentas de clientes registradas en este navegador.
    const usuarios = JSON.parse(
      localStorage.getItem('usuariosPrueba') || '[]'
    );

    const cliente = usuarios.find(
      (usuario) =>
        usuario.correo === correoNormalizado &&
        usuario.contrasena === contrasena
    );

    if (cliente) {
      localStorage.setItem(
        'sesionPrueba',
        JSON.stringify({
          correo: cliente.correo,
          nombre: cliente.nombre,
          rol: 'cliente'
        })
      );

      navegar('/');
      return;
    }

    setMensaje('Correo o contraseña incorrectos.');
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-7 col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold">Iniciar sesión</h2>
                <p className="text-secondary">
                  Restaurante Las Delicias
                </p>
              </div>

              <form onSubmit={iniciarSesion}>
                <div className="mb-3">
                  <label className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="Ingresa tu correo"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    value={contrasena}
                    onChange={(e) =>
                      setContrasena(e.target.value)
                    }
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                </div>

                {mensaje && (
                  <div className="alert alert-danger" role="alert">
                    {mensaje}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-danger w-100"
                >
                  Ingresar
                </button>
              </form>

              <hr />

              <p className="text-center mb-0">
                ¿No tienes una cuenta?{' '}
                <Link to="/registro">Registrarme</Link>
              </p>

              <div className="alert alert-warning small mt-4 mb-0">
                Versión de prueba. No uses contraseñas reales.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
