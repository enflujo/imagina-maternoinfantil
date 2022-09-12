<script setup>
defineProps({
  dato: Object,
});
</script>

<template>
  <h4 class="nombreLugar">{{ dato.lugarNombre }}</h4>
  <div class="numeros">
    <h3>{{ dato.porcentaje }}</h3>
    <div class="operacion">
      {{ dato.numerador }}
      <div class="divisor"></div>
      {{ dato.denominador }}
    </div>
  </div>
  <div class="lineaVacia">
    <div class="lineaLlena" :style="`width:${(dato.numerador / dato.denominador) * 100}%`"></div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

.dato {
  display: grid;
  grid-template-columns: 50% 50%;
  column-gap: 39px;
  margin-top: 1.5em;

  h4 {
    text-transform: uppercase;
    width: fit-content;
    padding: 0.5em 0em;
  }

  .contenedorInfo {
    display: flex;
    justify-content: space-between;
    font-size: 0.95em;

    .nombreLugar {
      height: 45px;
      max-height: 58px;
      overflow: clip;
      margin-bottom: 6px;
      padding-top: 4%;
      width: 144px;
    }
  }

  .numeros {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    h3 {
      margin-right: 1em;
      padding-bottom: 0.1em;
    }
  }

  .operacion {
    width: 4em;
    font-size: 0.7em;
    text-align: right;
  }

  .divisor {
    height: 1px;
    width: 100%;
    background-color: #0041bf;
  }

  .lineaVacia {
    height: 4px;
    width: 100%;
    border-top: #0041bf dashed 1px;
  }

  .lineaLlena {
    height: 0px;
    width: 68%;
    border: #258b51 solid 3px;
    margin-bottom: 11px;
    position: relative;
    top: -4px;
    left: -1px;
    border-radius: 1px;
  }
}
</style>
