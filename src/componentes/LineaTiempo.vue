<script setup>
import { ref, watch } from 'vue';
import { usarCerebroDatos } from '../cerebro/datos';
import { usarCerebroGlobales } from '../cerebro/globales';
import { convertirEscala } from '../utilidades/ayudas';

const props = defineProps({
  ancho: Number,
});

const cerebroGlobales = usarCerebroGlobales();
const cerebroDatos = usarCerebroDatos();

const divisionesEjeY = [0, 1, 2, 3, 4, 5];
const infoVisible = ref(false);
const infoPorcentaje = ref('');
const infoX = ref(null);
const infoY = ref(null);
const alturaGrafica = 200;
const pasoX = ref(0);

watch(() => props.ancho, actualizarAncho);
watch(() => cerebroDatos.datosLugar, actualizarAncho);

function actualizarAncho() {
  pasoX.value = props.ancho / cerebroDatos.datosLugar.length;
}

function eventoEncima(porcentaje, evento) {
  infoX.value = evento.pageX - 10;
  infoY.value = evento.pageY - 53;
  infoVisible.value = true;
  infoPorcentaje.value = porcentaje;
}

function eventoFuera() {
  infoVisible.value = false;
}
</script>

<template>
  <h3 v-if="cerebroGlobales.lugarSeleccionado">{{ cerebroGlobales.lugarSeleccionado.nombre }}</h3>
  <div v-if="cerebroDatos.datosLugar.length" id="unidadEjeY">Unidades eje Y</div>
  <div v-if="cerebroDatos.datosLugar.length" id="lineaTiempo">
    <span id="linea">
      <span
        class="divisionEjeY"
        v-for="i in divisionesEjeY"
        :key="`${i}`"
        :style="`top: ${-(alturaGrafica / 5) * i + 199}px`"
      >
        <div class="valorEjeY">{{ ((100 / 5) * i).toFixed(1) }}</div>
      </span>
    </span>

    <div id="años">
      <span v-for="(d, i) in cerebroDatos.datosLugar" :key="`fecha${d.anno}`">
        <div
          class="punto"
          :style="`top: -${convertirEscala(d.porcentaje, 0, 100, 0, alturaGrafica) + 2}px`"
          @mouseenter="(e) => eventoEncima(d.porcentaje, e)"
          @mouseleave="eventoFuera"
        ></div>

        <span class="divisionEjeX" :style="`left: ${(pasoX * i) | 0}px`"></span>
        <h4>{{ d.anno }}</h4>
      </span>
    </div>

    <div id="detalle" :style="`opacity:${infoVisible ? 1 : 0};left:${infoX}px;top:${infoY}px`">
      {{ infoPorcentaje }}%
    </div>
  </div>
</template>

<style lang="scss" scoped>
#unidadEjeY {
  position: relative;
  left: -86px;
  margin-bottom: 18px;
}
#lineaTiempo {
  display: flex;
  position: absolute;
  flex-direction: column;
  font-size: 0.7em;
  width: 100%;

  #linea {
    height: 200px;
    width: calc(100% - 10px);
    border-left: 2px solid;
    border-bottom: 2px solid;

    .divisionEjeY {
      height: 1px;
      width: 100%;
      background-color: #52bf9a85;
      left: -10px;
      position: absolute;
    }

    .valorEjeY {
      left: -37px;
      position: relative;
      top: -5px;
    }
  }

  #años {
    display: flex;
    justify-content: space-between;
  }

  .divisionEjeX {
    height: 10px;
    width: 1px;
    background-color: rgb(82 191 154);
    left: 0px;
    bottom: 39px;
    position: absolute;
  }

  .punto {
    background-color: #4e4e4e;
    border-radius: 50%;
    width: 6px;
    height: 6px;
    position: relative;
    cursor: pointer;
  }

  #detalle {
    background-color: #7fffd4;
    color: black;
    font-size: 1.3em;
    width: fit-content;
    position: fixed;
    opacity: 0;
  }
}
</style>
