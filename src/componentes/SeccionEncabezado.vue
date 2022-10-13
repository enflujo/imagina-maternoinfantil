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
        <li><router-link to="/datos" class="elementoMenu">Datos</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import '../assets/constantes.scss';

#encabezado {
  height: $tamañoEncabezado;
  width: 100%;
  background-color: $colorBlanco;
  top: 0;
  z-index: 10;
  position: fixed;
}

#nombreProyecto {
  display: flex;
  align-items: center;
  padding: 0 1.5em 0 0;
  border-right: 1.8px solid #0042bf;
  height: $tamañoEncabezado;
}

nav {
  display: flex;
  justify-content: space-around;
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
    //opacity: 0.6;
    color: #0ae6a2;
  }
}

.elementoMenu {
  font-size: 1em;
  margin: 4px;
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
  nav {
    justify-content: flex-start;
  }
  .elementoMenu {
    margin: 20px;
  }
}
// Pantallas medianas (Tablets)
@media (min-width: $minTablet) {
  nav {
    justify-content: flex-start;
  }
  .tituloProyecto {
    display: block;
    margin-left: 1em;
  }
  .elementoMenu {
    margin: 20px;
  }
}
// Dispositivos grandes y pantallas medianas
@media (min-width: $minPantalla) {
  nav {
    justify-content: flex-start;
  }
  .elementoMenu {
    margin: 20px;
  }
}
// Pantallas grandes
@media (min-width: $minPantallaGrande) {
}
nav {
  justify-content: flex-start;
}
.elementoMenu {
  margin: 20px;
}
</style>
