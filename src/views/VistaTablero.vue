<script setup>
import { ref } from 'vue';
import Mapa from '../componentes/MapaElemento.vue';
import MenuIndicadores from '../componentes/MenuIndicadores.vue';
import fuentes from '../utilidades/fuentes';
const datos = ref([]);
const formaDepartamentos = ref([]);
const rutaBase = 'https://enflujo.com/bodega';
const año = ref(2015);
const indicadorActual = ref(-1);
const nivel = 'departamentos';

async function cambiarIndicador(indiceIndicador) {
  if (indicadorActual.value !== indiceIndicador) {
    const { nombreArchivo } = fuentes[indiceIndicador];
    const respuesta = await fetch(`${rutaBase}/mi_v2/${nombreArchivo}-${nivel}.json`);
    datos.value = await respuesta.json();
    indicadorActual.value = indiceIndicador;
  }
}

async function cargarGeojson(nombre) {
  const respuesta = await fetch(`${rutaBase}/${nombre}.json`);
  formaDepartamentos.value = await respuesta.json();
}

cargarGeojson(nivel);
cambiarIndicador(0);
</script>

<template>
  <main>
    <MenuIndicadores :cambiarIndicador="cambiarIndicador" :indicadorActual="indicadorActual" />
    <Mapa :geojson="formaDepartamentos" :datos="datos" :año="año" />
  </main>
</template>

<style lang="scss" scoped></style>
