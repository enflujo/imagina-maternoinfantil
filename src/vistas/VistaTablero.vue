<script setup>
import { ref } from 'vue';
import Mapa from '../componentes/MapaElemento.vue';
import MenuIndicadores from '../componentes/MenuIndicadores.vue';
import MenuAños from '../componentes/MenuAños.vue';
// import LeyendaColor from '../componentes/LeyendaColor.vue';
import fuentes from '../utilidades/fuentes';
import LineaTiempo from '../componentes/LineaTiempo.vue';
import ModuloLista from '../componentes/ModuloLista.vue';
import { usarCerebroDatos } from '../cerebro/datos';
import { usarCerebroGlobales } from '../cerebro/globales';

const datos = ref([]);
const año = ref(2015);
const indicadorActual = ref(0);
const añoMin = 2015;
const añoMax = 2020;
const años = [];

const cerebroDatos = usarCerebroDatos();
const cerebroGlobales = usarCerebroGlobales();

for (let n = añoMin; n <= añoMax; n++) {
  años.push(n);
}

cerebroGlobales.cambiarNivel();
</script>

<template>
  <main>
    <MenuIndicadores />

    <div id="seccionCentral">
      <div id="filtros">
        <ul id="menuVistaLugar">
          <li @click="cerebroGlobales.cambiarNivel('departamentos')" class="nivel">Departamentos</li>
          <li @click="cerebroGlobales.cambiarNivel('municipios')" class="nivel">Municipios</li>
        </ul>
        <MenuAños :años="años" />
        <h2 id="indicadorSeleccionado">{{ fuentes[indicadorActual].nombreIndicador }}</h2>
      </div>

      <Mapa />
      <!--  <LeyendaColor :colores="colores" :porcentajeMin="porcentajeMin" :porcentajeMax="porcentajeMax" /> -->
    </div>

    <div id="seccionDerecha">
      <LineaTiempo :años="años" />
      <ModuloLista />
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
}
.nivel {
  cursor: pointer;
}

#filtros {
  left: 10vw;
  width: 100%;
  height: fit-content;
  position: relative;

  #indicadorSeleccionado {
    font-size: 1.4em;
    width: 60%;
    margin-left: 40px;
  }
}

#seccionCentral {
  position: relative;
  width: 45vw;
  left: 7px;
}

#seccionDerecha {
  margin-top: 100px;
  position: relative;
  width: 30vw;
}
</style>
