<script setup>
import { ref } from 'vue';
import Mapa from '../componentes/MapaElemento.vue';
import MenuIndicadores from '../componentes/MenuIndicadores.vue';
import MenuAños from '../componentes/MenuAños.vue';
// import LeyendaColor from '../componentes/LeyendaColor.vue';
import fuentes from '../utilidades/fuentes';
import { extremosPorcentaje } from '../utilidades/procesador';
import LineaTiempo from '../componentes/LineaTiempo.vue';

const datos = ref([]);
const datosLugar = ref(null);
const lugarSeleccionado = ref(null);
const formaDepartamentos = ref([]);
const rutaBase = 'https://enflujo.com/bodega';
const año = ref(2015);
const indicadorActual = ref(0);
const nivel = ref('departamentos');
const colores = ['#BEEFED', '#0042BF'];
const porcentajeMax = ref(null);
const porcentajeMin = ref(null);
const añoMin = 2015;
const añoMax = 2020;
const años = [];
for (let n = añoMin; n <= añoMax; n++) {
  años.push(n);
}

async function cambiarIndicador(indiceIndicador, forzar) {
  if (forzar || indicadorActual.value !== indiceIndicador) {
    const { nombreArchivo } = fuentes[indiceIndicador];
    const respuesta = await fetch(`${rutaBase}/mi_v2/${nombreArchivo}-${nivel.value}.json`);

    const datosIndicador = await respuesta.json();
    datos.value = datosIndicador;

    indicadorActual.value = indiceIndicador;

    definirPorcentajes();
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

function definirPorcentajes() {
  const extremosP = extremosPorcentaje(datos.value, año.value);
  porcentajeMin.value = extremosP.porcentajeMin;
  porcentajeMax.value = extremosP.porcentajeMax;
}

function actualizarAño(nuevoAño) {
  if (nuevoAño === año.value) return;
  año.value = nuevoAño;
  definirPorcentajes();
}

function actualizarVistaLugar(datos, lugar) {
  datosLugar.value = datos;
  lugarSeleccionado.value = lugar;
}

cambiarNivel(nivel.value);
</script>

<template>
  <main>
    <MenuIndicadores :cambiarIndicador="cambiarIndicador" :indicadorActual="indicadorActual" />

    <div id="seccionCentral">
      <div id="filtros">
        <ul id="menuVistaLugar">
          <li @click="() => cambiarNivel('departamentos')" class="nivel">Departamentos</li>
          <li @click="() => cambiarNivel('municipios')" class="nivel">Municipios</li>
        </ul>
        <MenuAños :años="años" :actualizarAño="actualizarAño" :añoActual="año" />
        <h2 id="indicadorSeleccionado">{{ fuentes[indicadorActual].nombreIndicador }}</h2>
      </div>
      <Mapa
        :geojson="formaDepartamentos"
        :datos="datos"
        :año="año"
        :colores="colores"
        :nivel="nivel"
        :actualizarVistaLugar="actualizarVistaLugar"
      />
      <!--  <LeyendaColor :colores="colores" :porcentajeMin="porcentajeMin" :porcentajeMax="porcentajeMax" /> -->
    </div>

    <div id="seccionDerecha">
      <LineaTiempo
        :años="años"
        :datos="datosLugar"
        :indicadorActual="indicadorActual"
        :lugarActual="lugarSeleccionado"
      />
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
