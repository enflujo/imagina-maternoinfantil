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
    </span>
    <div id="contenedor">
      <div id="lista">
        <span class="botonesOrdenar">
          <span @click="ordenarDatos()">↑↓</span>
        </span>

        <ul class="dato">
          <li v-for="dato in datosOrdenados" :key="`lugar${dato}`">
            <span v-if="dato.lugarNombre !== null && dato.lugarNombre !== 'Lugar desconocido'">
              <span class="contenedorInfo">
                <h4 class="nombreLugar">{{ dato.lugarNombre }}</h4>
                <div class="numeros">
                  <h3>{{ dato.porcentaje }}</h3>
                  <div class="operacion">
                    {{ dato.numerador }}
                    <div class="divisor"></div>
                    {{ dato.denominador }}
                  </div>
                </div>
              </span>
              <div class="lineaVacia">
                <div class="lineaLlena" :style="`width:${(dato.numerador / dato.denominador) * 100}%`"></div>
              </div>
            </span>
          </li>
        </ul>
        <!-- <div id="columnaIzquierda"></div>
        <div id="columnaDerecha"></div> -->
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
    //margin-top: 0.5em;
    padding: 0.1em;

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
    position: relative;
    right: -100%;

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
    scrollbar-color: #0041bf white;
    scrollbar-width: auto;
  }

  #lista {
    padding: 20px 20px 0px 20px;
    margin-bottom: 15px;
    width: 35vw;

    li {
      margin-bottom: 3px;
    }
  }
}

.dato {
  display: grid;
  grid-template-columns: 50% 50%;
  column-gap: 39px;
  margin-top: 1.5em;

  h4 {
    text-transform: uppercase;
    width: fit-content;
    padding: 0.5em 0em;
  }

  .contenedorInfo {
    display: flex;
    justify-content: space-between;
    font-size: 0.95em;

    .nombreLugar {
      height: 45px;
      max-height: 58px;
      overflow: clip;
      margin-bottom: 6px;
      padding-top: 4%;
      width: 144px;
    }
  }

  .numeros {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    h3 {
      margin-right: 1em;
      padding-bottom: 0.1em;
    }
  }

  .operacion {
    width: 4em;
    font-size: 0.7em;
    text-align: right;
  }

  .divisor {
    height: 1px;
    width: 100%;
    background-color: #0041bf;
  }

  .lineaVacia {
    height: 4px;
    width: 100%;
    border-top: #0041bf dashed 1px;
  }

  .lineaLlena {
    height: 0px;
    width: 68%;
    border: #258b51 solid 3px;
    margin-bottom: 11px;
    position: relative;
    top: -4px;
    left: -1px;
    border-radius: 1px;
  }
}

#lugarDesconocido {
  padding: 0px 0px 10px 20px;
  color: #ef6461;
  font-size: 0.9em;
}
</style>
