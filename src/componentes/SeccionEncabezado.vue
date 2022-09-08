<script setup></script>

<template>
  <header id="encabezado">
    <div id="contenedor">
      <img id="favicon" src="../assets/imgs/cargador.png" alt="Salud Maternoinfantil en Colombia" />
      <div class="tituloProyecto elementoMenu">Salud Maternoinfantil en Colombia</div>
      <router-link to="/" class="elementoMenu">Tablero</router-link>
      <router-link to="/historias" class="elementoMenu">Historias</router-link>
      <router-link to="/creditos" class="elementoMenu">Créditos</router-link>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import '../assets/constantes.scss';

#encabezado {
  height: $tamañoEncabezado;
  width: 100vw;
  background-color: $colorBlanco;
  top: 0;
  z-index: 10;
}

#contenedor {
  display: flex;
}

#favicon {
  height: 47px;
  position: relative;
  top: -4px;
  margin-left: 2em;
}

.elementoMenu {
  font-size: 1em;
  padding: 0.2em 1em 0 3em;
  margin-top: 0.4em;
  color: $colorOscuro;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.15s ease-in-out;

  &:hover {
    opacity: 0.6;
  }
}

.tituloProyecto {
  border-right: 2px solid #0042bf;
  padding: 0.2em 2em 0 1em;
  height: fit-content;
  margin-right: 3em;

  &:hover {
    opacity: 1;
  }
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
