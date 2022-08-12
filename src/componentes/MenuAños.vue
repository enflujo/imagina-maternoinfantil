<script setup>
import { usarCerebroGlobales } from '../cerebro/globales';

const props = defineProps({
  años: Object,
});

const cerebroGlobales = usarCerebroGlobales();
</script>

<template>
  <nav>
    <span class="boton cuadro desplegable">{{ cerebroGlobales.año }}</span>
    <ul id="menuAños">
      <li
        v-for="n in props.años"
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
  // padding-right: 1.7em;
  transition: all 0.15s ease-in;

  &:hover {
    background-color: color.scale($colorOscuro, $lightness: 30%);
  }

  &.actual {
    background-color: color.scale($colorOscuro, $lightness: 90%);
    color: $colorOscuro;
  }
}

// li {
//   display: block;
//   background-color: aquamarine;
//   padding: 0.5em;
//   margin: 0 0.3em;
//   font-size: 0.8em;
//   cursor: pointer;
//   transition: all 0.25s ease-in-out;

//   &:hover {
//     background-color: rgb(47, 201, 149);
//   }

//   &.actual {
//     background-color: rgb(82, 191, 154);
//     color: white;
//   }
// }
</style>
