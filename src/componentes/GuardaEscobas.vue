<script setup>
defineProps({
  clase: String,
});
</script>

<template>
  <footer id="guardaescobas" :class="clase ? clase : ''">
    <a href="https://www.fundacionexito.org/" target="_blank"
      ><img class="logo" src="../assets/imgs/logo_f_exito.svg"
    /></a>
    <img class="logo" src="../assets/imgs/logo_andes_imagina.svg" />
    <a href="https://enflujo.com" target="_blank"><img class="logo" src="../assets/imgs/logo_enflujo.svg" /></a>
  </footer>
</template>

<style lang="scss" scoped>
@import '../assets/constantes.scss';

#guardaescobas {
  position: fixed;
  right: 0;
  bottom: 0px;
  padding: 1em;
  z-index: 999999;
  background-color: rgba($colorFondoClaro, 0.75);

  &.historia {
    background-color: rgba($colorFondoHistorias, 0.75);
  }
}

.logo {
  height: 36px;
  margin: 0 2em;
}
</style>
