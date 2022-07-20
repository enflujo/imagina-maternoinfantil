import { defineStore } from 'pinia';

export const usarIndicador = defineStore('indicador', {
  state: () => ({
    nombre: '',
    indice: 0,
    cargandoDatos: false,
  }),

  getters: {
    indiceActual: (estado) => estado.indice,
    estaCargando: (estado) => estado.cargandoDatos,
  },

  actions: {
    /**
     * Cambiar el indicador
     *
     * @param {number} indiceIndicador Indice del indicador en tabla "fuentes"
     */
    cambiar(indiceIndicador) {
      console.log(indiceIndicador);
      this.indice = indiceIndicador;
      this.cargandoDatos = true;
    },
  },
});
