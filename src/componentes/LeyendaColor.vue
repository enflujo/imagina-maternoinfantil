<script setup>
import { onMounted, ref } from 'vue';
import { escalaColores } from '../utilidades/ayudas';

const props = defineProps({
  colores: Object,
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
    <span v-for="(color, i) in rango" :key="`color-${i}`" :style="`background-color:${color}`"></span>
  </div>
</template>

<style lang="scss" scoped>
span {
  display: inline-block;
  height: 10px;
  width: 2px;
}
</style>
