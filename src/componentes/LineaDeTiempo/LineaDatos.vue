<script setup>
import { defineProps } from 'vue';
import { convertirEscala } from '../../utilidades/ayudas';

const props = defineProps({
  posicionX: Function,
  datos: Array,
  alturaVis: Number,
  color: String,
});

const radioPuntos = 4;

function construirLinea() {
  let linea = '';

  props.datos.forEach((instancia, i) => {
    const x = props.posicionX(instancia.anno);
    // POR HACER! acá toca cambiar los valores cuando no es porcentaje
    const y = convertirEscala(instancia.porcentaje, 0, 100, props.alturaVis, 0);

    if (i === 0) {
      linea += `M${x} ${y}`;
    } else {
      linea += ` L${x} ${y}`;
    }
  });

  return linea;
}
</script>

<template>
  <g :stroke="color" :fill="color">
    <path :d="construirLinea()" class="lineaDatos" fill="none" shape-rendering="geometricPrecision" />

    <circle
      v-for="(instancia, i) in datos"
      :key="`puntoNal-${i}`"
      class="puntoDatos"
      :cx="posicionX(instancia.anno)"
      :cy="convertirEscala(instancia.porcentaje, 0, 100, alturaVis, 0)"
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
    fill: $colorMenuClaro;
    filter: drop-shadow(0 0 2px $colorMenuClaro);
  }
}
</style>
