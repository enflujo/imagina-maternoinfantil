<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { usarCerebroDatos } from '../cerebro/datos';
import { usarCerebroGlobales } from '../cerebro/globales';
import { convertirEscala } from '../utilidades/ayudas';
import fuentes from '../utilidades/fuentes';
import LineaDatos from './LineaDeTiempo/LineaDatos.vue';

const props = defineProps({
  ancho: Number,
});

const cerebroGlobales = usarCerebroGlobales();
const cerebroDatos = usarCerebroDatos();

const infoVisible = ref(false);
const infoPorcentaje = ref('');
const infoX = ref(null);
const infoY = ref(null);
const posUmbral = reactive({
  y: 0,
  alto: 0,
});
const alturaGrafica = 250;
const margen = 25;
const margenInterna = 10;
const alturaVis = alturaGrafica - margen;
const colores = {
  lineaNal: '#219196',
};

watch(
  () => cerebroDatos.indice,
  (indice) => {
    const { umbral, tendenciaDeseada } = fuentes[indice].meta;
    const umbralY = convertirEscala(umbral, 0, 100, alturaVis, 0);
    let y = 0;
    let alto = umbralY;

    if (tendenciaDeseada === 'abajo') {
      y = umbralY;
      alto = alturaVis - umbralY;
    }
    posUmbral.y = y;
    posUmbral.alto = alto;
  }
);

const tieneUmbral = computed(() => fuentes[cerebroDatos.indice].meta.umbral);
const tendencia = computed(() => fuentes[cerebroDatos.indice].meta.tendenciaDeseada);
const pasoX = computed(() => (props.ancho / cerebroDatos.años.length) | 0);
const posicionX = (año) => {
  const i = cerebroDatos.años.findIndex((a) => a == año);
  return i * pasoX.value + margenInterna;
};

function alturaEjeY(i) {
  if (i === 0) return 1;
  return ((alturaVis / 5) * i) | 0;
}

function eventoEncima(porcentaje, evento) {
  infoX.value = evento.pageX - 10;
  infoY.value = evento.pageY - 30;
  infoVisible.value = true;
  infoPorcentaje.value = porcentaje;
}

function eventoFuera() {
  infoVisible.value = false;
}
</script>

<template>
  <h3 v-if="cerebroGlobales.lugarSeleccionado">{{ cerebroGlobales.lugarSeleccionado.nombre }}</h3>

  <svg :width="props.ancho" :height="alturaGrafica">
    <defs>
      <linearGradient id="arriba" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" style="stop-color: rgb(35, 150, 115); stop-opacity: 1" />
        <stop offset="100%" style="stop-color: rgb(81, 231, 186); stop-opacity: 1" />
      </linearGradient>

      <linearGradient id="abajo" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" style="stop-color: rgb(81, 231, 186); stop-opacity: 1" />
        <stop offset="100%" style="stop-color: rgb(35, 150, 115); stop-opacity: 1" />
      </linearGradient>
    </defs>
    <!-- DIVISIONES -->
    <line
      v-for="(division, i) in Array(5)"
      :key="`division-${i}`"
      class="lineaDivision"
      x1="0"
      :y1="alturaEjeY(i)"
      :x2="props.ancho"
      :y2="alturaEjeY(i)"
      shape-rendering="crispEdges"
    />

    <rect
      v-if="tieneUmbral"
      class="umbral"
      x="0"
      :y="posUmbral.y"
      :width="ancho"
      :height="posUmbral.alto"
      :fill="`url(#${tendencia})`"
    />

    <!-- MARCA AÑO ACTUAL -->
    <line
      class="añoActual"
      :x1="posicionX(cerebroGlobales.año)"
      y1="0"
      :x2="posicionX(cerebroGlobales.año)"
      :y2="alturaVis"
    />

    <!-- LINEA DATOS NACIONALES -->
    <LineaDatos
      v-if="cerebroDatos.datosNacionales.length"
      :datos="cerebroDatos.datosNacionales"
      :posicionX="posicionX"
      :alturaVis="alturaVis"
      :color="colores.lineaNal"
      @eventoEncima="eventoEncima"
      @eventoFuera="eventoFuera"
    />

    <!-- LINEA DATOS LUGAR (Departamento o municipio) -->
    <LineaDatos
      v-if="cerebroDatos.datosLugar.length"
      :datos="cerebroDatos.datosLugar"
      :posicionX="posicionX"
      :alturaVis="alturaVis"
      color="black"
      @eventoEncima="eventoEncima"
      @eventoFuera="eventoFuera"
    />

    <!-- MARCO -->
    <line class="lineaMarco" x1="2" y1="0" x2="2" :y2="alturaVis" shape-rendering="crispEdges" />
    <line
      class="lineaMarco"
      x1="0"
      :y1="alturaVis"
      :x2="props.ancho - margen"
      :y2="alturaVis"
      shape-rendering="crispEdges"
    />

    <line
      v-for="anno in cerebroDatos.años"
      :key="`marca-${anno}`"
      class="marcaTiempo"
      :x1="posicionX(anno)"
      :y1="alturaVis"
      :x2="posicionX(anno)"
      :y2="alturaVis + 7"
    />

    <text
      v-for="anno in cerebroDatos.años"
      :key="`año-${anno}`"
      class="año"
      :class="anno === cerebroGlobales.año ? 'activo' : ''"
      :x="posicionX(anno)"
      :y="alturaGrafica - 5"
      @click="cerebroGlobales.actualizarAño(anno)"
    >
      {{ anno }}
    </text>
  </svg>

  <div id="detalle" :style="`opacity:${infoVisible ? 1 : 0};left:${infoX}px;top:${infoY}px`">{{ infoPorcentaje }}%</div>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

#detalle {
  background-color: #7fffd4;
  color: black;
  font-size: 1em;
  width: fit-content;
  position: fixed;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease-in-out;
}

svg {
  display: block;

  .lineaMarco {
    stroke: $colorOscuro;
    stroke-width: 3;
  }

  .lineaDivision {
    stroke: $colorOscuro;
    stroke-width: 1;
    opacity: 0.6;
  }

  .marcaTiempo {
    stroke: $colorOscuro;
    stroke-width: 2;
  }

  .año {
    font-size: 12px;
    fill: $colorOscuro;
    font-weight: bold;
    transform: translateX(-10px);
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }

    &.activo {
      opacity: 0.6;
      cursor: default;
    }
  }

  .añoActual {
    stroke: $colorMenuClaro;
    stroke-width: 5;
    opacity: 0.6;
  }

  .umbral {
    opacity: 0.6;
  }
}
</style>
