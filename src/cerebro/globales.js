import { defineStore } from 'pinia';
import { usarCerebroDatos } from './datos';

export const usarCerebroGlobales = defineStore('globales', {
  state: () => ({
    nivel: 'departamentos',
    año: 2005,
    lugarSeleccionado: null,
    etniaSeleccionada: null,
    mostrarCreditos: false,
    mostrarPandemia: false,
  }),

  actions: {
    async cambiarNivel(valor = this.nivel) {
      const cerebroDatos = usarCerebroDatos();
      this.nivel = valor;
      this.lugarSeleccionado = null;
      this.etniaSeleccionada = null;
      cerebroDatos.datosLugar = [];
      cerebroDatos.datosEtnia = [];
      cerebroDatos.datosNacionalesEtniaSeleccionada = [];
      cerebroDatos.datosDepartamentoEtniaSeleccionada = [];
      await cerebroDatos.cargarGeojson();
      await cerebroDatos.cambiarIndicador(cerebroDatos.indice, true);
    },

    actualizarAño(nuevoAño) {
      if (nuevoAño === this.año) return;
      this.año = nuevoAño;
    },

    actualizarEtnia(nuevaEtnia) {
      const cerebroDatos = usarCerebroDatos();
      if (nuevaEtnia == this.etniaSeleccionada) return;
      this.etniaSeleccionada = nuevaEtnia;

      if (nuevaEtnia.codigo !== 0) {
        cerebroDatos.actualizarDatosEtnia();
      }
    },
  },
});
