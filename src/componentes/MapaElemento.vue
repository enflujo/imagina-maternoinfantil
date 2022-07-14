<script setup>
import { ref, reactive, watch } from 'vue';
import { extremosLugar } from '../utilidades/procesador';
import { escalaCoordenadas, escalaColores, crearLinea } from '../utilidades/ayudas';

const props = defineProps({
  geojson: Object,
  datos: Object,
  año: Number,
  colores: Object,
  actualizarVistaLugar: Function,
});
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
const mapearColor = escalaColores(0, 100, props.colores[0], props.colores[1]);
const colorLinea = 'transparent'; //'#ffc1f8';

// const datosLugares = computed(() => {
//   return
// })

watch(
  () => props.geojson,
  (nuevos) => {
    const { latitudMin, latitudMax, longitudMin, longitudMax } = extremosLugar(nuevos);
    mapearCoordenadas.value = escalaCoordenadas(latitudMin, latitudMax, longitudMin, longitudMax);
    actualizarDimension(latitudMin, latitudMax, longitudMin, longitudMax);
    datosSecciones.splice(0);
    nuevos.features.forEach((lugar) => {
      const { codigo, nombre } = lugar.properties;

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

watch(() => props.año, actualizarDatos);

watch(
  () => props.datos,
  () => {
    if (!datosSecciones.length) return;
    actualizarDatos();
  }
);

function actualizarDatos() {
  props.geojson.features.forEach((lugar, i) => {
    datosSecciones[i].datos = [];
    datosSecciones[i].color = 'transparent';
    const { codigo } = lugar.properties;
    const datosLugar = props.datos.find((obj) => obj.codigo === codigo);

    if (!datosLugar || !datosLugar.datos[props.año]) {
      return;
    }

    datosSecciones[i].datos = datosLugar.datos;
    datosSecciones[i].color = mapearColor(datosLugar.datos[props.año][2]);
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
  if (!seccion.datos[props.año]) return;
  const [numerador, denominador, porcentaje] = seccion.datos[props.año];
  infoVisible.value = true;
  nombreLugar.value = seccion.nombre;
  infoNumerador.value = numerador;
  infoDenominador.value = denominador;
  infoPorcentaje.value = `${porcentaje.toFixed(2)}%`;
}

function eventoFuera() {
  infoVisible.value = false;
}

function eventoMovimiento(evento) {
  infoIzq.value = evento.pageX;
  infoArriba.value = evento.pageY;
}

function eventoClic(datos, lugar) {
  props.actualizarVistaLugar(datos, lugar);
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
      stroke-width="0.5px"
      @mouseenter="() => eventoEncima(seccion)"
      @mouseleave="eventoFuera"
      @click="() => eventoClic(seccion.datos, seccion.nombre)"
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
#mapa {
  left: 19em;
  top: 8em;
  position: relative;
  transform: scale(1.3);
}

#informacion {
  position: fixed;
}
</style>
