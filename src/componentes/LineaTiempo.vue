<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { usarCerebroDatos } from '../cerebro/datos';
import { usarCerebroGlobales } from '../cerebro/globales';
import { convertirEscala } from '../utilidades/ayudas';
import fuentes from '../utilidades/fuentes';
import LineaDatos from './LineaDeTiempo/LineaDatos.vue';
import Leyenda from './LineaDeTiempo/LeyendaElemento.vue';

const props = defineProps({
  ancho: Number,
});

const cerebroGlobales = usarCerebroGlobales();
const cerebroDatos = usarCerebroDatos();

const infoVisible = ref(false);
const infoPorcentaje = ref('');
const infoX = ref(null);
const infoY = ref(null);
const umbralIndicador = ref(null);
const tendenciaDeseada = ref(null);
const posUmbral = reactive({ y: 0, alto: 0 });
const colores = { lineaNal: '#219196' };
const dimsVis = {
  alto: 250,
  altoVis: 0,
  marcoIz: 30,
  marcoAbajo: 20,
  margenIz: 10,
  margenArriba: 15,
  base: 0,
  inicioX: 0,
};
dimsVis.altoVis = dimsVis.alto - dimsVis.marcoAbajo - dimsVis.margenArriba;
dimsVis.base = dimsVis.alto - dimsVis.marcoAbajo;
dimsVis.inicioX = dimsVis.marcoIz + dimsVis.margenIz;

watch(() => cerebroDatos.indice, definirUmbral);
onMounted(definirUmbral);

const tieneUmbral = computed(() => fuentes[cerebroDatos.indice].meta.umbral);
const tendencia = computed(() => fuentes[cerebroDatos.indice].meta.tendenciaDeseada);
const pasoX = computed(() => ((props.ancho - dimsVis.inicioX) / cerebroDatos.años.length) | 0);

tendenciaDeseada.value = tendencia;

const posicionX = (año) => {
  const i = cerebroDatos.años.findIndex((a) => a == año);
  return i * pasoX.value + dimsVis.inicioX;
};
const posicionY = (valor) =>
  convertirEscala(valor, 0, cerebroDatos.valorMax || 100, dimsVis.base, dimsVis.margenArriba);

function alturaEjeY(i) {
  if (i === 0) return dimsVis.margenArriba;
  return (((dimsVis.altoVis / 5) * i) | 0) + dimsVis.margenArriba;
}

