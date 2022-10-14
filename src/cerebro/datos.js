import { defineStore } from 'pinia';
import fuentes from '../utilidades/fuentes';
import { usarCerebroGlobales } from './globales';
import { rutaBase } from '../utilidades/constantes';

export const usarCerebroDatos = defineStore('datos', {
  state: () => ({
    indice: 0,
    cargandoDatos: false,
    datos: [],
    datosNacionales: [],
    datosNacionalesEtniaSeleccionada: [],
    datosDepartamentoEtniaSeleccionada: [],
    datosEtniasNacionales: {},
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
        const ruta = `${rutaBase}/${nombreArchivo}`;
        const { nivel } = cerebroGlobales;

        const datosIndicador = await fetch(`${ruta}-${nivel}.json`).then((respuesta) => respuesta.json());
        const datosPais = await fetch(`${ruta}-pais.json`).then((respuesta) => respuesta.json());

        let añoMin = Infinity;
        let añoMax = 0;

        this.datosNacionales = Object.keys(datosPais.datos).map((anno) => {
          const [numerador, denominador, porcentaje] = datosPais.datos[anno];
          añoMin = anno < añoMin ? anno : añoMin;
          añoMax = anno > añoMax ? anno : añoMax;

          return {
            anno: anno,
            numerador,
            denominador,
            porcentaje,
          };
        });

        const nacionalEtnias = datosPais.etnias;

        for (let tipoEtnia in nacionalEtnias) {
          nacionalEtnias[tipoEtnia] = Object.keys(nacionalEtnias[tipoEtnia].datos).map((anno) => {
            const [numerador, denominador, porcentaje] = nacionalEtnias[tipoEtnia].datos[anno];
            añoMin = anno < añoMin ? anno : añoMin;
            añoMax = anno > añoMax ? anno : añoMax;

            return {
              anno: anno,
              numerador,
              denominador,
              porcentaje,
            };
          });
        }

        if (nivel === 'departamentos') {
          datosIndicador.forEach((lugar) => {
            for (let tipoEtnia in lugar.etnias) {
              lugar.etnias[tipoEtnia] = Object.keys(lugar.etnias[tipoEtnia].datos).map((anno) => {
                const [numerador, denominador, porcentaje] = lugar.etnias[tipoEtnia].datos[anno];
                añoMin = anno < añoMin ? anno : añoMin;
                añoMax = anno > añoMax ? anno : añoMax;

                return {
                  anno: anno,
                  numerador,
                  denominador,
                  porcentaje,
                };
              });
            }
          });
        }

        this.datosEtniasNacionales = nacionalEtnias;

        if (cerebroGlobales.etniaSeleccionada) {
          this.actualizarDatosEtnia();
        }

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

        if (cerebroGlobales.lugarSeleccionado) {
          const dLugar = datosIndicador.find((obj) => obj.codigo === cerebroGlobales.lugarSeleccionado.codigo);

          if (dLugar) this.actualizarDatosLugar(dLugar);
        }

        this.indice = indiceIndicador;
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

      this.actualizarDatosEtnia();
    },

    vaciarDatosLugar() {
      this.datosLugar = [];
      this.datosDepartamentoEtniaSeleccionada = [];
    },

    actualizarDatosEtnia() {
      const cerebroGlobales = usarCerebroGlobales();
      if (cerebroGlobales.etniaSeleccionada) {
        // Acá se pinta la línea nacional de etnia
        this.datosNacionalesEtniaSeleccionada = this.datosEtniasNacionales[cerebroGlobales.etniaSeleccionada.codigo];

        if (this.lugarSeleccionado) {
          const datosDepartamento = this.datos.find((lugar) => lugar.codigo === this.lugarSeleccionado);
          if (datosDepartamento && datosDepartamento.etnias) {
            this.datosDepartamentoEtniaSeleccionada =
              datosDepartamento.etnias[cerebroGlobales.etniaSeleccionada.codigo];
          }
        }
      }
    },
  },
});
