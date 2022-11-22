<script setup>
import { ref } from 'vue';
import datosCuali from '../cerebro/datoscuali.json';
import { convertirListaEnConjunto } from '../utilidades/ayudas';

const dimsVis = {
  alto: 250,
  altoVis: 0,
  marcoIz: 55,
  marcoAbajo: 0,
  margenIz: 10,
  margenArriba: 15,
  base: 0,
  inicioX: 0,
  ancho: 400,
  alturaEjeY: 0,
};
dimsVis.altoVis = dimsVis.alto - dimsVis.marcoAbajo - dimsVis.margenArriba;
dimsVis.base = dimsVis.alto - dimsVis.marcoAbajo;
dimsVis.inicioX = dimsVis.marcoIz + dimsVis.margenIz;

const categorias = ref([]);
const parientes = ref([]);

const categoriasCantidad = ref([]);
const parientesCantidad = ref([]);

dimsVis.alturaEjeY = parientes.value.length * 20;

// Sacar la lista de categorías de partentezco y personas
datosCuali.mujeres.forEach((i) => {
  i.apoyo.forEach((persona) => {
    categorias.value.push(persona.categoria);
    parientes.value.push(persona.parentezco);
  });
});

convertirListaEnConjunto(categorias);
convertirListaEnConjunto(parientes);

// Agregar la cantidad de cada valor de los indicadores y sumar la cantidad total
datosCuali.mujeres.forEach((mujer) => {
  mujer.apoyo.forEach((persona) => {
    const datosCategorias = categoriasCantidad.value;
    const datosParientes = parientesCantidad.value;

    const categoriasI = datosCategorias.findIndex((obj) => obj.nombre === persona.categoria);
    const parientesI = datosParientes.findIndex((obj) => obj.nombre === persona.parentezco);

    // Ordenar los datos por cantidad de menor a mayor
    if (categoriasI < 0) {
      datosCategorias.push({
        nombre: persona.categoria,
        valor: 1,
      });
    } else {
      datosCategorias[categoriasI].valor += 1;
    }

    if (parientesI < 0) {
      datosParientes.push({
        nombre: persona.parentezco,
        valor: 1,
      });
    } else {
      datosParientes[parientesI].valor += 1;
    }
  });
});
console.log(categoriasCantidad.value);
console.log(parientesCantidad.value);
</script>

<template>
  <header>
    <h3 id="titulo">Integrantes de la red de apoyo de las mujeres</h3>
  </header>

  <div id="contenedor" :width="500" :height="dimsVis.alturaEjeY">
    <div id="ejeY">
      <p v-for="pariente in parientesCantidad" :key="pariente" class="textoEjeY">
        {{ pariente.nombre }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';
#titulo {
  margin-bottom: 1em;
}

#contenedor {
  border-left: 1px solid $colorOscuro;
  border-bottom: 1px solid $colorOscuro;
  #ejeY {
    display: flex;
    flex-direction: column;
    position: relative;
    left: -25%;
  }
  .textoEjeY {
    font-size: 0.7em;
    fill: $colorOscuro;
    font-weight: bold;
    margin: 0.5em;
  }
}

svg {
  .textoEje {
    font-size: 10px;
    fill: $colorOscuro;
    font-weight: bold;
  }
  .lineaMarco {
    stroke: $colorOscuro;
    stroke-width: 1;
  }
}
</style>
