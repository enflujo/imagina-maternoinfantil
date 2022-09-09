<template>
  <header id="encabezado">
    <nav>
      <router-link id="nombreProyecto" to="/">
        <img id="logo" src="../assets/imgs/logo.svg" alt="Logo de Salud Maternoinfantil en Colombia" />
        <h1 class="tituloProyecto">Salud Maternoinfantil en Colombia</h1>
      </router-link>

      <ul>
        <li><router-link to="/" class="elementoMenu">Tablero</router-link></li>
        <li><router-link to="/historias" class="elementoMenu">Historias</router-link></li>
        <li><router-link to="/creditos" class="elementoMenu">Créditos</router-link></li>
      </ul>
    </nav>
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

#nombreProyecto {
  display: flex;
  align-items: center;
  padding: 0 1em 0 0;
  border-right: 2px solid #0042bf;
  height: $tamañoEncabezado;
}

nav {
  display: flex;
}

#logo {
  height: 23px;
  margin: 0 0 0 20px;
}

a,
a:link {
  font-weight: bold;
  text-decoration: none;
  transition: opacity 0.15s ease-in-out;
  color: $colorOscuro;

  &:hover {
    opacity: 0.6;
  }
}

.elementoMenu {
  font-size: 1em;
  // padding: 0.2em 1em 0 3em;
  margin: 10px;
}

.tituloProyecto {
  display: none;
  font-size: 1.1em;
}

ul {
  display: flex;
  margin: 8px 0 0 5px;

  .router-link-exact-active {
    border-bottom: 1px solid $colorOscuro;
  }
}

// Teléfonos horizontal
@media (min-width: $minCelular) {
}
// Pantallas medianas (Tablets)
@media (min-width: $minTablet) {
  .tituloProyecto {
    display: block;
    margin-left: 1em;
  }
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
