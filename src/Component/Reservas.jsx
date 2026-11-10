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

// Horarios en formato de 12 horas. Cada turno dura dos horas.
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
    // Cambiamos la clave a 'mesasRestaurante_v2' para forzar la carga limpia de las 20 mesas
    const CLAVE_STORAGE = 'mesasRestaurante_v2';
    const datos = JSON.parse(localStorage.getItem(CLAVE_STORAGE) || '[]');

    if (Array.isArray(datos) && datos.length > 0) {
      const mesasGuardadas = new Map(datos.map((mesa) => [Number(mesa.id), mesa]));
      
      const mesasActualizadas = MesasIniciales.map((mesa) => {
        const guardada = mesasGuardadas.get(mesa.id);
        return guardada
          ? { 
              ...guardada, 
              ...mesa, // Asegura que la capacidad y nombre de MesasIniciales siempre se actualicen
              estado: guardada.estado || 'activo' 
            }
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