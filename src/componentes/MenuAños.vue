<script setup>
import { usarCerebroGlobales } from '../cerebro/globales';

const props = defineProps({
  años: Object,
});

const cerebroGlobales = usarCerebroGlobales();
</script>

<template>
  <nav>
    <span class="boton">{{ cerebroGlobales.año }}</span>
    <ul id="menuAños">
      <li
        v-for="n in props.años"
        :key="n"
        @click="cerebroGlobales.actualizarAño(n)"
        class="opcionAño"
        :class="n === cerebroGlobales.año ? 'actual' : ''"
      >
        {{ n }}
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';
$tamañoTriangulo: 6px;

nav {
  // width: 4.6em;
  ul {
    display: none;
  }

  &:hover ul {
    display: block;
  }
}

ul {
  display: flex;
  flex-direction: column;

  text-align: center;
  margin: 0.4em 0 0 0;
  position: absolute;
}

.boton {
  position: relative;
  display: inline;
  padding: 0.3em 1em 0.3em;
  border: 2px solid $colorOscuro;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-top: solid $tamañoTriangulo $colorBlanco;
    border-left: solid $tamañoTriangulo transparent;
    border-right: solid $tamañoTriangulo transparent;
    top: 0.7em;
    right: $tamañoTriangulo;
  }
}

li {
  display: block;
  background-color: aquamarine;
  padding: 0.5em;
  margin: 0 0.3em;
  font-size: 0.8em;
  cursor: pointer;
  transition: all 0.25s ease-in-out;

  &:hover {
    background-color: rgb(47, 201, 149);
  }

  &.actual {
    background-color: rgb(82, 191, 154);
    color: white;
  }
}
</style>
