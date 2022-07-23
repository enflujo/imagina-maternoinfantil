<script setup>
// import { ref } from 'vue';
import Mapa from '../componentes/MapaElemento.vue';
import MenuIndicadores from '../componentes/MenuIndicadores.vue';
import MenuAños from '../componentes/MenuAños.vue';
// import LeyendaColor from '../componentes/LeyendaColor.vue';
// import fuentes from '../utilidades/fuentes';
import LineaTiempo from '../componentes/LineaTiempo.vue';
import ModuloLista from '../componentes/ModuloLista.vue';
import { usarCerebroGlobales } from '../cerebro/globales';

// const indicadorActual = ref(0);
const añoMin = 2005;
const añoMax = 2020;
const años = [];

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
        <!-- <h2 id="indicadorSeleccionado">{{ fuentes[indicadorActual].nombreIndicador }}</h2> -->
      </div>

      <Mapa />
      <!--  <LeyendaColor :colores="colores" :porcentajeMin="porcentajeMin" :porcentajeMax="porcentajeMax" /> -->
    </div>

    <div id="seccionDerecha">
      <LineaTiempo />
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
  margin-left: 1em;

  #indicadorSeleccionado {
    font-size: 1.4em;
    width: 60%;
    margin-left: 40px;
  }
}

#seccionCentral {
  width: 50vw;
}

#seccionDerecha {
  // margin-top: 100px;
  position: relative;
  width: 30vw;
}
</style>