function definirUmbral() {
  const { umbral, tendenciaDeseada: tendencia } = fuentes[cerebroDatos.indice].meta;
  const umbralY = posicionY(umbral);
  let y = dimsVis.margenArriba;
  let alto = umbralY - dimsVis.margenArriba;

  umbralIndicador.value = umbral;
  tendenciaDeseada.value = tendencia;

  if (tendencia === 'abajo') {
    y = umbralY;
    alto = dimsVis.base - umbralY;
  }

  posUmbral.y = y;
  posUmbral.alto = alto;
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

function colorFondoDetalle(valor) {
  let color = '';

  if (umbralIndicador.value) {
    if (tendenciaDeseada.value === 'abajo') {
      if (valor > umbralIndicador.value) {
        color = '#0000a4';
      } else {
        color = '#219196';
      }
    } else {
      if (valor <= umbralIndicador.value) {
        color = '#0000a4';
      } else {
        color = '#219196';
      }
    }
  } else {
    color = '#626363';
  }

  return color;
}

function textoPuntoY(i) {
  const info = fuentes[cerebroDatos.indice];
  let respuesta = '';

  if (info.tipo === 'proporción') {
    respuesta = 100 - i * 20;
  } else if (info.tipo === 'razón') {
    respuesta = 1000 - i * 200;
  } else {
    respuesta = 500 - i * 100;
  }

  return respuesta;
}

// const añoRecortado = (valor) => valor.toString().substring(2);
</script>

<template>
  <section id="lineaDeTiempo">
    <header>
      <h3>{{ cerebroGlobales.lugarSeleccionado ? cerebroGlobales.lugarSeleccionado.nombre : 'Colombia' }}</h3>

      <Leyenda />
      <p id="descripcionY">{{ fuentes[cerebroDatos.indice].nombreEjeY }}</p>
    </header>

    <svg :width="props.ancho" :height="dimsVis.alto">
      <defs>
        <linearGradient id="arriba" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" style="stop-color: rgb(35, 150, 115); stop-opacity: 1" />
          <stop offset="100%" style="stop-color: rgb(81, 231, 186); stop-opacity: 1" />
        </linearGradient>

        <linearGradient id="abajo" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" style="stop-color: rgb(81, 231, 186); stop-opacity: 1" />
          <stop offset="100%" style="stop-color: rgb(35, 150, 115); stop-opacity: 1" />
        </linearGradient>

        <pattern id="sinInfo" patternUnits="userSpaceOnUse" width="3.5" height="3.5" patternTransform="rotate(45)">
          <line x1="0" y="0" x2="0" y2="3.5" stroke="#46484A" stroke-width="1" />
        </pattern>
      </defs>
      <!-- MARCO -->
      <line
        class="lineaMarco"
        :x1="dimsVis.marcoIz"
        y1="0"
        :x2="dimsVis.marcoIz"
        :y2="dimsVis.alto"
        shape-rendering="crispEdges"
      />
      <line
        class="lineaMarco"
        :x1="dimsVis.marcoIz"
        :y1="dimsVis.base"
        :x2="props.ancho"
        :y2="dimsVis.base"
        shape-rendering="crispEdges"
      />

      <line
        v-for="anno in cerebroDatos.años"
        :key="`marca-${anno}`"
        class="marcaMarco"
        :x1="posicionX(anno)"
        :y1="dimsVis.base"
        :x2="posicionX(anno)"
        :y2="dimsVis.base + 7"
      />

      <text
        v-for="anno in cerebroDatos.años"
        :key="`año-${anno}`"
        class="año textoEje"
        :class="anno === cerebroGlobales.año ? 'activo' : ''"
        :x="posicionX(anno)"
        :y="dimsVis.base + 16"
        @click="cerebroGlobales.actualizarAño(anno)"
      >
        {{ anno }}
      </text>

      <text class="nombreEje" x="0" :y="dimsVis.base + 14">Año</text>

      <!-- DIVISIONES -->
      <line
        v-for="(division, i) in Array(5)"
        :key="`division-${i}`"
        class="lineaDivision"
        :x1="dimsVis.marcoIz"
        :y1="alturaEjeY(i)"
        :x2="props.ancho"
        :y2="alturaEjeY(i)"
        shape-rendering="crispEdges"
      />

      <line
        v-for="(division, i) in Array(5)"
        :key="`division2-${i}`"
        class="marcaMarco"
        :x1="dimsVis.marcoIz - 7"
        :y1="alturaEjeY(i)"
        :x2="dimsVis.marcoIz"
        :y2="alturaEjeY(i)"
        shape-rendering="crispEdges"
      />

      <text
        v-for="(division, i) in Array(5)"
        :key="`division2-${i}`"
        class="textoEjeY textoEje"
        :x="dimsVis.marcoIz - 25"
        :y="alturaEjeY(i) + 4"
        shape-rendering="crispEdges"
      >
        {{ textoPuntoY(i) }}
      </text>

      <!-- UMBRAL -->
      <rect
        v-if="tieneUmbral"
        class="umbral"
        :x="dimsVis.marcoIz"
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
        :y2="dimsVis.base"
      />

      <!-- LINEA DATOS NACIONALES -->
      <LineaDatos
        v-if="cerebroDatos.datosNacionales.length"
        :datos="cerebroDatos.datosNacionales"
        :posicionX="posicionX"
        :posicionY="posicionY"
        :alturaVis="dimsVis.altoVis"
        :color="colores.lineaNal"
        @eventoEncima="eventoEncima"
        @eventoFuera="eventoFuera"
      />

      <!-- LINEA DATOS LUGAR (Departamento o municipio) -->
      <LineaDatos
        v-if="cerebroDatos.datosLugar.length"
        :datos="cerebroDatos.datosLugar"
        :posicionX="posicionX"
        :posicionY="posicionY"
        :alturaVis="dimsVis.altoVis"
        color="black"
        @eventoEncima="eventoEncima"
        @eventoFuera="eventoFuera"
      />
    </svg>

    <div
      id="detalle"
      :style="`opacity:${infoVisible ? 1 : 0}; background-color:${colorFondoDetalle(
        infoPorcentaje
      )}; left:${infoX}px;top:${infoY}px`"
    >
      {{ infoPorcentaje }}
    </div>

    <footer>
      <p id="descripcionMeta">{{ fuentes[cerebroDatos.indice].meta.descripcion }}</p>
    </footer>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

#lineaDeTiempo {
  position: relative;
}

h3 {
  margin: 0.3em 0;
}

#detalle {
  color: white;
  font-size: 0.9em;
  width: fit-content;
  position: fixed;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease-in-out;
  padding: 2px;
}

svg {
  display: block;

  .lineaMarco {
    stroke: $colorOscuro;
    stroke-width: 3;
  }

  .marcaMarco {
    stroke: $colorOscuro;
    stroke-width: 2;
  }

  .lineaDivision {
    stroke: $colorOscuro;
    stroke-width: 1;
    opacity: 0.6;
  }

  .año {
    transform: translateX(-5px);
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

  .nombreEje {
    font-size: 14px;
    fill: $colorOscuro;
    font-weight: bold;
  }

  .textoEje {
    font-size: 10px;
    fill: $colorOscuro;
    font-weight: bold;
  }
}

#descripcionY {
  color: $colorOscuro;
  font-size: 13px;
  font-weight: bold;
}

#descripcionMeta {
  // color: rgb(20, 99, 20);
  border: 2px solid rgb(35, 150, 115);
  background-color: $colorBlanco;
  padding: 0.3em 1em;
  text-align: center;
  margin-top: 1em;
  margin-left: 30px;
}
</style>
