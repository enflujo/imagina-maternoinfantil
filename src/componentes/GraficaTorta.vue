<script setup>
import { ref } from 'vue';
import datosCuali from '../cerebro/datoscuali.json';

defineProps({
  indicador: '',
  datos: [],
});

const listaAnticonceptivos = ref([]);
const listaPartos = ref([]);
// [método, valor]
const anticonceptivosCantidad = ref({ total: 0, datos: [] });
const partosCantidad = ref({ total: 0, datos: [] });

function convertirListaEnConjunto(lista) {
  lista.value = new Set(lista.value);
}

function crearListaIndicadorValor(lista, objeto) {
  convertirListaEnConjunto(lista);

  /*lista.value.forEach((i) => {
    objeto.value.datos[i] = 0;
  });*/
}

// Iterar sobre los datos para sacar cada lista de indicadores
datosCuali.mujeres.forEach((i) => {
  listaAnticonceptivos.value.push(i.planificacion);
  listaPartos.value.push(i.parto);
});

crearListaIndicadorValor(listaAnticonceptivos, anticonceptivosCantidad);
crearListaIndicadorValor(listaPartos, partosCantidad);

// Agregar la cantidad de cada valor de los indicadores y sumar la cantidad total
datosCuali.mujeres.forEach((dato) => {
  const datosPartos = partosCantidad.value.datos;
  const datosAnticonceptivos = anticonceptivosCantidad.value.datos;

  const anticoncepcionI = datosPartos.findIndex((obj) => obj.parto === dato.parto);
  const planificacionI = datosAnticonceptivos.findIndex((obj) => obj.planificacion === dato.planificacion);

  // Ordentar los datos por cantidad de menor a mayor
  if (planificacionI < 0) {
    datosAnticonceptivos.push({
      planificacion: dato.planificacion,
      valor: 1,
    });
  } else {
    datosAnticonceptivos[planificacionI].valor += 1;
  }

  if (anticoncepcionI < 0) {
    datosPartos.push({
      parto: dato.parto,
      valor: 1,
    });
  } else {
    datosPartos[anticoncepcionI].valor += 1;
  }

  // anticonceptivosCantidad.value.datos[dato.planificacion] += 1;
  anticonceptivosCantidad.value.total += 1;
  //partosCantidad.value.datos[dato.parto] += 1;
  partosCantidad.value.total += 1;
});

anticonceptivosCantidad.value.datos = anticonceptivosCantidad.value.datos.sort((a, b) => {
  if (a.valor < b.valor) {
    return -1;
  }
  if (a.valor > b.valor) {
    return 1;
  }
  return 0;
});

console.log(partosCantidad.value.datos[0].valor);
console.log(anticonceptivosCantidad.value);
</script>
<template>
  <div id="contenedor">
    <h1 id="titulo">{{ indicador }}</h1>
    <svg height="200" width="200" viewBox="0 0 20 20">
      <circle r="10" cx="10" cy="10" fill="white" />

      <circle
        r="5"
        cx="10"
        cy="10"
        fill="transparent"
        stroke="#5e1c5a"
        stroke-width="10"
        :stroke-dasharray="`${(partosCantidad.datos[0].valor * 31.4) / partosCantidad.total} ${
          partosCantidad.datos[0].valor
        }`"
        :stroke-dashoffset="`${(-34 * 31.4) / partosCantidad.total}`"
        transform="rotate(-90) translate(-20)"
      />

      <circle
        r="5"
        cx="10"
        cy="10"
        fill="transparent"
        stroke="#3853d8"
        stroke-width="10"
        :stroke-dasharray="`${(partosCantidad.datos[1].valor * 31.4) / partosCantidad.total} ${
          partosCantidad.datos[1].valor
        }`"
        :stroke-dashoffset="`${(-26 * 31.4) / partosCantidad.total}`"
        transform="rotate(-90) translate(-20)"
      />

      <circle
        r="5"
        cx="10"
        cy="10"
        fill="transparent"
        stroke="#71f6a9"
        stroke-width="10"
        :stroke-dasharray="`${(partosCantidad.datos[2].valor * 31.4) / partosCantidad.total} ${
          partosCantidad.datos[2].valor
        }`"
        transform="rotate(-90) translate(-20)"
      />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

#contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#titulo {
  font-size: 1.2em;
  margin-bottom: 1em;
}
</style>
