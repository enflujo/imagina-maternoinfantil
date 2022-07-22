import { defineStore } from 'pinia';
import fuentes from '../utilidades/fuentes';
import { usarCerebroGlobales } from './globales';
import { rutaBase } from '../utilidades/constantes';
import { departamentos, municipios } from '../utilidades/lugaresDeColombia';

export const usarCerebroDatos = defineStore('datos', {
  state: () => ({
    nombre: '',
    indice: 0,
    cargandoDatos: false,
    datos: [],
    datosLugar: [],
    _cache: {
      departamentos: null,
      municipios: null,
    },
    geojsonLugar: [],
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
    async cambiarIndicador(indiceIndicador = this.indice, forzar) {
      this.cargandoDatos = true;

      if (forzar || this.indice !== indiceIndicador) {
        const cerebroGlobales = usarCerebroGlobales();
        const { nombreArchivo } = fuentes[indiceIndicador];
        const respuesta = await fetch(`${rutaBase}/mi_v2/${nombreArchivo}-${cerebroGlobales.nivel}.json`);

        const datosIndicador = await respuesta.json();
        this.datos = datosIndicador;

        if (cerebroGlobales.lugarSeleccionado) {
          const dLugar = datosIndicador.find((obj) => obj.codigo === cerebroGlobales.lugarSeleccionado.codigo);

          if (dLugar) this.actualizarDatosLugar(dLugar);
        }

        this.indice = indiceIndicador;

        cerebroGlobales.definirPorcentajes();
      }

      this.cargandoDatos = false;
    },

    async cargarGeojson() {
      const cerebroGlobales = usarCerebroGlobales();
      const cache = this._cache[cerebroGlobales.nivel];

      /**
       * Si ya se descargaron los datos, no volveros a pedir al servidor
       */
      if (cache) {
        this.geojsonLugar = cache;
      } else {
        this.cargandoDatos = true;
        /**
         * Cargar los datos desde el servidor si aún no se han cargado
         */
        const respuesta = await fetch(`${rutaBase}/${cerebroGlobales.nivel}.json`);
        const geojson = await respuesta.json();

        /**
         * Cambiar los nombres de los lugares para que tengan tildes y mayúsculas
         */
        let infoLugares;
        let llaveCodigo = 0;

        if (cerebroGlobales.nivel === 'departamentos') {
          infoLugares = departamentos.datos;
        } else {
          infoLugares = municipios.datos;
          llaveCodigo = 3;
        }

        geojson.features = geojson.features.map((lugar) => {
          const infoLugar = infoLugares.find((d) => d[llaveCodigo] === lugar.properties.codigo);

          // Reemplazar el nombre actual (Sin tildes y todo en mayúsculas) por el que está bien escrito.
          if (infoLugar) {
            lugar.properties.nombre = infoLugar[1];
          }

          return lugar;
        });

        // Guardar datos procesados en el cache.
        this._cache[cerebroGlobales.nivel] = geojson;
        this.geojsonLugar = geojson;

        this.cargandoDatos = false;
      }
    },

    actualizarDatosLugar(datos) {
      const cerebroGlobales = usarCerebroGlobales();
      cerebroGlobales.lugarSeleccionado = {
        codigo: datos.codigo,
        nombre: datos.nombre || cerebroGlobales.lugarSeleccionado.nombre,
      };

      this.datosLugar = Object.keys(datos.datos).map((anno) => {
        const [numerador, denominador, porcentaje] = datos.datos[anno];

        return {
          anno: anno,
          numerador,
          denominador,
          porcentaje,
        };
      });
      // this.datosLugar = datos;
    },
  },
});
