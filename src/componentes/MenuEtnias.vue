<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { usarCerebroDatos } from '../cerebro/datos';
import { usarCerebroGlobales } from '../cerebro/globales';
import { etnias } from '../utilidades/constantes';

const cerebroGlobales = usarCerebroGlobales();
const cerebroDatos = usarCerebroDatos();
const contenedor = ref(null);

const mostrarMenu = ref(false);

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
  if (!(contenedor.value === evento.target || contenedor.value.contains(evento.target))) {
    mostrarMenu.value = false;
  }
}
</script>

<template>
  <nav ref="contenedor">
    <span @click="abrirMenu" class="boton cuadro desplegable">Etnias</span>
    <ul id="menuEtnias" :style="`display:${mostrarMenu ? 'block' : 'none'}`">
      <li
        v-for="etnia in etnias"
        :key="etnia"
        @click="cerebroGlobales.actualizarEtnia(etnia)"
        class="opcionEtnia cuadro"
        :class="etnia === cerebroGlobales.etniaSeleccionada ? 'actual' : ''"
      >
        {{ etnia }}
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
  width: 120px;

  #menuEtnias {
    display: none;
    position: absolute;
    top: 2em;
    width: 100%;
    z-index: 2;
  }

  &:hover #menuEtnias {
    display: block;
  }
}

.cuadro {
  padding: 0.3em 1.5em 0.3em;
  cursor: pointer;
}

.opcionAño {
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
