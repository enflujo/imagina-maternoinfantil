<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { rutaBase } from '../utilidades/constantes';
import fuentes from '../utilidades/fuentes';
import FichaTecnica from '../componentes/FichaTecnica.vue';

onMounted(async () => {
  // Este archivo lo generamos en el tally, se debe actualizar el archivo en la bodega cuando cambien los datos.
  const pesos = await fetch(`${rutaBase}/maternoinfantil/pesosArchivos.json`).then((respuesta) => respuesta.json());
  // document.body.addEventListener('click', clicFuera);
  fuentes.forEach((fuente) => {
    const peso = pesos[fuente.archivoDescarga];
    // Agregar el peso del archivo a cada fuente para tener esta información disponible en el bucle del html.
    fuente.pesoArchivo = peso;
  });
});

/* onUnmounted(() => {
  document.body.removeEventListener('click', clicFuera);
}); */

const mostrarFicha = ref(false);
const indicador = ref(0);
const ficha = ref(null);

function mostrarFichaTecnica(i) {
  indicador.value = i;
  mostrarFicha.value = !mostrarFicha.value;
}

// POR HACER! Arreglar
function clicFuera(evento) {
  if (!(ficha.value.contenedor === evento.target || ficha.value.contenedor.contains(evento.target))) {
    mostrarFicha.value = false;
  }
}
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
          <span class="columna ficha" @click="mostrarFichaTecnica(i)">Ficha Técnica </span>

          <p class="columna enlace">
            <a :href="`${rutaBase}/maternoinfantil/${fuente.archivoDescarga}.zip`" download>
              <span class="nombre">{{ fuente.nombreIndicador + ' ' }}</span>
              <span class="peso">({{ fuente.pesoArchivo }})</span>
            </a>
          </p>
        </div>
      </div>
      <div id="contenedorFichas">
        <FichaTecnica ref="ficha" :mostrar="mostrarFicha" :indiceIndicador="indicador" />
      </div>
      <!-- <div id="boton">
        <a href="https://enflujo.com" target="_blank">
          <img class="boton" src="../assets/imgs/bajada.svg" />
        </a>
      </div> -->
    </header>
  </main>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '../assets/constantes.scss';

#indicadores {
  width: 50vw;
  margin-top: 2em;

  .indicador {
    display: flex;
    margin: 0.4em 0;
    border: 1px dotted;
    width: 84vw;
  }

  .columna {
    padding: 0.5em 1em;
  }

  .enlace {
    padding-left: 2em;
  }

  .nombre {
    font-weight: normal;
  }

  .ficha {
    cursor: pointer;
    width: 85px;
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

#fichaTecnica {
  position: relative;
  width: 100%;
  left: 2vw;
}

#contenedorFichas {
  position: absolute;
  display: flex;
  flex-direction: row;
  top: 0;
  right: 6vw;
  left: 2vw;
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

#masInfo {
  width: 1.5em;
  height: 1.5em;
  position: absolute;
  right: 1em;
  border-radius: 50%;
  color: black;
  border: 2px solid $colorOscuro;
  text-align: center;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: color.scale($colorOscuro, $lightness: 90%);
  }
}

// Teléfonos horizontal
@media (min-width: $minCelular) {
}
// Pantallas medianas (Tablets)
@media (min-width: $minTablet) {
  #indicadores {
    width: 50vw;
    margin-top: 2em;

    .indicador {
      display: flex;
      margin: 0.4em 0;
      border: 1px dotted;
      width: 55vw;
    }
  }
  #datos {
    margin: 5em;
  }
}
// Dispositivos grandes y pantallas medianas
@media (min-width: $minPantalla) {
  #indicadores {
    width: 50vw;
    margin-top: 2em;

    .indicador {
      display: flex;
      margin: 0.4em 0;
      border: 1px dotted;
      width: 55vw;
    }
  }
  #fichaTecnica {
    position: relative;
    width: 100%;
    left: 20vw;
  }
  #contenedorFichas {
    position: absolute;
    display: flex;
    flex-direction: row;
    top: 0;
    right: 20vw;
    left: 37vw;
  }
}
// Pantallas grandes
@media (min-width: $minPantallaGrande) {
  #indicadores {
    width: 50vw;
    margin-top: 2em;

    .indicador {
      display: flex;
      margin: 0.4em 0;
      border: 1px dotted;
      width: 55vw;
    }
  }
  #datos {
    width: 50vw;
    max-width: 900px;
  }
  #fichaTecnica {
    position: relative;
    width: 100%;
    left: 20vw;
  }
  #contenedorFichas {
    position: absolute;
    display: flex;
    flex-direction: row;
    top: 0;
    right: 22vw;
    left: 39vw;
  }
}
</style>
