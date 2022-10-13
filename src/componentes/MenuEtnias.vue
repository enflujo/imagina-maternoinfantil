<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { usarCerebroDatos } from '../cerebro/datos';
import { usarCerebroGlobales } from '../cerebro/globales';
import { etnias } from '../utilidades/constantes';

const cerebroGlobales = usarCerebroGlobales();
const cerebroDatos = usarCerebroDatos();
const contenedor = ref(null);
const tituloEtnia = ref('');

const mostrarMenu = ref(false);
const nombreEtniaSeleccionada = computed(() => {
  if (cerebroGlobales.etniaSeleccionada) {
    if (cerebroGlobales.etniaSeleccionada.codigo !== 0) {
      return cerebroGlobales.etniaSeleccionada.nombre;
    }
  }
  return 'Mostrar línea por etnia';
});

function abrirMenu() {
  mostrarMenu.value = !mostrarMenu.value;
}

onMounted(() => {
  document.body.addEventListener('click', clicFuera);
});

onUnmounted(() => {
  document.body.removeEventListener('click', clicFuera);
});

function clicFuera(evento) {
  if (cerebroGlobales.nivel === 'departamentos') {
    if (contenedor) {
      if (!(contenedor.value === evento.target || contenedor.value.contains(evento.target))) {
        mostrarMenu.value = false;
      }
    }
  }
}

function actualizarEtnia(etnia) {
  cerebroGlobales.actualizarEtnia(etnia);
}
</script>

<template>
  <nav ref="contenedor" v-if="cerebroGlobales.nivel === 'departamentos'">
    <span @click="abrirMenu" class="boton cuadro desplegable" id="titulo">{{ nombreEtniaSeleccionada }}</span>
    <ul id="menuEtnias" :style="`display:${mostrarMenu ? 'block' : 'none'}`">
      <li
        v-for="etnia in etnias"
        :key="etnia"
        @click="actualizarEtnia(etnia)"
        class="opcionEtnia cuadro"
        :class="etnia === cerebroGlobales.etniaSeleccionada ? 'actual' : ''"
      >
        {{ etnia.nombre }}
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/constantes.scss';

nav {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 210px;
  margin-bottom: 4em;
  max-height: 1em;

  #menuEtnias {
    display: none;
    position: absolute;
    top: 2em;
    width: 100%;
    z-index: 2;
    text-transform: none;
  }

  &:hover #menuEtnias {
    display: block;
  }
}

.cuadro {
  padding: 0.3em 1.5em 0.3em 0.5em;
  cursor: pointer;
}

.opcionEtnia {
  background-color: $colorOscuro;
  color: $colorBlanco;
  border-bottom: 2px solid $colorBlanco;
  transition: all 0.15s ease-in;

  &:hover {
    background-color: color.scale($colorOscuro, $lightness: 30%);
  }

  &.actual {
    background-color: color.scale($colorOscuro, $lightness: 90%);
    color: $colorOscuro;
  }
}
</style>
