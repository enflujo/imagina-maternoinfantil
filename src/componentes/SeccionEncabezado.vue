<script setup></script>

<template>
  <header id="encabezado">
    <div id="contenedor">
      <h1>Salud Maternoinfantil en Colombia</h1>
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
