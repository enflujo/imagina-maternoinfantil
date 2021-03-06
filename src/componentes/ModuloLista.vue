<script setup>
import { ref, reactive, watch } from 'vue';
import { usarCerebroDatos } from '../cerebro/datos';
import { usarCerebroGlobales } from '../cerebro/globales';

const cerebroGlobales = usarCerebroGlobales();
const cerebroDatos = usarCerebroDatos();

let datosOrdenados = reactive([]);
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

function actualizarDatos() {
  datosOrdenados.splice(0);

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

      datosOrdenados.push({
        lugarCodigo: lugarCodigo,
        lugarNombre: lugarNombre,
        numerador: numerador,
        denominador: denominador,
        porcentaje: porcentaje,
      });
    }
  });

  datosOrdenados.sort(comparar);
}
</script>

<template>
  <div v-if="datosOrdenados.length > 0" id="modulo">
    <span id="menuOrden">
      Ordenar por:
      <span
        class="botonOrden"
        :class="criterioOrden === 'porcentaje' ? 'activo' : ''"
        @click="elegirOrden('porcentaje')"
        >porcentaje</span
      >
      <span class="botonOrden" :class="criterioOrden === 'numerador' ? 'activo' : ''" @click="elegirOrden('numerador')"
        >numerador</span
      >
      <span
        class="botonOrden"
        :class="criterioOrden === 'denominador' ? 'activo' : ''"
        @click="elegirOrden('denominador')"
        >denominador</span
      >
    </span>
    <div id="lista">
      <span class="dato" v-for="dato in datosOrdenados" :key="`lugar${dato}`">
        <ul>
          {{
            dato.lugarNombre
          }}
          :
          {{
            dato[criterioOrden]
          }}
        </ul></span
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

#modulo {
  margin-top: 20em;
  font-family: $fuenteTexto;

  #menuOrden {
    display: flex;
    justify-content: space-around;
    width: 90%;
  }

  .botonOrden {
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }

    &.activo {
      opacity: 1;
      font-weight: bold;
    }
  }

  #lista {
    border: solid 1px black;
    width: 90%;
    padding: 1em;
  }
}

.dato {
  line-height: 1em;
  width: 96%;
  display: block;
}
</style>
