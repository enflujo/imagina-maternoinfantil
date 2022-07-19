<script setup>
import { reactive, ref, watch } from 'vue';
import { convertirEscala } from '../utilidades/ayudas';

const props = defineProps({
  años: Object,
  datos: Object,
  indicadorActual: Number,
  lugarActual: Object,
  actualizarDatos: Function,
});

const datosLugar = reactive([]);
const divisionesEjeY = [0, 1, 2, 3, 4, 5];
const infoVisible = ref(false);
const infoPorcentaje = ref('');
const infoX = ref(null);
const infoY = ref(null);
const alturaGrafica = 200;

const porcentajeMax = () => {
  let listaPorcentajes = [];
  datosLugar.forEach((dato) => {
    listaPorcentajes.push(dato.porcentaje);
  });
  return Math.max.apply(Math, listaPorcentajes);
};

function eventoEncima(porcentaje, evento) {
  infoX.value = evento.pageX - 10;
  infoY.value = evento.pageY - 53;
  infoVisible.value = true;
  infoPorcentaje.value = porcentaje;
}

function eventoFuera() {
  infoVisible.value = false;
}

function actualizarDatos(nuevos) {
  datosLugar.splice(0);
  Object.keys(nuevos).forEach((anno) => {
    const [numerador, denominador, porcentaje] = nuevos[anno];

    datosLugar.push({
      anno: anno,
      numerador,
      denominador,
      porcentaje,
    });
  });
}

watch(
  () => props.datos,
  (nuevos) => {
    actualizarDatos(nuevos);
  }
);

watch(
  () => props.indicadorActual,
  () => {
    if (!props.datos) {
      console.log('miau');
      return;
    } else {
      actualizarDatos(props.datos);
    }
  }
);
</script>

<template>
  <span v-if="props.lugarActual">
    <h3>{{ props.lugarActual[1] }} {{ props.indicadorActual }}</h3>
  </span>
  <div v-if="datos" id="lineaTiempo">
    <span id="linea">
      <span
        id="divisionEjeY"
        v-for="i in divisionesEjeY"
        :key="`${i}`"
        :style="`top: ${-(alturaGrafica / 5) * i + 199}px`"
      >
        <div id="valorEjeY">{{ ((Math.ceil(porcentajeMax()) / 5) * i).toFixed(1) }}%</div>
      </span>
    </span>
    <div id="años">
      <span v-for="(d, i) in datosLugar" :key="`fecha${d.anno}`">
        <div
          id="punto"
          :style="`top: -${convertirEscala(d.porcentaje, 0, Math.ceil(porcentajeMax()), 0, alturaGrafica) + 2}px`"
          @mouseenter="(e) => eventoEncima(d.porcentaje, e)"
          @mouseleave="eventoFuera"
        ></div>

        <span id="divisionEjeX" :style="`left: ${(600 / datosLugar.length) * i + 20}px`"></span>
        <h4>{{ d.anno }}</h4>
      </span>
    </div>

    <div id="detalle" :style="`opacity:${infoVisible ? 1 : 0};left:${infoX}px;top:${infoY}px`">
      {{ infoPorcentaje }}%
    </div>
  </div>
</template>

<style lang="scss" scoped>
#lineaTiempo {
  display: flex;
  position: absolute;
  flex-direction: column;
  font-size: 0.7em;
  margin-top: 2em;

  #linea {
    height: 200px;
    width: 600px;
    border-left: 2px solid;
    border-bottom: 2px solid;

    #divisionEjeY {
      height: 1px;
      width: 610px;
      background-color: #52bf9a85;
      left: -10px;
      top: 0px;
      position: absolute;
    }

    #valorEjeY {
      left: -37px;
      position: relative;
      top: -5px;
    }
  }

  #años {
    display: flex;
    justify-content: space-between;
  }

  #divisionEjeX {
    height: 10px;
    width: 1px;
    background-color: rgb(82 191 154);
    left: 0px;
    bottom: 39px;
    position: absolute;
  }

  #punto {
    background-color: #4e4e4e;
    border-radius: 50%;
    width: 4px;
    height: 4px;
    position: relative;
    top: -3px;
    left: 15px;
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
