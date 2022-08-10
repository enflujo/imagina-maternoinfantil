<script setup>
import { ref, reactive, watch } from 'vue';
import { extremosLugar } from '../utilidades/procesador';
import { escalaCoordenadas, escalaColores, crearLinea } from '../utilidades/ayudas';
import { usarCerebroDatos } from '../cerebro/datos';
import { usarCerebroGlobales } from '../cerebro/globales';
import { colores } from '../utilidades/constantes';

const datosSecciones = reactive([]);
const nombreLugar = ref('');
const infoNumerador = ref('');
const infoDenominador = ref('');
const infoPorcentaje = ref('');
const infoVisible = ref(false);
const ancho = ref(0);
const alto = ref(0);
const infoIzq = ref(0);
const infoArriba = ref(0);
const mapearCoordenadas = ref();
const mapearColor = escalaColores(0, 100, colores[0], colores[1]);
const colorLinea = 'white'; //'#ffc1f8';

const cerebroDatos = usarCerebroDatos();
const cerebroGlobales = usarCerebroGlobales();

watch(
  () => cerebroDatos.geojsonLugar,
  (nuevos) => {
    const { latitudMin, latitudMax, longitudMin, longitudMax } = extremosLugar(nuevos);
    mapearCoordenadas.value = escalaCoordenadas(latitudMin, latitudMax, longitudMin, longitudMax);
    actualizarDimension(latitudMin, latitudMax, longitudMin, longitudMax);
    datosSecciones.splice(0);

    nuevos.features.forEach((lugar) => {
      const { codigo, nombre } = lugar.properties;

      // POR HACER: mostrar san andrés y providencia dentro de los espacios del mapa.
      if (codigo === '88') {
        // lugar.geometry.coordinates = lugar.geometry.coordinates.map((multipoligono) => {
        //   return multipoligono.map((poligono) => {
        //     return poligono.map((punto) => {
        //       // ESTO NO FUNCIONA PORQUE EL MAPA SE MUEVE Y ESTO QUEDA EN LUGARES RAROS
        //       // creo que toca es mover los puntos desde pixeles y no de coordenadas.
        //       return [punto[0] + 6, punto[1] - 1.5];
        //     });
        //   });
        // });
      }

      datosSecciones.push({
        codigo,
        nombre,
        datos: [],
        linea: crearLinea(lugar.geometry.coordinates, mapearCoordenadas.value, ancho.value, alto.value),
        color: 'white',
      });
    });
  }
);

watch(() => cerebroGlobales.año, actualizarDatos);

watch(
  () => cerebroDatos.datos,
  () => {
    if (!datosSecciones.length) return;
    actualizarDatos();
  }
);

function actualizarDatos() {
  cerebroDatos.geojsonLugar.features.forEach((lugar, i) => {
    datosSecciones[i].datos = [];
    datosSecciones[i].color = 'transparent';
    const { codigo } = lugar.properties;
    const datosLugar = cerebroDatos.datos.find((obj) => obj.codigo === codigo);

    if (!datosLugar || !datosLugar.datos[cerebroGlobales.año]) {
      return;
    }

    datosSecciones[i].datos = datosLugar.datos;
    datosSecciones[i].color = mapearColor(datosLugar.datos[cerebroGlobales.año][2]);
  });
}

const actualizarDimension = (latitudMin, latitudMax, longitudMin, longitudMax) => {
  ancho.value = window.innerWidth;
  alto.value = window.innerHeight / 1.4;

  const coordenadasAncho = longitudMax - longitudMin;
  const coordenadasAlto = latitudMax - latitudMin;

  if (coordenadasAncho > coordenadasAlto) {
    alto.value = ancho.value * (coordenadasAlto / coordenadasAncho);
  } else {
    ancho.value = alto.value * (coordenadasAncho / coordenadasAlto);
  }

  ancho.value = ancho.value | 0;
  alto.value = alto.value | 0;
};

function eventoEncima(seccion) {
  if (!seccion.datos[cerebroGlobales.año]) return;
  const [numerador, denominador, porcentaje] = seccion.datos[cerebroGlobales.año];

  infoVisible.value = true;
  nombreLugar.value = seccion.nombre;
  infoNumerador.value = `${numerador} de`;
  infoDenominador.value = denominador;
  infoPorcentaje.value = `${porcentaje.toFixed(2)}`;
}

function eventoFuera() {
  infoVisible.value = false;
}

function eventoMovimiento(evento) {
  infoIzq.value = evento.pageX;
  infoArriba.value = evento.pageY;
}
</script>

<template>
  <svg id="mapa" :width="ancho" :height="alto" @mousemove="eventoMovimiento">
    <path
      v-for="seccion in datosSecciones"
      :key="`seccion-${seccion.codigo}`"
      :d="seccion.linea"
      :fill="seccion.color"
      :stroke="colorLinea"
      :data-nombre="seccion.nombre"
      stroke-width="0.5px"
      @mouseenter="eventoEncima(seccion)"
      @mouseleave="eventoFuera"
      @click="cerebroDatos.actualizarDatosLugar(seccion)"
    ></path>
  </svg>

  <div id="informacion" :style="`opacity:${infoVisible ? 1 : 0};left:${infoIzq}px; top:${infoArriba}px`">
    <p id="departamento">{{ nombreLugar }}</p>
    <p id="numerador">{{ infoNumerador }}</p>
    <p id="denominador">{{ infoDenominador }}</p>
    <p id="porcentaje">{{ infoPorcentaje }}</p>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

#mapa {
  margin: 0 auto;
  display: block;
  // left: 19em;
  // top: 8em;
  // position: relative;
  // transform: scale(1.3);
}

#informacion {
  position: absolute;
  color: rgb(239, 100, 97);
  font-size: 0.85em;
  font-family: $fuenteTexto;
  padding: 0.5em;
  opacity: 0;
  transition: opacity 0.23s ease-out;
  background-color: rgba(255, 255, 255, 0.9);
  pointer-events: none;
  transform: translate(-50%, -110%);

  p {
    margin: 0.3em;
  }
}
</style>
