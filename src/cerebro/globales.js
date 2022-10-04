import { defineStore } from 'pinia';
import { extremosPorcentaje } from '../utilidades/procesador';
import { usarCerebroDatos } from './datos';

export const usarCerebroGlobales = defineStore('globales', {
  state: () => ({
    porcentajeMax: null,
    porcentajeMin: null,
    nivel: 'departamentos',
    año: 2005,
    lugarSeleccionado: null,
    etniaSeleccionada: null,
    mostrarCreditos: false,
  }),

  actions: {
    definirPorcentajes() {
      const cerebroDatos = usarCerebroDatos();
      const extremosP = extremosPorcentaje(cerebroDatos.datos, this.año);
      this.porcentajeMin = extremosP.porcentajeMin;
      this.porcentajeMax = extremosP.porcentajeMax;
    },

    async cambiarNivel(valor = this.nivel) {
      const cerebroDatos = usarCerebroDatos();
      this.nivel = valor;
      this.lugarSeleccionado = null;
      this.etniaSeleccionada = null;
      cerebroDatos.datosLugar = [];
      cerebroDatos.datosEtnia = [];
      await cerebroDatos.cargarGeojson();
      await cerebroDatos.cambiarIndicador(cerebroDatos.indice, true);
    },

    actualizarAño(nuevoAño) {
      if (nuevoAño === this.año) return;
      this.definirPorcentajes();
      this.año = nuevoAño;
    },

    cambiarLugar(nombre) {
      this.lugarSeleccionado = nombre;
    },
  },
});
