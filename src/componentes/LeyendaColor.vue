<script setup>
import { onMounted, ref } from 'vue';
import { escalaColores } from '../utilidades/ayudas';

const props = defineProps({
  colores: Object,
  porcentajeMin: Number,
  porcentajeMax: Number,
});

const rango = ref([]);

const mapearColor = escalaColores(0, 100, props.colores[0], props.colores[1]);

onMounted(() => {
  for (let i = 0; i <= 100; i++) {
    rango.value.push(mapearColor(i));
  }
});
</script>

<template>
  <div id="leyendaRango">
    <span id="rangoInicio" class="rangoMarca" :style="`left:${props.porcentajeMin}%`">{{ props.porcentajeMin }}%</span>
    <span id="rangoFin" class="rangoMarca" :style="`left:${props.porcentajeMax}%`">{{ props.porcentajeMax }}%</span>

    <span class="rangoFijo rangoFijoInicio">0%</span>
    <span
      v-for="(color, i) in rango"
      :key="`color-${i}`"
      :style="`background-color:${color}`"
      class="instanciaColor"
    ></span>
    <span class="rangoFijo rangoFijoFin">100%</span>
  </div>
</template>

<style lang="scss" scoped>
#leyendaRango {
  position: relative;
  padding-top: 5px;
  height: 20px;
  width: 200px;
  margin-left: 1em;
  display: flex;
}
.instanciaColor {
  display: inline-block;
  height: 100%;
  width: 2px;
}

$tamañoTriangulo: 5px;

.rangoMarca {
  position: absolute;
  top: -13px;
  font-size: 0.65em;
  transform: translateX(-$tamañoTriangulo);

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -$tamañoTriangulo;
    border-top: $tamañoTriangulo solid black;
    border-right: $tamañoTriangulo solid transparent;
    border-left: $tamañoTriangulo solid transparent;
    border-bottom: none;
  }
}

.rangoFijo {
  font-size: 10px;
  position: absolute;
  bottom: 2px;

  &.rangoFijoInicio {
    left: 0;
  }

  &.rangoFijoFin {
    right: 0;
    color: white;
  }
}
</style>
