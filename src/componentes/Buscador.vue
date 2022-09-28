<script setup>
import { ref } from 'vue-demi';
import fuzzysort from 'fuzzysort';
import { usarCerebroGlobales } from '../cerebro/globales';
import { usarCerebroDatos } from '../cerebro/datos';

const lugares = ref([]);
const lugar = ref('');
const nombreLugar = ref('');
const cerebroGlobales = usarCerebroGlobales();
const cerebroDatos = usarCerebroDatos();

// TODO Traer lista de deptos y municipios de otro lado
//const lugares = cerebroDatos.l;
const departamentos = [
  { id: 1, nombre: 'Amazonas' },
  { id: 2, nombre: 'Antioquia' },
  { id: 3, nombre: 'Arauca' },
  { id: 4, nombre: 'Atlántico' },
  { id: 5, nombre: 'Bogotá D.C.' },
  { id: 6, nombre: 'Bolívar' },
  { id: 7, nombre: 'Boyacá' },
  { id: 8, nombre: 'Caldas' },
  { id: 9, nombre: 'Caquetá' },
  { id: 10, nombre: 'Casanare' },
  { id: 11, nombre: 'Cauca' },
  { id: 12, nombre: 'Cesar' },
  { id: 13, nombre: 'Chocó' },
  { id: 14, nombre: 'Córdoba' },
  { id: 15, nombre: 'Cundinamarca' },
  { id: 16, nombre: 'Guainía' },
  { id: 17, nombre: 'Guaviare' },
  { id: 18, nombre: 'Huila' },
  { id: 19, nombre: 'La Guajira' },
  { id: 20, nombre: 'Magdalena' },
  { id: 21, nombre: 'Meta' },
  { id: 22, nombre: 'Nariño' },
  { id: 23, nombre: 'Norte de Santander' },
  { id: 24, nombre: 'Putumayo' },
  { id: 25, nombre: 'Quindío' },
  { id: 26, nombre: 'Risaralda' },
  { id: 27, nombre: 'San Andrés y Providencia' },
  { id: 28, nombre: 'Santander' },
  { id: 29, nombre: 'Sucre' },
  { id: 30, nombre: 'Tolima' },
  { id: 31, nombre: 'Valle del Cauca' },
  { id: 32, nombre: 'Vaupés' },
  { id: 33, nombre: 'Vichada' },
];

function buscar(texto) {
  nombreLugar.value = texto;
  const respuesta = fuzzysort.go(texto, departamentos, { key: 'nombre' });

  if (respuesta.length) {
    lugares.value = respuesta;
  }
}

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
