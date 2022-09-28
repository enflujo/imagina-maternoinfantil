<script setup>
import { ref } from 'vue-demi';
import fuzzysort from 'fuzzysort';
import { usarCerebroDatos } from '../cerebro/datos';

const lugares = ref([]);
const nombreLugar = ref('');
const cerebroDatos = usarCerebroDatos();

// Buscar coincidencias del texto escrito en la lista de lugares
function buscar(texto) {
  nombreLugar.value = texto;
  const respuesta = fuzzysort.go(texto, cerebroDatos.datos, { key: 'nombre' });

  if (respuesta.length) {
    lugares.value = respuesta;
  }
}

// Elegir un lugar de la lista
function elegirDeLista(lugar) {
  lugares.value = [];
  const lugarSeleccionado = cerebroDatos.datos.find((obj) => obj.nombre === lugar);

  if (lugarSeleccionado) {
    // Cambiar lugar seleccionado
    cerebroDatos.actualizarDatosLugar(lugarSeleccionado);
    nombreLugar.value = lugarSeleccionado.nombre;
  }
}
</script>

<template>
  <div id="buscador">
    <input type="search" @input="buscar(nombreLugar)" v-model="nombreLugar" placeholder="Búsqueda por lugar" />
    <ul v-for="lugar in lugares" :key="lugar">
      <li @click="elegirDeLista(lugar.target)" id="lugarLista">{{ lugar.target }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';
#buscador {
  margin: 3em 0em 0em 1em;
  border: $colorOscuro solid 2px;
  width: fit-content;
  border-radius: 5px;
  font-family: $fuenteTexto;
  color: $colorOscuro;
  font-weight: $fuentePesoNegrita;
  text-transform: capitalize;

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: $colorOscuro;
    opacity: 1; /* Firefox */
    font-weight: $fuentePesoNegrita;
  }

  #lugarLista {
    padding: 0.1em 0.2em;
    cursor: pointer;
  }
}
</style>
