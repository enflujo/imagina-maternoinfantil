<script setup>
import { onMounted, ref } from 'vue';
import datosCuali from '../cerebro/datoscuali.json';

const colores = {
  cesárea: '#3853d8',
  natural: '#5e1c59',
  'sin datos': '#71f6a9',
};
defineProps({
  indicador: '',
  datos: [],
});

const listaAnticonceptivos = ref([]);
const listaPartos = ref([]);
// [método, valor]
const anticonceptivosCantidad = ref({ total: 0, datos: [] });
const partosCantidad = ref({ total: 0, datos: [] });

const grafica = ref();
const porcionesTorta = ref([]);

onMounted(() => {
  dibujarTorta();
});

function convertirListaEnConjunto(lista) {
  lista.value = new Set(lista.value);
}

function crearListaIndicadorValor(lista, objeto) {
  convertirListaEnConjunto(lista);
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

  // Ordenar los datos por cantidad de menor a mayor
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

  anticonceptivosCantidad.value.total += 1;
  partosCantidad.value.total += 1;
});

anticonceptivosCantidad.value.datos = anticonceptivosCantidad.value.datos.sort((a, b) => {
  if (a.valor < b.valor) return -1;
  if (a.valor > b.valor) return 1;
  return 0;
});

/**
 * Graficar datos en forma de torta
 */
function dibujarTorta() {
  const total = partosCantidad.value.total;
  const datosPrueba = partosCantidad.value.datos.map((dato) => {
    return {
      valor: dato.valor,
      color: colores[dato.parto],
    };
  });

  let anguloActual = 0;

  datosPrueba.forEach((dato) => {
    // Dibujar círculo
    const ang = (360 * dato.valor) / total;
    calcularPorcion(anguloActual, anguloActual + ang, dato.color);
    anguloActual += ang;
  });

  function calcularPorcion(ang1, ang2, color) {
    const cx = 400;
    const cy = 300;
    const radio = 200;

    // Radianes angulares
    const gradosARadianes = (ang) => (ang * Math.PI) / 180;

    function punto(ang) {
      // Coordenadas según el ángulo
      return {
        x: cx + radio * Math.sin(gradosARadianes(ang)),
        y: cy - radio * Math.cos(gradosARadianes(ang)),
      };
    }

    // Dibujar
    const linea = [];

    // Primer paso
    const { x: x1, y: y1 } = punto(ang1);
    // Dibujar la primera línea
    linea.push(`M ${cx} ${cy} L ${x1} ${y1}`);
    // Segundo paso
    const { x: x2, y: y2 } = punto(ang2);
    // Dibujar el arco
    linea.push(`A ${radio} ${radio} 0 ${ang2 - ang1 > 180 ? 1 : 0} 1 ${x2} ${y2}`);
    // Tercer paso: cerrar
    linea.push('Z');

    porcionesTorta.value.push({
      color,
      linea: linea.join(' '),
    });
  }
}
</script>
<template>
  <div id="contenedor">
    <h1 id="titulo">{{ indicador }}</h1>

    <svg id="grafica" ref="grafica" width="800" height="500">
      <path v-for="(porcion, i) in porcionesTorta" :key="`linea${i}`" :d="porcion.linea" :fill="porcion.color"></path>
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
