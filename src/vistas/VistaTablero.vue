<script setup>
import { ref } from 'vue';
import Mapa from '../componentes/MapaElemento.vue';
import MenuIndicadores from '../componentes/MenuIndicadores.vue';
import MenuAños from '../componentes/MenuAños.vue';
// import LeyendaColor from '../componentes/LeyendaColor.vue';
import fuentes from '../utilidades/fuentes';
import { extremosPorcentaje } from '../utilidades/procesador';
import LineaTiempo from '../componentes/LineaTiempo.vue';
import ModuloLista from '../componentes/ModuloLista.vue';
import { departamentos, municipios } from '../utilidades/lugaresDeColombia';
import { usarIndicador } from '../cerebro/indicador';

const datos = ref([]);
const datosLugar = ref(null);
const lugarSeleccionado = ref(null);
const geojsonLugar = ref([]);
const rutaBase = 'https://enflujo.com/bodega';
const año = ref(2015);
const indicadorActual = ref(0);
const nivel = ref('departamentos');
const colores = ['#BEEFED', '#0042BF'];
const porcentajeMax = ref(null);
const porcentajeMin = ref(null);
const añoMin = 2015;
const añoMax = 2020;
const años = [];
const _cache = {
  departamentos: null,
  municipios: null,
};

const cerebroIndicador = usarIndicador();

for (let n = añoMin; n <= añoMax; n++) {
  años.push(n);
}

async function cambiarIndicador(indiceIndicador, forzar) {
  if (forzar || indicadorActual.value !== indiceIndicador) {
    cerebroIndicador.cambiar(indiceIndicador);
    console.log(indiceIndicador, cerebroIndicador.indiceActual);
    const { nombreArchivo } = fuentes[indiceIndicador];
    const respuesta = await fetch(`${rutaBase}/mi_v2/${nombreArchivo}-${nivel.value}.json`);

    const datosIndicador = await respuesta.json();
    datos.value = datosIndicador;

    if (lugarSeleccionado.value) {
      const dLugar = datosIndicador.find((obj) => obj.codigo === lugarSeleccionado.value[0]);
      if (dLugar) datosLugar.value = dLugar.datos;
    }

    indicadorActual.value = indiceIndicador;

    definirPorcentajes();
  }
}

async function cargarGeojson() {
  const cache = _cache[nivel.value];

  /**
   * Si ya se descargaron los datos, no volveros a pedir al servidor
   */
  if (cache) {
    geojsonLugar.value = cache;
  } else {
    /**
     * Cargar los datos desde el servidor si aún no se han cargado
     */
    const respuesta = await fetch(`${rutaBase}/${nivel.value}.json`);
    const geojson = await respuesta.json();

    /**
     * Cambiar los nombres de los lugares para que tengan tildes y mayúsculas
     */
    let infoLugares;
    let llaveCodigo = 0;

    if (nivel.value === 'departamentos') {
      infoLugares = departamentos.datos;
    } else {
      infoLugares = municipios.datos;
      llaveCodigo = 3;
    }

    geojson.features = geojson.features.map((lugar) => {
      const infoLugar = infoLugares.find((d) => d[llaveCodigo] === lugar.properties.codigo);

      // Reemplazar el nombre actual (Sin tildes y todo en mayúsculas) por el que está bien escrito.
      if (infoLugar) {
        lugar.properties.nombre = infoLugar[1];
      }

      return lugar;
    });

    // Guardar datos procesados en el cache.
    _cache[nivel.value] = geojson;
    geojsonLugar.value = geojson;
  }
}

async function cambiarNivel(valor) {
  nivel.value = valor;
  await cargarGeojson();
  await cambiarIndicador(indicadorActual.value, true);
}

function definirPorcentajes() {
  const extremosP = extremosPorcentaje(datos.value, año.value);
  porcentajeMin.value = extremosP.porcentajeMin;
  porcentajeMax.value = extremosP.porcentajeMax;
}

function actualizarAño(nuevoAño) {
  if (nuevoAño === año.value) return;
  año.value = nuevoAño;
  definirPorcentajes();
}

function actualizarVistaLugar(datos, lugar) {
  datosLugar.value = datos;
  console.log(datos);
  lugarSeleccionado.value = lugar;
}

function actualizarDatos(datos) {
  datosLugar.value = datos;
  console.log('miau2');
}

cambiarNivel(nivel.value);
</script>

<template>
  <main>
    <MenuIndicadores :cambiarIndicador="cambiarIndicador" :indicadorActual="indicadorActual" />
    <h2>{{ cerebroIndicador.indiceActual }}</h2>
    <div id="seccionCentral">
      <div id="filtros">
        <ul id="menuVistaLugar">
          <li @click="cambiarNivel('departamentos')" class="nivel">Departamentos</li>
          <li @click="cambiarNivel('municipios')" class="nivel">Municipios</li>
        </ul>
        <MenuAños :años="años" :actualizarAño="actualizarAño" :añoActual="año" />
        <h2 id="indicadorSeleccionado">{{ fuentes[indicadorActual].nombreIndicador }}</h2>
      </div>

      <Mapa
        :geojson="geojsonLugar"
        :datos="datos"
        :año="año"
        :colores="colores"
        :nivel="nivel"
        :actualizarVistaLugar="actualizarVistaLugar"
      />
      <!--  <LeyendaColor :colores="colores" :porcentajeMin="porcentajeMin" :porcentajeMax="porcentajeMax" /> -->
    </div>

    <div id="seccionDerecha">
      <LineaTiempo
        :años="años"
        :datos="datosLugar"
        :indicadorActual="indicadorActual"
        :lugarActual="lugarSeleccionado"
        :actualizarDatos="actualizarDatos"
      />
      <div>
        <ModuloLista :datos="datos" :año="año" :nivel="nivel" :indicadorActual="indicadorActual" />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
}
.nivel {
  cursor: pointer;
}

#filtros {
  left: 10vw;
  width: 100%;
  height: fit-content;
  position: relative;

  #indicadorSeleccionado {
    font-size: 1.4em;
    width: 60%;
    margin-left: 40px;
  }
}

#seccionCentral {
  position: relative;
  width: 45vw;
  left: 7px;
}

#seccionDerecha {
  margin-top: 100px;
  position: relative;
  width: 30vw;
}
</style>
