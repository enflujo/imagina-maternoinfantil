import { defineStore } from 'pinia';
import fuentes from '../utilidades/fuentes';
import { usarCerebroGlobales } from './globales';
import { rutaBase } from '../utilidades/constantes';

export const usarCerebroDatos = defineStore('datos', {
  state: () => ({
    nombre: '',
    indice: 0,
    cargandoDatos: false,
    datos: [],
    datosNacionales: [],
    datosEtnia: [],
    datosLugar: [],
    _cache: {
      departamentos: null,
      municipios: null,
    },
    geojsonLugar: null,
    geojsonSanAndres: null,
    años: [],
    valorMax: 0,
    lugarSeleccionado: null,
    etniaSeleccionada: null,
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
        const { nombreArchivo, tipo } = fuentes[indiceIndicador];
        const respuesta = await fetch(`${rutaBase}/mi_v2/${nombreArchivo}-${cerebroGlobales.nivel}.json`);
        const respuestaPais = await fetch(`${rutaBase}/mi_v2/${nombreArchivo}-pais.json`);
        const datosIndicador = await respuesta.json();
        const datosPais = await respuestaPais.json();

        let añoMin = Infinity;
        let añoMax = 0;

        this.datosNacionales = Object.keys(datosPais).map((anno) => {
          const [numerador, denominador, porcentaje] = datosPais[anno];
          añoMin = anno < añoMin ? anno : añoMin;
          añoMax = anno > añoMax ? anno : añoMax;

          return {
            anno: anno,
            numerador,
            denominador,
            porcentaje,
          };
        });

        const años = [];
        for (let i = +añoMin; i <= +añoMax; i++) {
          años.push(i);
        }
        this.años = años;
        this.datos = datosIndicador;

        if (tipo === 'proporción') {
          this.valorMax = 100;
        } else if (tipo === 'razón') {
          this.valorMax = 1000;
        } else {
          this.valorMax = 500;
        }

        // if (cerebroGlobales.año) {
        //   const existeAñoSeleccionado = años.includes(cerebroGlobales.año);

        //   if (!existeAñoSeleccionado) {
        //     if (años[0] > cerebroGlobales.año) {
        //       cerebroGlobales.año = años[0];
        //     }
        //   }
        // }

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
        const respuesta = await fetch(`${rutaBase}/mi_v2/${cerebroGlobales.nivel}.json`);
        const geojson = await respuesta.json();

        let geoSanAndres;

        geojson.features = geojson.features.filter((lugar) => {
          if (lugar.properties.codigo === '88') {
            geoSanAndres = lugar;
            return false;
          }
          return true;
        });

        // Guardar datos procesados en el cache.
        this._cache[cerebroGlobales.nivel] = geojson;
        this.geojsonLugar = geojson;
        this.geojsonSanAndres = geoSanAndres;

        this.cargandoDatos = false;
      }
    },

    actualizarDatosLugar(datos) {
      const cerebroGlobales = usarCerebroGlobales();
      cerebroGlobales.lugarSeleccionado = {
        codigo: datos.codigo,
        nombre: datos.nombre || cerebroGlobales.lugarSeleccionado.nombre,
      };

      this.lugarSeleccionado = datos.codigo;

      this.datosLugar = Object.keys(datos.datos).map((anno) => {
        const [numerador, denominador, porcentaje] = datos.datos[anno];

        return {
          anno: anno,
          numerador,
          denominador,
          porcentaje,
        };
      });

      this.actualizarDatosEtnia(datos);
    },

    actualizarDatosEtnia(datos) {
      const cerebroGlobales = usarCerebroGlobales();
      if (cerebroGlobales.etniaSeleccionada) {
        if (datos.etnias) {
          this.datosEtnia = Object.keys(datos.etnias[cerebroGlobales.etniaSeleccionada]).map((anno) => {
            const [numerador, denominador, porcentaje] = datos.etnias[cerebroGlobales.etniaSeleccionada][anno];

            return {
              anno: anno,
              numerador,
              denominador,
              porcentaje,
            };
          });
        }
      }
    },
  },
});
