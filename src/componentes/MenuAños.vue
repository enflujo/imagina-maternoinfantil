<script setup>
import { usarCerebroGlobales } from '../cerebro/globales';

const props = defineProps({
  años: Object,
});

const cerebroGlobales = usarCerebroGlobales();
</script>

<template>
  <ul id="menuAños">
    <li
      v-for="n in props.años"
      :key="n"
      @click="cerebroGlobales.actualizarAño(n)"
      :class="n === cerebroGlobales.año ? 'actual' : ''"
    >
      {{ n }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
}

li {
  background-color: aquamarine;
  padding: 0.5em;
  margin: 0 0.3em;
  font-size: 0.9em;
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
