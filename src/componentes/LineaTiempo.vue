<script setup>
import { reactive, ref, watch } from 'vue';
const props = defineProps({
  años: Object,
  datos: Object,
  indicadorActual: Number,
});

const datosLugar = reactive([]);

watch(
  () => props.datos,
  (nuevos) => {
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
);

// let porcentajes = [];

// // Llenar el array de porcentajes con los datos del lugar y los años
// function obtenerDatos(años) {
//   porcentajes = [];
//   años.forEach((e) => {
//     porcentajes.push({ año: e, porcentaje: props.datos[0].datos[e][2] });
//   });
//   console.log(porcentajes);
// }

// obtenerDatos(props.años);
</script>

<template>
  <div id="lineaTiempo">
    <div id="linea"></div>
    <div id="años">
      <span v-for="d in datosLugar" :key="`fecha${d.anno}`">
        <h4>{{ d.anno }}</h4>
        <p>{{ d.porcentaje }}</p>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#lineaTiempo {
  display: flex;
  position: absolute;
  flex-direction: column;

  #linea {
    height: 179px;
    width: 500px;
    border-left: 2px solid;
    border-bottom: 2px solid;
  }

  #años {
    display: flex;
    justify-content: space-between;
  }
}
</style>
