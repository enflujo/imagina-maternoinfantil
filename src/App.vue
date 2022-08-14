<script setup>
import { RouterView } from 'vue-router';
import Encabezado from './componentes/SeccionEncabezado.vue';
</script>

<template>
  <main>
    <Encabezado />

    <RouterView />
  </main>
</template>

<style lang="scss">
@import '@/assets/estilos.scss';
</style>
