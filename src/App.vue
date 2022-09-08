<script setup>
import { RouterView } from 'vue-router';
import Encabezado from './componentes/SeccionEncabezado.vue';
import Cargador from './componentes/CargadorElemento.vue';
import { usarCerebroDatos } from './cerebro/datos';

const cerebroDatos = usarCerebroDatos();
</script>

<template>
  <main>
    <Cargador v-if="cerebroDatos.cargandoDatos" />
    <Encabezado />

    <RouterView />
  </main>
</template>

<style lang="scss">
@import '@/assets/estilos.scss';
</style>
