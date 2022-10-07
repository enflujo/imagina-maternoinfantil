<script setup>
import { onMounted } from 'vue';
import { rutaBase } from '../utilidades/constantes';
import fuentes from '../utilidades/fuentes';

onMounted(async () => {
  // Este archivo lo generamos en el tally, se debe actualizar el archivo en la bodega cuando cambien los datos.
  const pesos = await fetch(`${rutaBase}/maternoinfantil/pesosArchivos.json`).then((respuesta) => respuesta.json());
  fuentes.forEach((fuente) => {
    const peso = pesos[fuente.archivoDescarga];
    // Agregar el peso del archivo a cada fuente para tener esta información disponible en el bucle del html.
    fuente.pesoArchivo = peso;
  });
});
</script>

<template>
  <main id="datos">
    <header>
      <h2>Datos para descarga</h2>

      <p>
        Aquí se encuentran los datos en bruto para descarga directa. A través del menú selecciona el indicador cuyos
        datos quieres obtener. Los datos están disponibles en <span class="negrita">.xlsx</span> o
        <span class="negrita">.zip</span>
      </p>

      <div id="indicadores">
        <div v-for="(fuente, i) in fuentes" :key="`fuente${i}`" class="indicador">
          <p class="columna enlace">
            <a :href="`${rutaBase}/maternoinfantil/${fuente.archivoDescarga}.zip`" download>.zip</a>
          </p>
          <p class="columna peso">{{ fuente.pesoArchivo }}</p>
          <p class="columna ficha">Ficha Técnica</p>

          <p class="columna nombre">{{ fuente.nombreIndicador }}</p>
        </div>
      </div>

      <div id="boton">
        <a href="https://enflujo.com" target="_blank">
          <img class="boton" src="../assets/imgs/bajada.svg" />
        </a>
      </div>
    </header>
  </main>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '../assets/constantes.scss';

#indicadores {
  width: 50vw;

  .indicador {
    display: flex;
    margin: 0.3em 0;
    border: 1px dotted;
  }

  .columna {
    padding: 0.5em;
  }

  .nombre {
    font-weight: bold;
  }
}

h2 {
  font-size: 2em;
  margin-bottom: 1em;
  letter-spacing: -0.5px;
}

h3 {
  font-size: 1.5em;
  margin-bottom: 1em;
  letter-spacing: -0.5px;
}

#datos {
  padding: 2em 2em 10em 2em;
  color: $colorOscuro;
}

section {
  margin-top: 4em;

  li {
    margin-top: 0.5em;
    list-style-type: circle;
  }
}

header {
  p {
    font-size: 1.2em;
  }
}

.negrita {
  font-weight: bold;
}

#boton {
  background-color: rgba($colorFondoClaro, 0.75);
  margin-top: 3em;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;

  &.historia {
    background-color: rgba($colorFondoHistorias, 0.75);
  }
}

.boton {
  height: 45px;
}

a,
a:link {
  text-decoration: none;

  color: color.scale($colorOscuro, $lightness: 20%);
  transition: color 0.15s ease-in-out;
  font-weight: bold;

  &:hover {
    color: color.scale($colorOscuro, $lightness: 40%);
  }
}

ul {
  margin-left: 1.1em;
}

// Teléfonos horizontal
@media (min-width: $minCelular) {
  .logo {
    height: 45px;
  }
}
// Pantallas medianas (Tablets)
@media (min-width: $minTablet) {
  #datos {
    margin: 5em;
  }
}
// Dispositivos grandes y pantallas medianas
@media (min-width: $minPantalla) {
  .logo {
    height: 50px;
  }
}
// Pantallas grandes
@media (min-width: $minPantallaGrande) {
  #datos {
    width: 50vw;
    max-width: 900px;
  }
}
</style>
