<script setup>
import fuentes from '../utilidades/fuentes';
import { usarCerebroDatos } from '../cerebro/datos';
import { usarCerebroGlobales } from '../cerebro/globales';
const cerebroDatos = usarCerebroDatos();
const cerebroGlobales = usarCerebroGlobales();
//const mostrarFichaTecnica = mostrarFicha();
</script>

<template>
  <div>
    <div id="fichaTecnica">
      <span id="titulo">
        <h2>{{ fuentes[cerebroDatos.indiceActual].nombreIndicador }}</h2>
      </span>
      <div id="contenido">
        <div class="tituloSeccion">Definición</div>
        <div class="informacion">{{ fuentes[cerebroDatos.indiceActual].definicion }}</div>

        <div class="tituloSeccion">Grupo</div>
        <div class="informacion">{{ fuentes[cerebroDatos.indiceActual].grupo }}</div>

        <div class="tituloSeccion">Metodología de cálculo</div>
        <div class="informacion">{{ fuentes[cerebroDatos.indiceActual].calculo }}</div>

        <div class="tituloSeccion">Unidad de medida</div>
        <div class="informacion">{{ fuentes[cerebroDatos.indiceActual].unidadDeMedida.descripcion }}</div>

        <div class="tituloSeccion">Fuente del numerador</div>
        <div class="informacion">{{ fuentes[cerebroDatos.indiceActual].fuenteNumerador }}</div>

        <div class="tituloSeccion">Fuente del denominador</div>
        <div class="informacion">{{ fuentes[cerebroDatos.indiceActual].fuenteDenominador }}</div>

        <div class="tituloSeccion">Nivel de desagregación</div>
        <div class="informacion">
          <p v-for="nivel in fuentes[cerebroDatos.indiceActual].nivelDesagregacion" :key="`nivel${nivel}`">
            {{ nivel }}
          </p>
        </div>

        <div class="tituloSeccion">Cómo se interpreta</div>
        <div class="informacion">{{ fuentes[cerebroDatos.indiceActual].interpretacion }}</div>

        <div class="tituloSeccion">Meta</div>
        <div class="informacion">{{ fuentes[cerebroDatos.indiceActual].meta.descripcion }}</div>

        <div v-if="fuentes[cerebroDatos.indiceActual].limitacion !== ''" class="tituloSeccion">
          Limitaciones del indicador
        </div>
        <div v-if="fuentes[cerebroDatos.indiceActual].limitacion !== ''" class="informacion">
          {{ fuentes[cerebroDatos.indiceActual].limitacion }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

#fichaTecnica {
  width: 30%;
  height: 80%;
  background-color: #55efa1;
  z-index: 99;
  position: absolute;
  top: 22vh;
  left: 3vw;
  border: 35px solid #55efa1;
  border-radius: 15px 0 0 0;
  visibility: hidden;
  overflow-y: scroll;

  #titulo {
    background-color: #0041bf;
    color: white;
    display: block;
    border-radius: 15px 0 0 0;
    justify-content: center;
    padding: 10% 5%;
    text-align: center;
  }

  #contenido {
    background-color: white;
    height: 82%;
    display: grid;
    grid-template-columns: 38% 62%;
    color: #0041bf;
    font-family: $fuenteTexto;
    height: fit-content;

    .tituloSeccion {
      text-align: center;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 1.1em;
      display: flex;
      align-items: center;
      padding-left: 1em;
      border: 3px solid #0041bf;
      border-top: 0;
      text-align: left;
    }

    .informacion {
      border: 3px solid #0041bf;
      border-left: 0px;
      border-top: 0;
      padding: 1em;
      overflow-wrap: break-word;
    }
  }
}
</style>
