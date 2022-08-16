<script setup></script>

<template>
  <header id="encabezado">
    <div id="contenedor">
      <router-link to="/" class="tituloProyecto elementoMenu">Salud Maternoinfantil en Colombia</router-link>
      <router-link to="/creditos" class="elementoMenu">Créditos</router-link>
      <router-link to="/historias" class="elementoMenu">Historias</router-link>
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
  font-size: 1.3em;
  padding: 0.2em 1em 0 1em;
  margin-top: 0.7em;
  color: $colorOscuro;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.15s ease-in-out;

  &:hover {
    opacity: 0.6;
  }
}

.tituloProyecto {
  border-right: 2px solid $colorBlanco;
  padding: 0.2em 1em 0 2em;
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
