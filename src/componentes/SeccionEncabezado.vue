<script setup>
import { usarCerebroGlobales } from '../cerebro/globales';
const cerebroGlobales = usarCerebroGlobales();

function mostrarCreditos() {
  const creditos = document.getElementById('creditos');
  cerebroGlobales.mostrarCreditos = !cerebroGlobales.mostrarCreditos;
  if (cerebroGlobales.mostrarCreditos === true) {
    creditos.style.visibility = 'visible';
  } else {
    creditos.style.visibility = 'hidden';
  }
}
</script>

<template>
  <header id="encabezado">
    <div id="contenedor">
      <h1 class="elementoMenu">Salud Maternoinfantil en Colombia</h1>
      <h1 class="elementoMenu" @click="mostrarCreditos">Créditos</h1>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import '../assets/constantes.scss';

#encabezado {
  height: $tamañoEncabezado;
  width: 100vw;
  background-color: $colorFondoClaro2;
  top: 0;
  z-index: 10;
}

#contenedor {
  display: flex;
}

.elementoMenu {
  cursor: pointer;
}

h1 {
  font-size: 1.3em;
  color: $colorOscuro;
  border-right: 2px solid $colorBlanco;
  padding: 0.2em 1em 0 2em;
  margin-top: 0.7em;
}

// Teléfonos horizontal
@media (min-width: $minCelular) {
}
// Pantallas medianas (Tablets)
@media (min-width: $minTablet) {
}
// Dispositivos grandes y pantallas medianas
@media (min-width: $minPantalla) {
}
// Pantallas grandes
@media (min-width: $minPantallaGrande) {
  #encabezado {
    position: fixed;
  }
}
</style>
