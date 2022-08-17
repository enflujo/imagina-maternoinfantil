<script setup>
import { ref, reactive, watch } from 'vue';
import { usarCerebroDatos } from '../cerebro/datos';
import { usarCerebroGlobales } from '../cerebro/globales';
import fuentes from '../utilidades/fuentes';

const cerebroGlobales = usarCerebroGlobales();
const cerebroDatos = usarCerebroDatos();

let datosOrdenados = reactive([]);
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

  console.log(datosOrdenados);
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
      <span class="botonesOrdenar">
        <span @click="ordenarDatos()">↑↓</span>
      </span>
    </span>
    <div id="contenedor">
      <div id="lista">
        <ul class="dato">
          <li v-for="dato in datosOrdenados" :key="`lugar${dato}`">
            <span v-if="dato.lugarNombre !== null && dato.lugarNombre !== 'Lugar desconocido'">
              {{ dato.lugarNombre }}:
              {{ dato[criterioOrden] }}
            </span>
          </li>
        </ul>
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
  margin: 4em 0em;
  font-family: $fuenteTexto;
  color: #0041bf;

  #menuOrden {
    margin: 1em 0em;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
  }

  #separador {
    background-color: #0041bf;
    height: 2px;
    width: 100%;
  }

  .seccionMenu {
    display: flex;
    justify-content: flex-start;

    h4 {
      padding-top: 1em;
    }
  }

  .botonesOrdenar {
    cursor: pointer;
    border: 2px solid #0041bf;
    width: fit-content;
    border-radius: 5px;
    font-weight: bold;

    &:hover {
      background-color: #83e9cb;
    }
  }

  .botonOrden {
    cursor: pointer;
    background-color: #0041bf;
    color: white;
    padding: 0.5em 0.9em;
    margin: 0.5em 1.5em 0.4em;

    &:hover {
      opacity: 0.6;
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
    overflow-x: clip;
    border: solid 2px #0041bf;
    border-radius: 15px;
    color: #0041bf;
    margin-bottom: 20px;
  }

  #lista {
    padding: 20px 20px 0px 20px;
    margin-bottom: 15px;
    column-count: 3;
    column-gap: 10px;
    width: 29vw;
    height: fit-content;

    li {
      margin-bottom: 3px;
    }
  }
}

.dato {
  line-height: 1em;
  display: block;
  font-size: 0.9em;
}

#lugarDesconocido {
  padding: 0px 0px 10px 20px;
  color: #ef6461;
  font-size: 0.9em;
}
</style>
