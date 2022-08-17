<script setup>
import { computed } from 'vue';
import { usarCerebroDatos } from '../../cerebro/datos';
import fuentes from '../../utilidades/fuentes';

const cerebroDatos = usarCerebroDatos();

const tieneMeta = computed(() => !!fuentes[cerebroDatos.indice].meta.umbral);
</script>

<template>
  <ul id="leyenda">
    <li id="lineaNacional"><span>Nacional</span><span class="ejemplo"></span></li>
    <li id="lineaLugar"><span>Lugar Seleccionado</span><span class="ejemplo"></span></li>
    <li id="lineaMeta" v-if="tieneMeta"><span>Meta</span><span class="ejemplo"></span></li>
  </ul>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

#leyenda {
  font-size: 0.7em;
  border: 2px solid $colorOscuro;
  width: 180px;
  background-color: $colorBlanco;
  padding: 0.3em;
  position: absolute;
  right: 0;
  top: 0;
}

li {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  span {
    margin-left: 1em;
  }

  .ejemplo {
    text-align: right;
  }
}

#lineaNacional {
  .ejemplo {
    color: #219196;

    &::after {
      content: '';
      display: inline-block;
      width: 15px;
      height: 3px;
      background-color: #219196;
      vertical-align: middle;
      margin-top: -2px;
    }

    &::before {
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: #219196;
      display: inline-block;
    }
  }
}

#lineaLugar {
  .ejemplo {
    &::after {
      content: '';
      display: inline-block;
      width: 15px;
      height: 3px;
      background-color: black;
      vertical-align: middle;
      margin-top: -2px;
    }

    &::before {
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: black;
      display: inline-block;
    }
  }
}

#lineaMeta {
  .ejemplo {
    &::after {
      content: '';
      display: inline-block;
      width: 23px;
      height: 10px;
      background: rgb(81, 231, 186);
      background: linear-gradient(0deg, rgb(35, 150, 115) 0%, rgb(81, 231, 186) 100%);
      vertical-align: middle;
      margin-top: -2px;
    }
  }
}
</style>
