

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function calcularEdad(fechaNacimiento) {
  const nacimiento = new Date(`${fechaNacimiento}T00:00:00`);
  const hoy = new Date();

  let edad = hoy.getFullYear() - nacimiento.getFullYear();

  const aunNoCumple =
    hoy.getMonth() < nacimiento.getMonth() ||
    (hoy.getMonth() === nacimiento.getMonth() &&
      hoy.getDate() < nacimiento.getDate());

  if (aunNoCumple) {
    edad--;
  }

  return edad;
}

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('danger');

  const navegar = useNavigate();

  function registrarCliente(e) {
    e.preventDefault();
    setMensaje('');

    if (calcularEdad(fechaNacimiento) < 18) {
      setMensaje('Debes tener 18 años o más para registrarte.');
      setTipoMensaje('danger');
      return;
    }

    if (contrasena.length < 8) {
      setMensaje('La contraseña debe tener al menos 8 caracteres.');
      setTipoMensaje('danger');
      return;
    }

    if (contrasena !== confirmacion) {
      setMensaje('Las contraseñas no coinciden.');
      setTipoMensaje('danger');
      return;
    }

    const correoNormalizado = correo.trim().toLowerCase();

    // El registro público solamente crea cuentas de cliente.
    const usuarios = JSON.parse(
      localStorage.getItem('usuariosPrueba') || '[]'
    );

    const yaExiste = usuarios.some(
      (usuario) => usuario.correo === correoNormalizado
    );

    if (
      correoNormalizado === 'admin@lasdelicias.test' ||
      yaExiste
    ) {
      setMensaje('Ya existe una cuenta con ese correo.');
      setTipoMensaje('danger');
      return;
    }

    const nuevoCliente = {
      nombre: nombre.trim(),
      fechaNacimiento,
      correo: correoNormalizado,
      contrasena,
      rol: 'cliente'
    };

    usuarios.push(nuevoCliente);

    localStorage.setItem(
      'usuariosPrueba',
      JSON.stringify(usuarios)
    );

    setMensaje('¡Registro completado! Ahora puedes iniciar sesión.');
    setTipoMensaje('success');

    setTimeout(() => navegar('/login'), 1200);
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h2 className="fw-bold text-center">
                Crear cuenta
              </h2>

              <p className="text-secondary text-center mb-4">
                Regístrate en Restaurante Las Delicias
              </p>

              <form onSubmit={registrarCliente}>
                <div className="mb-3">
                  <label className="form-label">
                    Nombres y apellidos
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Fecha de nacimiento
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={fechaNacimiento}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={(e) =>
                      setFechaNacimiento(e.target.value)
                    }
                    required
                  />
                  <div className="form-text">
                    Debes tener 18 años o más para registrarte.
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    minLength={8}
                    required
                  />
                  <div className="form-text">
                    Utiliza al menos 8 caracteres.
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Confirmar contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={confirmacion}
                    onChange={(e) =>
                      setConfirmacion(e.target.value)
                    }
                    minLength={8}
                    required
                  />
                </div>

                {mensaje && (
                  <div
                    className={`alert alert-${tipoMensaje}`}
                    role="alert"
                  >
                    {mensaje}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-danger w-100"
                >
                  Registrarme
                </button>
              </form>

              <p className="text-center mt-4 mb-0">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login">Iniciar sesión</Link>
              </p>

              <div className="alert alert-warning small mt-4 mb-0">
                Versión de prueba: los datos se guardan en este
                navegador y no deben utilizarse con información real.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
