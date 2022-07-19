<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import fuentes from '../utilidades/fuentes';
import { departamentos, municipios } from '../utilidades/lugaresDeColombia';

const props = defineProps({
  datos: Object,
  año: Number,
  nivel: String,
  indicadorActual: Number,
});

let lista = document.getElementById('lista');
let datosOrdenados = reactive([]);
let criterioOrden = ref('porcentaje');

props.datos.forEach((dato) => {
  const lugar = dato.codigo;
  const porcentaje = dato.datos[props.año][2];
  datosOrdenados.push({ lugar: lugar, porcentaje: porcentaje });
});

watch(() => props.año, actualizarDatos);
watch(() => props.indicadorActual, actualizarDatos);
watch(
  () => props.datos,
  () => {
    if (!datosOrdenados.length) return;
    actualizarDatos;
  }
);

function comparar(a, b) {
  if (+a[criterioOrden.value] < +b[criterioOrden.value]) {
    return 1;
  }
  if (+a[criterioOrden.value] > +b[criterioOrden.value]) {
    return -1;
  }
  return 0;
}

function elegirOrden(criterio) {
  criterioOrden.value = criterio;
  actualizarDatos();
}

function actualizarDatos() {
  datosOrdenados.splice(0);

  if (!props.datos) return;
  props.datos.forEach((dato) => {
    const lugarCodigo = dato.codigo;
    let lugarNombre = '';

    if (props.nivel === 'departamentos') {
      if (dato.codigo !== '-1') {
        const depto = departamentos.datos.find((d) => d[0] === lugarCodigo);
        lugarNombre = depto[1];
      } else {
        lugarNombre = 'Lugar desconocido';
      }
    } else if (props.nivel === 'municipios') {
      if (municipios.datos.find((d) => d[3] === dato.codigo)) {
        const municipio = municipios.datos.find((d) => d[3] === dato.codigo);
        lugarNombre = municipio[1];
      } else {
        lugarNombre = 'Lugar desconocido';
      }
    }

    if (dato.datos[props.año]) {
      const [numerador, denominador, porcentaje] = dato.datos[props.año];

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
