<script setup>
import { ref, reactive, watch } from 'vue';
import { usarCerebroDatos } from '../cerebro/datos';
import { usarCerebroGlobales } from '../cerebro/globales';
import { departamentos, municipios } from '../utilidades/lugaresDeColombia';

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

    if (cerebroGlobales.nivel === 'departamentos') {
      if (dato.codigo !== '-1') {
        const depto = departamentos.datos.find((d) => d[0] === lugarCodigo);
        lugarNombre = depto[1];
      } else {
        lugarNombre = 'Lugar desconocido';
      }
    } else if (cerebroGlobales.nivel === 'municipios') {
      if (municipios.datos.find((d) => d[3] === dato.codigo)) {
        const municipio = municipios.datos.find((d) => d[3] === dato.codigo);
        lugarNombre = municipio[1];
      } else {
        lugarNombre = 'Lugar desconocido';
      }
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
      <span
        class="botonOrden"
        :class="criterioOrden === 'porcentaje' ? 'activo' : ''"
        @click="elegirOrden('porcentaje')"
        >Por porcentaje</span
      >
      <span class="botonOrden" :class="criterioOrden === 'numerador' ? 'activo' : ''" @click="elegirOrden('numerador')"
        >Por numerador</span
      >
      <span
        class="botonOrden"
        :class="criterioOrden === 'denominador' ? 'activo' : ''"
        @click="elegirOrden('denominador')"
        >Por denominador</span
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
  margin-top: 2em;
  font-family: $fuenteTexto;

  #menuOrden {
    display: flex;
    justify-content: space-around;
    margin-bottom: 25px;
  }

  .botonOrden {
    cursor: pointer;
    padding: 1em;
    background-color: #0041bf;
    color: white;
    width: 30%;
    font-size: 1.2em;

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

  #lista {
    border: solid 2px #0041bf;
    border-radius: 3%;
    color: #0041bf;
    padding: 2em;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    padding: 20px;
    grid-gap: 20px;
  }
}

.dato {
  line-height: 1em;
  width: 96%;
  display: block;
}
</style>
