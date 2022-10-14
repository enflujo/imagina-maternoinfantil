<script setup>
const props = defineProps({
  posicionX: Function,
  posicionY: Function,
  datos: Array,
  alturaVis: Number,
  color: String,
  opacidad: Number,
});

const radioPuntos = 4;

function construirLinea() {
  let linea = '';
  let añoInicial = 2005;
  let paso = 0;

  props.datos.forEach((instancia, i) => {
    const x = props.posicionX(instancia.anno);
    // POR HACER! acá toca cambiar los valores cuando no es porcentaje
    const y = props.posicionY(instancia.porcentaje);

    if (i === 0 || instancia.anno != añoInicial) {
      linea += `M${x} ${y}`;
      paso = instancia.anno - añoInicial;
      añoInicial += paso;
    } else {
      linea += ` L${x} ${y}`;
    }
    añoInicial += 1;
  });

  return linea;
}
</script>

<template>
  <g :stroke="color" :fill="color" :opacity="opacidad">
    <path :d="construirLinea()" class="lineaDatos" fill="none" shape-rendering="geometricPrecision" />

    <circle
      v-for="(instancia, i) in datos"
      :key="`puntoNal-${i}`"
      class="puntoDatos"
      :cx="posicionX(instancia.anno)"
      :cy="posicionY(instancia.porcentaje)"
      :r="radioPuntos"
      :fill="color"
      @mouseenter="(e) => $emit('eventoEncima', instancia.porcentaje, e)"
      @mouseleave="$emit('eventoFuera')"
    />
  </g>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

.lineaDatos {
  fill: none;
  stroke-width: 3;
  transition: all 0.1s ease-in-out;
}

.puntoDatos {
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    fill: $colorFondoClaro;
    filter: drop-shadow(0 0 2px $colorMenuClaro);
  }
}
</style>
