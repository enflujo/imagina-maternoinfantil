<script setup>
import { ref, reactive, watch } from 'vue';
import buscarExtremos from '../utilidades/buscarExtremosGeojson';
import { escalaCoordenadas, escalaColores, crearLinea } from '../utilidades/ayudas';

const props = defineProps({
  geojson: Object,
  datos: Object,
  año: Number,
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
const mapearColor = escalaColores(0, 100, '#BEEFED', '#0042BF');
const colorLinea = '#ffc1f8';

// const datosLugares = computed(() => {
//   return
// })

watch(
  () => props.geojson,
  (nuevos) => {
    const { latitudMin, latitudMax, longitudMin, longitudMax } = buscarExtremos(nuevos);
    mapearCoordenadas.value = escalaCoordenadas(latitudMin, latitudMax, longitudMin, longitudMax);
    actualizarDimension(latitudMin, latitudMax, longitudMin, longitudMax);

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

watch(
  () => props.datos,
  (nuevos) => {
    if (!datosSecciones.length) return;
    props.geojson.features.forEach((lugar, i) => {
      const { codigo } = lugar.properties;
      const datosLugar = nuevos.find((obj) => obj.codigo === codigo);

      datosSecciones[i].datos = datosLugar.datos;
      datosSecciones[i].color = mapearColor(datosLugar.datos[props.año][2]);
    });
  }
);

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
</script>

<template>
  <svg id="mapa" :width="ancho" :height="alto" @mousemove="eventoMovimiento">
    <path
      v-for="seccion in datosSecciones"
      :key="`seccion-${seccion.codigo}`"
      :d="seccion.linea"
      :fill="seccion.color"
      :stroke="colorLinea"
      @mouseenter="() => eventoEncima(seccion)"
      @mouseleave="eventoFuera"
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
  position: fixed;
  left: 40vw;
  top: 50px;
}

#informacion {
  position: absolute;
}
</style>
