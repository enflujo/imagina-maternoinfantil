<script setup>
import { onMounted, ref, reactive } from 'vue';
import datosCuali from '../cerebro/datoscuali.json';

import { coloresGraficas } from '../utilidades/constantes';

const props = defineProps({
  indicador: '',
  titulo: '',
});

const listaAnticonceptivos = ref([]);
const listaPartos = ref([]);

const anticonceptivosCantidad = ref({ total: 0, datos: [] });
const partosCantidad = ref({ total: 0, datos: [] });

const indicadores = { anticonceptivos: anticonceptivosCantidad, partos: partosCantidad };

const grafica = ref();
const infoPorcion = ref();
const porcionesTorta = ref([]);
const posInfo = reactive({ x: 0, y: 0 });

const anchoGrafica = window.innerWidth / 3.5;
const altoGrafica = window.innerWidth / 3.7;
const anchoContenedor = window.innerWidth / 3.2;
const infoVisible = ref(false);

onMounted(() => {
  dibujarTorta(indicadores[props.indicador]);
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

  const anticoncepcionI = datosPartos.findIndex((obj) => obj.nombre === dato.parto);
  const planificacionI = datosAnticonceptivos.findIndex((obj) => obj.nombre === dato.planificacion);

  // Ordenar los datos por cantidad de menor a mayor
  if (planificacionI < 0) {
    datosAnticonceptivos.push({
      nombre: dato.planificacion,
      valor: 1,
    });
  } else {
    datosAnticonceptivos[planificacionI].valor += 1;
  }

  if (anticoncepcionI < 0) {
    datosPartos.push({
      nombre: dato.parto,
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
function dibujarTorta(indicador) {
  const total = indicador.value.total;
  const datos = indicador.value.datos.map((dato, i) => {
    return {
      nombre: dato.nombre,
      valor: dato.valor,
      color: coloresGraficas[i],
    };
  });

  let anguloActual = 0;

  datos.forEach((dato) => {
    // Dibujar círculo
    const ang = (360 * dato.valor) / total;
    calcularPorcion(anguloActual, anguloActual + ang, dato);
    anguloActual += ang;
  });

  function calcularPorcion(ang1, ang2, dato) {
    const cx = 200;
    const cy = 200;
    const radio = anchoGrafica / 3.5;

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
      nombre: dato.nombre,
      valor: dato.valor,
      color: dato.color,
      linea: linea.join(' '),
    });
  }
}

function mostrarInfo(porcion, evento) {
  infoPorcion.value.innerHTML = `<p>${porcion.nombre}: ${porcion.valor}%</p>`;
  if (infoVisible.value === false) {
    infoVisible.value = true;
  }
}

function ocultarInfo() {
  infoVisible.value = false;
}

function eventoMovimiento(evento) {
  posInfo.x = evento.clientX;
  posInfo.y = evento.clientY;
}
</script>
<template @mouseleave="ocultarInfo">
  <div id="contenedor" :width="`${anchoContenedor}px`" :height="`${altoGrafica * 1.1}px`">
    <h1 id="titulo">{{ props.titulo }}</h1>

    <svg
      id="grafica"
      ref="grafica"
      :width="`${anchoGrafica}px`"
      :height="`${altoGrafica}px`"
      @mousemove="eventoMovimiento"
    >
      <path
        v-for="(porcion, i) in porcionesTorta"
        :key="`linea${i}`"
        :d="porcion.linea"
        :fill="porcion.color"
        @mouseenter="(evento) => mostrarInfo(porcion, evento)"
        @mouseleave="ocultarInfo"
      ></path>
    </svg>
  </div>
  <div
    id="infoPorcion"
    ref="infoPorcion"
    :style="`opacity:${infoVisible ? 1 : 0};left:${posInfo.x}px; top:${posInfo.y}px`"
  ></div>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

#contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 7px;
  margin: 2em 0;
}
#titulo {
  font-size: 1.2em;
  margin: 1.5em auto 0em;
  color: #0042bf;
}
#infoPorcion {
  position: fixed;
  background-color: $colorBlanco;
  color: #5670cd;
  padding: 0.3em 0.5em;
  z-index: 99;
  opacity: 0;
  visibility: visible;
}
#grafica {
  transform: translate(0%, -2em);
}
</style>
