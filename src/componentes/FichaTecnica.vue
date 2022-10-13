<script setup>
import fuentes from '../utilidades/fuentes';
import { usarCerebroDatos } from '../cerebro/datos';
import { urlsAEnlacesHTML } from '../utilidades/ayudas';
import { ref } from 'vue';

const cerebroDatos = usarCerebroDatos();
const contenedor = ref(null);
defineProps({
  mostrar: Boolean,
  indiceIndicador: null,
});

defineExpose({ contenedor });
</script>

<template>
  <div id="fichaTecnica" ref="contenedor" :style="`display:${mostrar ? 'block' : 'none'}`">
    <h3 id="titulo">{{ fuentes[indiceIndicador].nombreIndicador }}</h3>

    <div id="contenido">
      <h4>Definición</h4>
      <div class="informacion">{{ fuentes[indiceIndicador].definicion }}</div>

      <h4>Grupo</h4>
      <div class="informacion">{{ fuentes[indiceIndicador].grupo }}</div>

      <h4>Metodología de cálculo</h4>
      <div class="informacion">{{ fuentes[indiceIndicador].calculo }}</div>

      <h4>Unidad de medida</h4>
      <div class="informacion">{{ fuentes[indiceIndicador].unidadDeMedida.descripcion }}</div>

      <h4>Fuente del numerador</h4>
      <div class="informacion">{{ fuentes[indiceIndicador].fuenteNumerador }}</div>

      <h4>Fuente del denominador</h4>
      <div class="informacion">{{ fuentes[indiceIndicador].fuenteDenominador }}</div>

      <h4 v-if="fuentes[indiceIndicador].codigosCIE10.length > 0">Códigos CIE-10</h4>

      <div v-if="fuentes[indiceIndicador].codigosCIE10.length > 0" class="informacion">
        Atenciones por consulta para los códigos CIE-10:
        <li v-for="(codigo, i) in fuentes[indiceIndicador].codigosCIE10" :key="`codigo${i}`">
          {{ codigo }}
        </li>
      </div>

      <h4>Nivel de desagregación</h4>
      <div class="informacion">
        <li v-for="(nivel, i) in fuentes[indiceIndicador].nivelDesagregacion" :key="`nivel${i}`">
          {{ nivel }}
        </li>
      </div>

      <h4>Cómo se interpreta</h4>
      <div class="informacion">
        <p
          v-for="(parrafo, i) in fuentes[indiceIndicador].interpretacion"
          :key="`parrafo${i}`"
          v-html="urlsAEnlacesHTML(parrafo)"
        ></p>
      </div>

      <h4>Meta</h4>
      <div class="informacion">
        <p v-for="(meta, i) in fuentes[indiceIndicador].meta.descripcion" :key="`meta${i}`">{{ meta }}</p>
      </div>

      <h4 v-if="fuentes[indiceIndicador].limitacion !== ''">Limitaciones del indicador</h4>
      <div v-if="fuentes[indiceIndicador].limitacion !== ''" class="informacion">
        {{ fuentes[indiceIndicador].limitacion }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

#fichaTecnica {
  max-height: 80%;
  background-color: $colorVerdeResaltado;
  z-index: 99;
  position: absolute;
  top: 120px;
  width: 95vw;
  left: 1.5vw;
  border: 15px solid $colorVerdeResaltado;

  border-radius: 15px;
  overflow-y: auto;

  #titulo {
    background-color: $colorOscuro;
    color: white;
    display: block;
    border-radius: 15px 15px 0 0;
    justify-content: center;
    padding: 5% 5%;
    text-align: center;
    font-size: 1.5em;
  }

  #contenido {
    background-color: white;
    height: 82%;
    display: grid;
    grid-template-columns: 38% 62%;
    color: $colorOscuro;
    font-family: $fuenteTexto;
    height: fit-content;

    h4 {
      text-align: center;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 1em;
      display: flex;
      align-items: center;
      padding: 0.8em;
      border: 3px solid $colorOscuro;
      border-top: 0;
      text-align: left;
    }

    .informacion {
      border: 3px solid $colorOscuro;
      border-left: 0px;
      border-top: 0;
      padding: 1em;
      overflow-wrap: break-word;
    }
  }
}

p {
  margin-bottom: 1em;
}

// Teléfonos horizontal
@media (min-width: $minCelular) {
}
// Pantallas medianas (Tablets)
@media (min-width: $minTablet) {
}
// Dispositivos grandes y pantallas medianas
@media (min-width: $minPantalla) {
}
// Pantallas grandes
@media (min-width: $minPantallaGrande) {
  #fichaTecnica {
    width: 35%;
    top: 180px;
    left: 22vw;
    border: 25px solid $colorVerdeResaltado;
  }
}
</style>
