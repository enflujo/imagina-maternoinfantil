<script setup>
import { usarCerebroGlobales } from '../cerebro/globales';

defineProps({
  dato: Object,
  esLista: {
    default: true,
    type: Boolean,
  },
});

const cerebroGlobales = usarCerebroGlobales();
</script>

<template>
  <span class="datosLugar">
    <p class="nombreLugar">
      {{ dato.lugarNombre }}
    </p>
    <p class="nombreDepto" v-if="cerebroGlobales.nivel === 'municipios' && !esLista">{{ dato.departamento }}</p>
    <div class="numeros">
      <h4>{{ dato.porcentaje }}</h4>
      <div class="operacion">
        {{ dato.numerador }}
        <div class="divisor"></div>
        {{ dato.denominador }}
      </div>
    </div>
  </span>
  <div class="lineaVacia">
    <div class="lineaLlena" :style="`width:${(dato.numerador / dato.denominador) * 100}%`"></div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

.dato {
  .datosLugar {
    display: flex;
    margin: 0.6em 0;
  }

  .nombreLugar {
    text-transform: uppercase;
    font-size: 0.95em;
    width: 50%;
    font-weight: bold;
  }

  .numeros {
    display: flex;
    justify-content: flex-end;
    width: 50%;

    h4 {
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

.nombreDepto {
  text-transform: uppercase;
  font-size: 0.9em;
}
</style>
