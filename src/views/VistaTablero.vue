<script setup>
import { ref } from 'vue';
import Mapa from '../componentes/MapaElemento.vue';
import MenuIndicadores from '../componentes/MenuIndicadores.vue';
import fuentes from '../utilidades/fuentes';
import LeyendaColor from '../componentes/LeyendaColor.vue';

const datos = ref([]);
const formaDepartamentos = ref([]);
const rutaBase = 'https://enflujo.com/bodega';
const año = ref(2015);
const indicadorActual = ref(0);
const nivel = ref('departamentos');
const colores = ['#BEEFED', '#0042BF'];

async function cambiarIndicador(indiceIndicador, forzar) {
  if (forzar || indicadorActual.value !== indiceIndicador) {
    const { nombreArchivo } = fuentes[indiceIndicador];
    const respuesta = await fetch(`${rutaBase}/mi_v2/${nombreArchivo}-${nivel.value}.json`);

    const datosIndicador = await respuesta.json();

    let porcentajeMin = Infinity;
    let porcentajeMax = -Infinity;

    datosIndicador.forEach((lugar) => {
      for (const año in lugar.datos) {
        const porcentaje = lugar.datos[año][2];
        porcentajeMin = porcentaje < porcentajeMin ? porcentaje : porcentajeMin;
        porcentajeMax = porcentaje > porcentajeMax ? porcentaje : porcentajeMax;
      }
    });
    console.log(datosIndicador, porcentajeMin, porcentajeMax);
    datos.value = datosIndicador;
    indicadorActual.value = indiceIndicador;
  }
}

async function cargarGeojson() {
  const respuesta = await fetch(`${rutaBase}/${nivel.value}.json`);
  formaDepartamentos.value = await respuesta.json();
}

async function cambiarNivel(valor) {
  nivel.value = valor;
  await cargarGeojson();
  await cambiarIndicador(indicadorActual.value, true);
}

cambiarNivel(nivel.value);
</script>

<template>
  <main>
    <ul>
      <li @click="() => cambiarNivel('departamentos')" class="nivel">Departamentos</li>
      <li @click="() => cambiarNivel('municipios')" class="nivel">Municipios</li>
    </ul>
    <MenuIndicadores :cambiarIndicador="cambiarIndicador" :indicadorActual="indicadorActual" />
    <LeyendaColor :colores="colores" />
    <Mapa :geojson="formaDepartamentos" :datos="datos" :año="año" :colores="colores" />
  </main>
</template>

<style lang="scss" scoped>
.nivel {
  cursor: pointer;
}
</style>
