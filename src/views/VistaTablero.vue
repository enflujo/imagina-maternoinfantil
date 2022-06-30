<script setup>
import { ref } from 'vue';
import Mapa from '@/components/MapaElemento.vue';
import fuentes from '@/utilidades/fuentes';
const datos = ref([]);
const formaDepartamentos = ref([]);
const rutaBase = 'https://enflujo.com/bodega';
const año = ref(2015);
const indicadorActual = ref(-1);

async function cambiarIndicador(indiceIndicador) {
  if (indicadorActual.value !== indiceIndicador) {
    const { nombreArchivo } = fuentes[indiceIndicador];
    const respuesta = await fetch(`${rutaBase}/mi_v2/${nombreArchivo}-departamentos.json`);
    datos.value = await respuesta.json();
    indicadorActual.value = indiceIndicador;
  }
}

async function cargarGeojson(nombre) {
  const respuesta = await fetch(`${rutaBase}/${nombre}.json`);
  formaDepartamentos.value = await respuesta.json();
}

cargarGeojson('departamentos');
cambiarIndicador(0);
</script>

<template>
  <main>
    <ul id="menuIndicadores" class="contenedorMenu">
      <li
        v-for="(indicador, i) in fuentes"
        @click="cambiarIndicador(i)"
        :key="indicador.nombreIndicador"
        class="botonIndicador"
        :class="i === indicadorActual ? 'activo' : ''"
      >
        {{ indicador.nombreIndicador }}
      </li>
    </ul>

    <Mapa :geojson="formaDepartamentos" :datos="datos" :año="año"></Mapa>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

#menuIndicadores {
  width: 35vw;
  font-size: 0.9em;
  font-family: $fuenteTexto;
  position: fixed;
}

.contenedorMenu {
  list-style: none;
}

.botonIndicador {
  cursor: pointer;
  padding: 0.5em;
  border-bottom: 1px solid;
  opacity: 0.8;

  &:hover {
    opacity: 0.6;
  }

  &.activo {
    opacity: 1;
    font-weight: bold;
  }
}
</style>
