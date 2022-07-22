<script setup>
import { usarCerebroDatos } from '../cerebro/datos';
import fuentes from '../utilidades/fuentes';

const cerebroDatos = usarCerebroDatos();
</script>

<template>
  <ul id="menuIndicadores" class="contenedorMenu">
    <li
      v-for="(indicador, i) in fuentes"
      @click="cerebroDatos.cambiarIndicador(i)"
      :key="indicador.nombreIndicador"
      class="botonIndicador"
      :class="i === cerebroDatos.indice ? 'activo' : ''"
    >
      {{ indicador.nombreIndicador }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

#menuIndicadores {
  width: 18vw;
  font-size: 0.9em;
  font-family: $fuenteTexto;
  top: 15vh;
  left: 2vw;
  position: relative;
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
