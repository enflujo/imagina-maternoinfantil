<script setup>
import { ref } from 'vue';
import Mapa from '@/components/MapaElemento.vue';
import fuentes from '@/utilidades/fuentes';
const datos = ref([]);
const formaDepartamentos = ref([]);
const año = ref(2015);
const rutaBase = 'https://enflujo.com/bodega';

async function cambiarIndicador(nombreArchivo) {
  const respuesta = await fetch(`${rutaBase}/mi_v2/${nombreArchivo}-departamentos.json`);
  datos.value = await respuesta.json();
}

async function cargarFormaDepartamentos() {
  const respuesta = await fetch(`${rutaBase}/departamentos.json`);
  formaDepartamentos.value = await respuesta.json();
}

cargarFormaDepartamentos();
</script>

<template>
  <main>
    <ul id="menuIndicadores" class="contenedorMenu">
      <li
        v-for="indicador in fuentes"
        @click="cambiarIndicador(indicador.nombreArchivo)"
        :key="indicador.nombreIndicador"
        class="botonIndicador"
      >
        {{ indicador.nombreIndicador }}
      </li>
    </ul>

    <Mapa :forma="formaDepartamentos" :datos="datos" :año="año"></Mapa>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

#menuIndicadores {
  width: 35vw;
  font-size: 0.9em;
  font-family: $fuenteTexto;
}

.contenedorMenu {
  list-style: none;
}

.botonIndicador {
  cursor: pointer;
  padding: 0.5em;
  border-bottom: 1px solid;

  &:hover {
    opacity: 0.6;
  }
}
</style>
