<script setup>
import { usarCerebroGlobales } from '../cerebro/globales';
import { usarCerebroDatos } from '../cerebro/datos';

defineProps({
  dato: Object,
  esLista: {
    default: true,
    type: Boolean,
  },
});

const cerebroGlobales = usarCerebroGlobales();
const cerebroDatos = usarCerebroDatos();

function elegir(lugar) {
  const lugarSeleccionado = cerebroDatos.datos.find((obj) => obj.nombre === lugar);

  // Cambiar lugar seleccionado
  cerebroDatos.actualizarDatosLugar(lugarSeleccionado);
}
</script>

<template>
  <div
    class="datosLugar"
    :class="dato.lugarCodigo == cerebroDatos.lugarSeleccionado ? 'activo' : null"
    @click="elegir(dato.lugarNombre)"
  >
    <div class="nombreLugar">
      <p :class="cerebroGlobales.nivel === 'municipios' ? '' : 'nivelDepto'">
        {{ dato.lugarNombre }}
      </p>
      <p class="nombreDepto" v-if="cerebroGlobales.nivel === 'municipios' && !esLista">{{ dato.departamento }}</p>
    </div>

    <div class="numeros">
      <h4>{{ dato.porcentaje }}</h4>
      <div class="operacion">
        {{ dato.numerador }}
        <div class="divisor"></div>
        {{ dato.denominador }}
      </div>
    </div>
  </div>

  <div class="lineaVacia">
    <div class="lineaLlena" :style="`width:${(dato.numerador / dato.denominador) * 100}%`"></div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

.dato {
  .nombreLugar {
    text-transform: uppercase;
  }
}

.vistaMapa {
  .datosLugar {
    max-width: 200px;
  }
  .nivelDepto {
    text-transform: uppercase;
  }
}
.datosLugar {
  display: flex;
  flex-direction: column;
  margin: 0.6em 0;

  &:hover,
  &.activo {
    cursor: pointer;
    background-color: rgba($cargadorColor2, 0.3);
  }
}

.nombreLugar {
  font-size: 0.95em;
  width: 50%;
  font-weight: bold;
  margin-right: 1em;
}

.numeros {
  display: flex;
  justify-content: flex-end;
  width: 65%;

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

.nombreDepto {
  text-transform: uppercase;
  font-size: 0.9em;
}

// Teléfonos horizontal
@media (min-width: $minCelular) {
  .datosLugar {
    flex-direction: row;
  }
}
// Pantallas medianas (Tablets)
@media (min-width: $minTablet) {
  .datosLugar {
    flex-direction: row;
  }
}
// Dispositivos grandes y pantallas medianas
@media (min-width: $minPantalla) {
  .datosLugar {
    flex-direction: row;
  }
}
// Pantallas grandes
@media (min-width: $minPantallaGrande) {
  .datosLugar {
    flex-direction: row;
  }
  .numeros {
    width: 50%;
  }
}
</style>
