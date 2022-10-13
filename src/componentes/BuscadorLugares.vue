<script setup>
import { ref } from 'vue';
import fuzzysort from 'fuzzysort';
import { usarCerebroDatos } from '../cerebro/datos';

const lugares = ref([]);
const nombreLugar = ref('');
const cerebroDatos = usarCerebroDatos();

// Buscar coincidencias del texto escrito en la lista de lugares
function buscar(texto) {
  if (!texto) {
    lugares.value = [];
    return;
  }

  nombreLugar.value = texto;
  const respuesta = fuzzysort.go(texto, cerebroDatos.datos, { key: 'nombre' });

  if (respuesta.length) {
    lugares.value = respuesta;
  }
}

// Elegir un lugar de la lista
function elegirDeLista(lugar) {
  lugares.value = [];

  // Buscar el lugar que coincida con el código del lugar seleccionado
  const lugarSeleccionado = cerebroDatos.datos.find((obj) => obj.codigo === lugar);

  if (lugarSeleccionado) {
    // Cambiar lugar seleccionado
    cerebroDatos.actualizarDatosLugar(lugarSeleccionado);
    nombreLugar.value = lugarSeleccionado.nombre;
  }
}
</script>

<template>
  <input
    id="buscador"
    type="search"
    @input="buscar(nombreLugar)"
    v-model="nombreLugar"
    placeholder="Búsqueda por lugar"
  />

  <ul id="sugerencias">
    <li class="lugarLista" v-for="lugar in lugares" :key="lugar" @click="elegirDeLista(lugar.obj.codigo)">
      {{ lugar.target }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/constantes.scss';
#buscador {
  margin: 3em 0em 0.5em 1em;
  border: $colorOscuro solid 2px;
  width: fit-content;
  font-family: $fuenteTexto;
  color: $colorOscuro;
  font-weight: $fuentePesoNegrita;
  text-transform: capitalize;
  outline: none;
  padding: 0.5em;

  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: lighten($colorOscuro, 10%);
    opacity: 0.8; /* Firefox */
    font-weight: $fuentePesoNegrita;
  }
}

.lugarLista {
  padding: 0.5em 1em 0.5em 0.5em;

  &:hover {
    cursor: pointer;
    background-color: rgba($colorVerdeResaltado, 0.9);
  }
}

#sugerencias {
  display: block;
  position: absolute;
  background-color: rgba($colorBlanco, 0.9);
  z-index: 9;
  margin: 0 0 0 0.8em;
  max-width: 400px;
}
</style>
