<script setup>
import { RouterView } from 'vue-router';
import Encabezado from './componentes/SeccionEncabezado.vue';
// import SeccionIntroduccion from '@/components/SeccionIntroduccion.vue';
</script>

<template>
  <main>
    <Encabezado />
    <!-- <header>
      <SeccionIntroduccion />
    </header> -->

    <RouterView />
  </main>
</template>

<style lang="scss">
@import '@/assets/estilos.scss';
</style>
