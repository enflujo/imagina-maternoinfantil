<script setup>
import { computed, ref } from 'vue';
import datosCuali from '../cerebro/datoscuali.json';
import { convertirEscala, convertirListaEnConjunto } from '../utilidades/ayudas';

const colores = { femenino: '#b569d6', masculino: '#56ffaafa', seleccionado: '#58f3ff', indefinido: '#54537c' };
const chupetines = ref();
const dimsVis = {
  alto: 250,
  altoVis: 0,
  marcoIz: 55,
  marcoAbajo: 0,
  margenIz: 10,
  margenArriba: 15,
  base: 0,
  inicioX: 0,
  anchoGrafica: window.innerWidth * 0.22,
  alturaEjeY: 0,
};
dimsVis.altoVis = dimsVis.alto - dimsVis.marcoAbajo - dimsVis.margenArriba;
dimsVis.base = dimsVis.alto - dimsVis.marcoAbajo;
dimsVis.inicioX = dimsVis.marcoIz + dimsVis.margenIz;

const categorias = ref([]);
const parientes = ref([]);

const categoriasCantidad = ref([]);
const parientesCantidad = ref([]);
const valorMaximo = ref();

const anchoChupetines = computed(() => {
  if (chupetines.value) return chupetines.value.clientWidth;
  return 0;
});

const chupetinesX = computed(() => {
  if (!chupetines.value) return 0;
  return chupetines.value.offsetLeft;
  console.dir(chupetines.value);
});

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
        genero: persona.genero,
        valor: 1,
      });
    } else {
      datosParientes[parientesI].valor += 1;
    }
  });
});

parientesCantidad.value = parientesCantidad.value.sort((a, b) => {
  if (a.valor < b.valor) return 1;
  if (a.valor > b.valor) return -1;
  return 0;
});

valorMaximo.value = parientesCantidad.value[0].valor;

console.log(parientesCantidad.value);
</script>

<template>
  <div id="contenedorGeneral">
    <header>
      <h3 id="titulo">Integrantes de la red de apoyo de las mujeres</h3>
    </header>

    <div id="contenedorGrafica" :height="dimsVis.alturaEjeY">
      <div id="ejeY">
        <p v-for="pariente in parientesCantidad" :key="pariente" class="textoEjeY">
          {{ pariente.nombre }}
        </p>
      </div>
      <div ref="chupetines" id="chupetines">
        <div v-for="(pariente, i) in parientesCantidad" :key="`pariente${i}`" class="chupetin">
          <span
            class="linea"
            :style="`width:${convertirEscala(pariente.valor, 0, 25, 0, dimsVis.anchoGrafica)}px; background-color:${
              pariente.genero ? colores[pariente.genero] : colores.indefinido
            }`"
          >
          </span>
          <span
            class="circulo"
            :style="` background-color:${pariente.genero ? colores[pariente.genero] : colores.indefinido}`"
          ></span>
        </div>
      </div>
    </div>
    <div
      id="ejeX"
      :style="`width:${convertirEscala(25, 0, 25, 0, dimsVis.anchoGrafica)}px;margin-left:${chupetinesX}px`"
    >
      <div v-for="i in [0, 5, 10, 15, 20, 25]" :key="i">
        <p class="textoEjeX" :style="`left:${convertirEscala(i, 0, 25, 0, anchoChupetines)}px`">
          {{ i }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';
#titulo {
  margin-bottom: 1em;
  font-size: 1em;
}

#contenedorGeneral {
  display: flex;
  flex-direction: column;
  margin-bottom: 3em;
}

#contenedorGrafica {
  display: flex;
  font-size: 0.7em;
  position: relative;

  #ejeY {
    display: flex;
    flex-direction: column;
    position: relative;
    text-align: right;
  }
  .textoEjeY {
    fill: $colorOscuro;
    font-weight: bold;
    margin: 0.5em;
  }

  #chupetines {
    display: flex;
    border-left: 1px solid $colorOscuro;
    border-bottom: 1px solid $colorOscuro;
    flex-direction: column;
    justify-content: space-around;
  }

  .chupetin {
    display: flex;
  }

  .linea {
    display: block;
    margin: 0.5em 0;
    height: 0.2em;
  }

  .circulo {
    display: block;
    height: 0.7em;
    width: 0.7em;
    border-radius: 50%;
    margin-top: 0.3em;
    margin-left: -0.5em;
  }
}

#ejeX {
  display: flex;
  position: relative;
  font-size: 0.7em;
}
.textoEjeX {
  position: absolute;
}
</style>
