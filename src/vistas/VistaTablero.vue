<script setup>
import { ref } from 'vue';
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
import { onMounted, onUnmounted } from 'vue-demi';
import { usarCerebroDatos } from '../cerebro/datos';

// const indicadorActual = ref(0);
const añoMin = 2005;
const añoMax = 2020;
const años = [];
const anchoDerecha = ref(0);
const seccionDerecha = ref(null);
const mostrarFicha = ref(false);
const cerebroGlobales = usarCerebroGlobales();
const cerebroDatos = usarCerebroDatos();

onMounted(() => {
  actualizarDims();
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
  anchoDerecha.value = seccionDerecha.value.clientWidth - 10;
}

for (let n = añoMin; n <= añoMax; n++) {
  años.push(n);
}

cerebroGlobales.cambiarNivel();
</script>

<template>
  <div id="contenedorGeneral">
    <div id="seccionIzquierda">
      <MenuIndicadores />
      <FichaTecnica />
    </div>
    <div id="seccionCentral">
      <div id="filtros">
        <MenuAños :años="años" />
        <ul id="menuVistaLugar">
          <li @click="cerebroGlobales.cambiarNivel('departamentos')" class="nivel">Departamentos</li>
          <li @click="cerebroGlobales.cambiarNivel('municipios')" class="nivel">Municipios</li>
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
  margin-left: 1em;
  display: flex;

  #indicadorSeleccionado {
    position: relative;
    color: #0041bf;
    font-size: 1.4em;
    width: 50%;
    margin: 1em;
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
  width: 50vw;
}

#seccionDerecha {
  // margin-top: 100px;
  position: relative;
  width: 30vw;
  margin-right: 50px;
}
</style>
