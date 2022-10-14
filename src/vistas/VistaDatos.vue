<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { rutaBase } from '../utilidades/constantes';
import fuentes from '../utilidades/fuentes';
import FichaTecnica from '../componentes/FichaTecnica.vue';

import iconoDescarga from '../assets/imgs/bajada.svg';
const mostrarFicha = ref(false);
const indicador = ref(null);
const ficha = ref(null);
const pesos = ref([]);

onMounted(async () => {
  // Este archivo lo generamos en el tally, se debe actualizar el archivo en la bodega cuando cambien los datos.
  const datosPesos = await fetch(`${rutaBase}/pesosArchivos.json`).then((respuesta) => respuesta.json());

  fuentes.forEach((fuente) => {
    pesos.value.push(datosPesos[fuente.archivoDescarga]);
  });

  document.body.addEventListener('click', clicFuera);
});

onUnmounted(() => {
  document.body.removeEventListener('click', clicFuera);
});

function mostrarFichaTecnica(i) {
  indicador.value = i;
  mostrarFicha.value = true;
  console.log(indicador.value);
}

// POR HACER! Arreglar
function clicFuera(evento) {
  if (indicador.value) {
    if (!(ficha.value.contenedor === evento.target || ficha.value.contenedor.contains(evento.target))) {
      if (!evento.target.classList.contains('ficha')) {
        mostrarFicha.value = false;
        indicador.value = null;
      }
    }
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
          <p class="columna enlace">
            <a :href="`${rutaBase}/${fuente.archivoDescarga}.zip`" download>
              <span class="nombre">{{ fuente.nombreIndicador + ' ' }}</span>
              <span class="peso">({{ pesos[i] }})</span>
              <img class="iconoDescarga" :src="iconoDescarga" alt="Icono Descarga" />
            </a>
          </p>

          <span class="columna ficha" :class="indicador === i ? 'activo' : ''" @click="mostrarFichaTecnica(i)">
            Ficha Técnica
          </span>
        </div>
      </div>

      <div id="contenedorFichas">
        <FichaTecnica v-if="indicador !== null" ref="ficha" :mostrar="mostrarFicha" :indiceIndicador="indicador" />
      </div>
    </header>
  </main>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '../assets/constantes.scss';

.iconoDescarga {
  width: 22px;
  margin-left: 0.5em;
  vertical-align: bottom;
}

#indicadores {
  width: 50vw;
  margin-top: 2em;

  .indicador {
    display: flex;
    margin: 0.4em 0;
    border: 1px dotted;
    justify-content: space-between;
  }

  .columna {
    padding: 0.5em 1em;
  }

  .nombre {
    font-weight: normal;
  }

  .ficha {
    cursor: pointer;
    width: 85px;

    &.activo {
      background-color: $colorFondoClaro2;
    }
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
  // right: 6vw;
  // left: 2vw;
  overflow: auto;
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
    }
  }
  #datos {
    width: 50vw;
    max-width: 900px;
  }

  #contenedorFichas {
    position: fixed;
    right: 0;
    width: 45vw;
    left: auto;
    top: 50px;

    #fichaTecnica {
      position: relative;
      width: 100%;
      display: block;
      left: auto;
      top: 0;
      max-height: calc(100vh - 50px);
    }
  }
}
</style>
