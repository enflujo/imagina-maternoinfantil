<script setup>
defineProps({
  clase: String,
});
</script>

<template>
  <footer id="guardaescobas" :class="clase ? clase : ''">
    <a href="https://www.fundacionexito.org/" target="_blank">
      <img class="logo" src="../assets/imgs/logo_f_exito.svg" alt="Fundación Exito" />
    </a>
    <img class="logo" src="../assets/imgs/logo_andes_imagina.svg" alt="Centro Imagina" />
    <a href="https://enflujo.com" target="_blank">
      <img class="logo" src="../assets/imgs/logo_enflujo.svg" alt="Laboratorio EnFlujo" />
    </a>
  </footer>
</template>

<style lang="scss" scoped>
@import '../assets/constantes.scss';

#guardaescobas {
  position: fixed;
  right: 10%;
  bottom: 0px;
  padding: 0.6em;
  z-index: 999999;
  background-color: rgba($colorFondoClaro, 0.75);
  display: flex;
  justify-content: space-around;

  &.historia {
    background-color: rgba($colorFondoHistorias, 0.75);
  }
}

.logo {
  height: 8vw;
  margin: 0 8%;
}

// Teléfonos horizontal
@media (min-width: $minCelular) {
  .logo {
    height: 4vw;
  }
}
// Pantallas medianas (Tablets)
@media (min-width: $minTablet) {
  .logo {
    height: 4vw;
  }
}
// Dispositivos grandes y pantallas medianas
@media (min-width: $minPantalla) {
  .logo {
    height: 4vw;
  }
}
// Pantallas grandes
@media (min-width: $minPantallaGrande) {
  #guardaescobas {
    right: 0px;
    padding: 1em;
  }

  .logo {
    height: 36px;
    margin: 0 2em;
  }
}
</style>
