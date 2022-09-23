<script setup>
import { ref } from 'vue-demi';
import { usarCerebroGlobales } from '../cerebro/globales';
const texto = ref('');

/* defineProps({
  dato: Object,
  esLista: {
    default: true,
    type: Boolean,
  },
}); */

const cerebroGlobales = usarCerebroGlobales();

function buscar(lugar) {
  cerebroGlobales.lugarSeleccionado = lugar;
  texto.value = lugar;
  console.log(texto.value);
}
</script>

<template>
  <div>
    <input @change="buscar(texto)" v-model="texto" placeholder="Buscar lugar" />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';
</style>
