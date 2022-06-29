<script setup>
import { onUpdated, ref } from 'vue';
// import procesarDatos from '@/utilidades/procesarDatosDepto';
import { escalaCoordenadas, escalaColores, crearLinea } from '@/utilidades/ayudas';

const props = defineProps({
  forma: Object,
  datos: Object,
});
const datosCargados = ref(false);
const latitudMin = -4.2473;
const latitudMax = 12.4361;
const longitudMin = -79.0731;
const longitudMax = -66.874;

const ancho = ref(0);
const alto = ref(0);

const mapearCoordenadas = ref();
const mapearColor = escalaColores(0, 100, '#BEEFED', '#0042BF');

onUpdated(() => {
  if (!datosCargados.value) {
    if (props.forma.features && props.forma.features.length && props.datos.length) {
      // const { latitudMin, latitudMax, longitudMin, longitudMax } = procesarDatos(props.forma, []);
      mapearCoordenadas.value = escalaCoordenadas(latitudMin, latitudMax, longitudMin, longitudMax);
      console.log('hey');
      datosCargados.value = true;
      console.log(props.forma);
      actualizarDimension(latitudMin, latitudMax, longitudMin, longitudMax);
      // dibujar;
      // console.log(props.datos, props.forma.features);
    }
  }
});

function pintarSeccion(seccion) {
  if (mapearCoordenadas.value) {
    return crearLinea(seccion.geometry.coordinates, mapearCoordenadas.value, ancho.value, alto.value);
  } else {
    console.log('aun no hay función para mapear');
    return null;
  }
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

function definirColor(seccion) {
  if (props.datos.length) {
    console.log('hola');
  }
}
</script>

<template>
  <svg ref="mapa" v-if="props.forma" :width="ancho" :height="alto">
    <path
      v-for="(seccion, i) in props.forma.features"
      :key="`seccion-${i}`"
      :d="pintarSeccion(seccion)"
      :fill="definirColor(seccion)"
    ></path>
  </svg>
</template>

<style lang="scss" scoped></style>
