<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Mapa from '../componentes/MapaElemento.vue';
import MenuIndicadores from '../componentes/MenuIndicadores.vue';
import MenuAños from '../componentes/MenuAños.vue';
// import LeyendaColor from '../componentes/LeyendaColor.vue';
// import fuentes from '../utilidades/fuentes';
import LineaTiempo from '../componentes/LineaTiempo.vue';
import ModuloLista from '../componentes/ModuloLista.vue';
import FichaTecnica from '../componentes/FichaTecnica.vue';
import fuentes from '../utilidades/fuentes';

import { usarCerebroGlobales } from '../cerebro/globales';
import { usarCerebroDatos } from '../cerebro/datos';
import Guardaescobas from '../componentes/Guardaescobas.vue';

const anchoDerecha = ref(0);
const seccionDerecha = ref(null);
const cerebroGlobales = usarCerebroGlobales();
const cerebroDatos = usarCerebroDatos();

onMounted(() => {
  actualizarDims();
  cerebroGlobales.cambiarNivel();
  window.addEventListener('resize', actualizarDims);
});

onUnmounted(() => {
  window.removeEventListener('resize', actualizarDims);
});

function mostrarFichaTecnica() {
  const fichaTecnica = document.getElementById('fichaTecnica');
  const botonFicha = document.getElementById('masInfo');

  cerebroGlobales.mostrarFicha = !cerebroGlobales.mostrarFicha;

  if (cerebroGlobales.mostrarFicha === true) {
    fichaTecnica.style.visibility = 'visible';
    botonFicha.innerText = 'X';
  } else {
    fichaTecnica.style.visibility = 'hidden';
    botonFicha.innerText = '?';
  }
}

function actualizarDims() {
  anchoDerecha.value = seccionDerecha.value.clientWidth;
}
</script>

<template>
  <div id="contenedorGeneral">
    <div id="seccionIzquierda">
      <MenuIndicadores />
      <FichaTecnica />
    </div>

    <div id="seccionCentral">
      <div id="filtros">
        <MenuAños />
        <ul id="menuVistaLugar">
          <li
            @click="cerebroGlobales.cambiarNivel('departamentos')"
            class="nivel boton"
            :class="cerebroGlobales.nivel === 'departamentos' ? 'activo' : ''"
          >
            Departamentos
          </li>
          <li
            @click="cerebroGlobales.cambiarNivel('municipios')"
            class="nivel boton"
            :class="cerebroGlobales.nivel === 'municipios' ? 'activo' : ''"
          >
            Municipios
          </li>
        </ul>

        <h2 v-if="cerebroDatos" id="indicadorSeleccionado">
          {{ fuentes[cerebroDatos.indice].nombreIndicador }}
          <div @click="mostrarFichaTecnica" id="masInfo">?</div>
        </h2>
      </div>

      <Mapa />
      <!--  <LeyendaColor :colores="colores" :porcentajeMin="porcentajeMin" :porcentajeMax="porcentajeMax" /> -->
    </div>

    <div id="seccionDerecha" ref="seccionDerecha">
      <LineaTiempo :ancho="anchoDerecha" />
      <ModuloLista />
    </div>
  </div>
  <Guardaescobas />
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

#contenedorGeneral {
  display: flex;
  margin-top: $tamañoEncabezado;
}

.nivel {
  cursor: pointer;
}

#filtros {
  margin: 1em;
  display: flex;

  #indicadorSeleccionado {
    position: relative;
    color: #0041bf;
    font-size: 1em;
    width: 50%;
    margin-left: 1em;
    background-color: white;
    padding: 1em;
    border: 3px solid #0041bf;

    #masInfo {
      width: 1.5em;
      height: 1.5em;
      position: absolute;
      right: 8%;
      bottom: -15%;
      border-radius: 50%;
      background-color: white;
      border: 1px solid #0041bf;
      text-align: center;
      padding-top: 0.11em;
      cursor: pointer;
    }
  }
}

#seccionCentral {
  width: 40vw;
}

#seccionDerecha {
  position: relative;
  width: 40vw;
  margin-right: 30px;
}

#menuVistaLugar {
  display: flex;
  margin-left: 1em;
  flex-direction: column;
}
</style>
