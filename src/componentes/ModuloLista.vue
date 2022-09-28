<script setup>
import { ref, reactive, watch } from 'vue';
import { usarCerebroDatos } from '../cerebro/datos';
import { usarCerebroGlobales } from '../cerebro/globales';
import fuentes from '../utilidades/fuentes';
import DetalleDatos from './DetalleDatos.vue';

const cerebroGlobales = usarCerebroGlobales();
const cerebroDatos = usarCerebroDatos();

let datosOrdenados = reactive([]);
let datosOrdenadosIzq = reactive([]);
let datosOrdenadosDer = reactive([]);
let datosLugarDesconocido = reactive([]);
let criterioOrden = ref('porcentaje');

watch(() => cerebroGlobales.año, actualizarDatos);
watch(() => cerebroDatos.indice, actualizarDatos);
watch(() => cerebroDatos.datos, actualizarDatos);

function comparar(a, b) {
  const criterio = criterioOrden.value;
  const valorA = +a[criterio];
  const valorB = +b[criterio];

  if (valorA < valorB) return 1;
  if (valorA > valorB) return -1;
  return 0;
}

function elegirOrden(criterio) {
  criterioOrden.value = criterio;
  actualizarDatos();
}

function ordenarDatos() {
  datosOrdenados.reverse();
  dividirDatos();
}

function dividirDatos() {
  // Vaciar listas
  datosOrdenadosIzq.splice(0);
  datosOrdenadosDer.splice(0);

  // Dividir datos en dos columnas
  for (let i = 0; i < datosOrdenados.length; i++) {
    if ((i + 2) % 2 == 0) {
      datosOrdenadosIzq.push(datosOrdenados[i]);
    } else {
      datosOrdenadosDer.push(datosOrdenados[i]);
    }
  }
}

function actualizarDatos() {
  datosOrdenados.splice(0);
  datosLugarDesconocido.splice(0);

  if (!cerebroDatos.datos) return;
  cerebroDatos.datos.forEach((dato) => {
    const lugarCodigo = dato.codigo;
    let lugarNombre = '';

    if (dato.codigo !== '-1') {
      lugarNombre = dato.nombre;
    } else {
      lugarNombre = 'Lugar desconocido';
    }

    if (dato.datos[cerebroGlobales.año]) {
      const [numerador, denominador, porcentaje] = dato.datos[cerebroGlobales.año];

      if (lugarNombre === 'Lugar desconocido') {
        datosLugarDesconocido.push({
          lugarCodigo: lugarCodigo,
          lugarNombre: lugarNombre,
          numerador: numerador,
          denominador: denominador,
          porcentaje: porcentaje,
        });
      } else {
        datosOrdenados.push({
          lugarCodigo: lugarCodigo,
          lugarNombre: lugarNombre,
          numerador: numerador,
          denominador: denominador,
          porcentaje: porcentaje,
        });
      }
    }
  });

  datosOrdenados.sort(comparar);

  dividirDatos();
}
</script>

<template>
  <div v-if="datosOrdenados.length > 0" id="modulo">
    <span>Ordenar por: </span>
    <span id="menuOrden">
      <span class="seccionMenu">
        <h4>ANALÍTICO</h4>
        <span class="botonOrden" :class="criterioOrden === 'decada' ? 'activo' : ''" @click="elegirOrden('decada')">
          2010 vs. 2020
        </span>

        <span class="botonOrden" :class="criterioOrden === 'pandemia' ? 'activo' : ''" @click="elegirOrden('pandemia')">
          2019 vs. 2020
        </span>
      </span>

      <div id="separador"></div>
      <span class="seccionMenu">
        <h4>INFORMATIVO</h4>
        <span
          class="botonOrden"
          :class="criterioOrden === 'porcentaje' ? 'activo' : ''"
          @click="elegirOrden('porcentaje')"
        >
          {{ fuentes[cerebroDatos.indice].tipo }}</span
        >
        <span
          class="botonOrden"
          :class="criterioOrden === 'numerador' ? 'activo' : ''"
          @click="elegirOrden('numerador')"
          >numerador</span
        >
        <span
          class="botonOrden"
          :class="criterioOrden === 'denominador' ? 'activo' : ''"
          @click="elegirOrden('denominador')"
          >denominador</span
        >
      </span>
    </span>
    <div id="contenedor">
      <span class="botonesOrdenar">
        <span @click="ordenarDatos()">↑↓</span>
      </span>

      <div id="lista">
        <div class="columna">
          <ul class="dato">
            <li v-for="(dato, i) in datosOrdenadosIzq" :key="`lugar${i}`">
              <span v-if="dato.lugarNombre !== null && dato.lugarNombre !== 'Lugar desconocido'">
                <DetalleDatos :dato="dato" />
              </span>
            </li>
          </ul>
        </div>

        <div class="columna">
          <ul class="dato">
            <li v-for="(dato, i) in datosOrdenadosDer" :key="`lugar${i}`">
              <span v-if="dato.lugarNombre !== null && dato.lugarNombre !== 'Lugar desconocido'">
                <DetalleDatos :dato="dato" />
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div id="lugarDesconocido" v-if="datosLugarDesconocido[0] && datosLugarDesconocido[0][criterioOrden] !== null">
        Lugar desconocido: {{ datosLugarDesconocido[0][criterioOrden] }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

#modulo {
  margin: 2em 1em;
  font-family: $fuenteTexto;
  color: #0041bf;

  #menuOrden {
    margin: 1em 0em;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    font-size: 0.8em;
  }

  #separador {
    background-color: #0041bf;
    height: 2px;
    width: 100%;
  }

  .seccionMenu {
    display: flex;
    justify-content: flex-start;
    padding: 0.1em;

    h4 {
      padding-top: 1em;
    }
  }

  .botonesOrdenar {
    cursor: pointer;
    border: 2px solid #0041bf;
    border-radius: 5px;
    font-weight: bold;
    position: relative;
    left: 5%;
    top: 5%;
    display: block;
    width: fit-content;

    &:hover {
      background-color: white;
      color: #0041bf;
    }
  }

  .botonOrden {
    cursor: pointer;
    background-color: #0041bf;
    color: white;
    padding: 0.5em 0.9em;
    margin: 0.5em 1.5em 0.4em;
    border: solid 2px #0041bf;

    &:hover {
      opacity: 0.6;
      border: solid 2px transparent;
    }

    &.activo {
      opacity: 1;
      font-weight: bold;
      background-color: white;
      color: #0041bf;
      border: solid 2px #0041bf;
    }
  }

  #contenedor {
    height: 40vh;
    min-height: fit-content;
    overflow-y: scroll;
    border: solid 2px #0041bf;
    border-radius: 15px;
    color: #0041bf;
    margin-bottom: 6em;
    scrollbar-color: #0041bf white;
    scrollbar-width: auto;
  }

  #lista {
    padding: 35px 0px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-around;

    li {
      margin-bottom: 3px;
    }

    .columna {
      width: 40%;
    }
  }
}

#lugarDesconocido {
  padding: 0px 0px 10px 20px;
  color: #ef6461;
  font-size: 0.9em;
  margin: 1em;
}
</style>
