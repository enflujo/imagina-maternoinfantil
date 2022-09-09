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
import Guardaescobas from '../componentes/SeccionGuardaescobas.vue';

import { usarCerebroGlobales } from '../cerebro/globales';
import { usarCerebroDatos } from '../cerebro/datos';

const anchoDerecha = ref(0);
const seccionDerecha = ref(null);
const cerebroGlobales = usarCerebroGlobales();
const cerebroDatos = usarCerebroDatos();
const mostrarFicha = ref(false);
const ficha = ref(null);

onMounted(() => {
  actualizarDims();
  cerebroGlobales.cambiarNivel();
  window.addEventListener('resize', actualizarDims);
  document.body.addEventListener('click', clicFuera);
});

onUnmounted(() => {
  window.removeEventListener('resize', actualizarDims);
  document.body.removeEventListener('click', clicFuera);
});

const mostrarFichaTecnica = (evento) => {
  evento.stopPropagation();
  mostrarFicha.value = !mostrarFicha.value;
};

function clicFuera(evento) {
  if (!(ficha.value.contenedor === evento.target || ficha.value.contenedor.contains(evento.target))) {
    mostrarFicha.value = false;
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
    </div>

    <div id="seccionCentral">
      <FichaTecnica ref="ficha" :mostrar="mostrarFicha" />

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

        <div v-if="cerebroDatos" id="indicadorSeleccionado">
          <h3>{{ fuentes[cerebroDatos.indice].nombreIndicador }}</h3>
          <span id="masInfo" ref="masInfo" @click="mostrarFichaTecnica">{{ mostrarFicha ? 'X' : '?' }}</span>
        </div>
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
@use 'sass:color';
@import '@/assets/constantes.scss';

#contenedorGeneral {
  display: flex;
  margin-top: $tamañoEncabezado;
  margin-right: 0.1em;
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
    width: 50%;
    margin-left: 1em;
    background-color: white;
    padding: 1em;
    border: 3px solid #0041bf;

    h3 {
      font-size: 1em;
    }
  }
}

#masInfo {
  width: 1.5em;
  height: 1.5em;
  position: absolute;
  transform: translate(-50%, 50%);
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background-color: white;
  border: 2px solid $colorOscuro;
  text-align: center;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: color.scale($colorOscuro, $lightness: 90%);
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
