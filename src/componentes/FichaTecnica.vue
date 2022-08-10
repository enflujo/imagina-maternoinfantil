<script setup>
import fuentes from '../utilidades/fuentes';
import { usarCerebroDatos } from '../cerebro/datos';
const cerebroDatos = usarCerebroDatos();

function mostrarFicha() {
  console.log(fuentes[cerebroDatos.indiceActual].nombreIndicador);
  const fichaTecnica = document.getElementById('fichaTecnica');

  fichaTecnica.style.visibility = 'visible';
}
</script>

<template>
  <div @click="mostrarFicha">
    mostrar ficha
    <div id="fichaTecnica">
      <span id="titulo"
        ><h2>{{ fuentes[cerebroDatos.indiceActual].nombreIndicador }}</h2></span
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

#fichaTecnica {
  width: 24%;
  height: 69%;
  background-color: #55efa1;
  z-index: 99;
  position: absolute;
  top: 25vh;
  left: 3vw;
  border: 35px solid #55efa1;
  border-radius: 2% 0 0 0;
  visibility: hidden;

  #titulo {
    background-color: #0041bf;
    color: white;
    display: block;
    height: 18%;
    border-radius: 5% 0 0 0;
    justify-content: center;
    padding: 10% 0% 0% 0%;
    text-align: center;
  }
}
</style>
