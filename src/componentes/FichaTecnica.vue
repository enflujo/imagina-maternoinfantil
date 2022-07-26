<script setup>
import fuentes from '../utilidades/fuentes';
import { usarCerebroDatos } from '../cerebro/datos';

const cerebroDatos = usarCerebroDatos();

function mostrarDatos() {
  console.log(fuentes[cerebroDatos.indiceActual]);
}
</script>

<template>
  <div @click="mostrarDatos">Mostrar datos</div>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';
</style>
