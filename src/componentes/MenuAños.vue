<script setup>
import { usarCerebroDatos } from '../cerebro/datos';
import { usarCerebroGlobales } from '../cerebro/globales';
import { ref } from 'vue';

const cerebroGlobales = usarCerebroGlobales();
const cerebroDatos = usarCerebroDatos();

const mostrarMenu = ref(false);

function abrirMenu() {
  mostrarMenu.value = !mostrarMenu.value;
}
</script>

<template>
  <nav>
    <span @click="abrirMenu()" class="boton cuadro desplegable">{{ cerebroGlobales.año }}</span>
    <ul id="menuAños" :style="`display:${mostrarMenu ? 'block' : 'none'}`">
      <li
        v-for="n in cerebroDatos.años"
        :key="n"
        @click="cerebroGlobales.actualizarAño(n)"
        class="opcionAño cuadro"
        :class="n === cerebroGlobales.año ? 'actual' : ''"
      >
        {{ n }}
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
  width: 90px;

  #menuAños {
    display: none;
    position: absolute;
    top: 2em;
    width: 100%;
    z-index: 2;
  }

  &:hover #menuAños {
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
