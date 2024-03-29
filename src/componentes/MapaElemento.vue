<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { extremosLugar } from '../utilidades/procesador';
import { escalaCoordenadas, escalaColores, crearLinea } from '../utilidades/ayudas';
import { usarCerebroDatos } from '../cerebro/datos';
import { usarCerebroGlobales } from '../cerebro/globales';
import { colores } from '../utilidades/constantes';
import DetalleDatos from './DetalleDatos.vue';

const cerebroDatos = usarCerebroDatos();
const cerebroGlobales = usarCerebroGlobales();

const infoDetalle = reactive({ lugarNombre: '', departamento: '', numerador: 0, denominador: 0, porcentaje: 0 });
const infoVisible = ref(false);
const dimsColombia = reactive({ ancho: 0, alto: 0 });
const dimsSanAndresP = reactive({ ancho: 0, alto: 0 });

const posInfo = reactive({ x: 0, y: 0 });
const coloresMapa = { fondo: 'white' };
const mapa = ref();
const sinDatos = ref(false);

const datosLugar = ref([]);
const datosSanAndres = ref([]);
const datosProvidencia = ref([]);
const lugaresColombia = ref(null);
const hayLugarSeleccionado = ref(false);

const claseLugar = (seccion) =>
  cerebroGlobales.lugarSeleccionado && seccion.nombre === cerebroGlobales.lugarSeleccionado.nombre ? 'activo' : '';

watch(
  () => cerebroDatos.geojsonLugar,
  (nuevos) => {
    iniciarDatosLugar(nuevos);
  }
);

watch(
  () => cerebroDatos.lugarSeleccionado,
  (codigo) => {
    if (mapa.value) {
      const elemento = lugaresColombia.value.find((elemento) => elemento.id === codigo);
      mapa.value.append(elemento);
    }
  }
);

onMounted(() => {
  if (!cerebroDatos.geojsonLugar || !cerebroDatos.datos) return;
  iniciarDatosLugar(cerebroDatos.geojsonLugar);
  actualizarDatos();
});

function iniciarDatosLugar(geojson) {
  const { latitudMin, latitudMax, longitudMin, longitudMax } = extremosLugar(geojson);
  const mapearCoordenadas = escalaCoordenadas(latitudMin, latitudMax, longitudMin, longitudMax);
  const respuesta = [];

  actualizarDimension(latitudMin, latitudMax, longitudMin, longitudMax);

  geojson.features.forEach((lugar) => {
    const { codigo, nombre } = lugar.properties;

    respuesta.push({
      codigo,
      nombre,
      datos: [],
      linea: crearLinea(lugar.geometry.coordinates, mapearCoordenadas, dimsColombia.ancho, dimsColombia.alto),
      color: coloresMapa.fondo,
    });
  });

  datosLugar.value = respuesta;

  iniciarDatosSanAndres();
}

watch(() => cerebroDatos.datos, actualizarDatos);
watch(() => cerebroGlobales.año, actualizarDatos);
watch(() => cerebroGlobales.etniaSeleccionada, actualizarDatos);
watch(() => cerebroGlobales.nivel, actualizarDatos);
watch(() => cerebroGlobales.mostrarPandemia, actualizarDatos);

function iniciarDatosSanAndres() {
  const geojson = cerebroDatos.geojsonSanAndres;

  if (!geojson) return;
  const sanAndres = [];
  const providencia = [];

  const { codigo, nombre } = geojson.properties;

  if (cerebroGlobales.nivel === 'departamentos') {
    const coordenadasProvidencia = [...geojson.geometry.coordinates[1], ...geojson.geometry.coordinates[2]];
    const coordenadasSanAndres = geojson.geometry.coordinates[0];
    const pro = extremosLugar(coordenadasProvidencia);
    const sa = extremosLugar(coordenadasSanAndres);
    const mapearSanAndres = escalaCoordenadas(sa.latitudMin, sa.latitudMax, sa.longitudMin, sa.longitudMax);
    const mapearProvidencia = escalaCoordenadas(pro.latitudMin, pro.latitudMax, pro.longitudMin, pro.longitudMax);

    sanAndres.push({
      codigo,
      nombre,
      datos: [],
      linea: crearLinea(coordenadasSanAndres, mapearSanAndres, dimsSanAndresP.ancho, dimsSanAndresP.alto),
      color: coloresMapa.fondo,
    });

    providencia.push({
      codigo,
      nombre,
      datos: [],
      linea: crearLinea(coordenadasProvidencia, mapearProvidencia, dimsSanAndresP.ancho, dimsSanAndresP.alto),
      color: coloresMapa.fondo,
    });
  }

  datosSanAndres.value = sanAndres;
  datosProvidencia.value = providencia;
}

function redefinirSanAndresP(seccion, añoSeleccionado, mapearColor) {
  const { mostrarPandemia } = cerebroGlobales;
  const d = cerebroDatos.datos.find((obj) => obj.codigo === seccion.codigo);
  if (!d) return seccion;

  if (!d.datos[añoSeleccionado]) {
    seccion.color = 'url(#sinInfo)';
    return seccion;
  }

  seccion.datos = d.datos;

  if (mostrarPandemia) {
    if (d.analisis && d.analisis.alarma) {
      seccion.color = '#f08080';
    } else {
      seccion.color = mapearColor(d.datos[añoSeleccionado][2]);
    }
  } else {
    seccion.color = mapearColor(d.datos[añoSeleccionado][2]);
  }

  return seccion;
}

/***
 * Actualiza los datos al seleccionar un lugar del mapa
 */
function actualizarDatos() {
  if (!cerebroDatos.geojsonLugar) return;
  const { año: añoSeleccionado, mostrarPandemia } = cerebroGlobales;
  const datosNacionalesAño = cerebroDatos.datosNacionales.find((obj) => obj.anno == añoSeleccionado);
  const mapearColor = escalaColores(0, cerebroDatos.valorMax, colores.mapaCero, colores.mapaCien);

  sinDatos.value = !datosNacionalesAño;

  cerebroDatos.geojsonLugar.features.forEach((lugar, i) => {
    datosLugar.value[i].datos = [];

    const { codigo } = lugar.properties;
    const d = cerebroDatos.datos.find((obj) => obj.codigo === codigo);

    if (!d) return;

    if (!d.datos[añoSeleccionado]) {
      datosLugar.value[i].color = 'url(#sinInfo)';
      return;
    }

    datosLugar.value[i].datos = d.datos;
    datosLugar.value[i].etnias = d.etnias ? d.etnias : [];

    if (mostrarPandemia) {
      if (d.analisis && d.analisis.alarma) {
        datosLugar.value[i].color = '#f08080';
      } else {
        datosLugar.value[i].color = mapearColor(d.datos[añoSeleccionado][2]);
      }
    } else {
      datosLugar.value[i].color = mapearColor(d.datos[añoSeleccionado][2]);
    }

    if (cerebroGlobales.nivel === 'municipios') {
      cerebroGlobales.actualizarEtnia(0);
    }
  });

  if (cerebroGlobales.nivel === 'departamentos') {
    datosSanAndres.value = datosSanAndres.value.map((d) => redefinirSanAndresP(d, añoSeleccionado, mapearColor));
    datosProvidencia.value = datosProvidencia.value.map((d) => redefinirSanAndresP(d, añoSeleccionado, mapearColor));
  }
}

const actualizarDimension = (latitudMin, latitudMax, longitudMin, longitudMax) => {
  let ancho = window.innerWidth;
  let alto = window.innerHeight / 1.4;

  const coordenadasAncho = longitudMax - longitudMin;
  const coordenadasAlto = latitudMax - latitudMin;

  // Revisa las proporciones del mapa para que no se deforme
  if (coordenadasAncho > coordenadasAlto) {
    alto = ancho * (coordenadasAlto / coordenadasAncho);
  } else {
    ancho = alto * (coordenadasAncho / coordenadasAlto);
  }

  dimsColombia.ancho = ancho | 0;
  dimsColombia.alto = alto | 0;

  const anchoS = dimsColombia.ancho / 18;
  dimsSanAndresP.ancho = anchoS | 0;
  dimsSanAndresP.alto = (anchoS * 2.5) | 0;
};

function eventoEncima(seccion) {
  const datosAño = seccion.datos[cerebroGlobales.año];
  if (!datosAño) return;

  const [numerador, denominador, porcentaje] = datosAño;

  infoVisible.value = true;

  // Agregar datos para mostrar detalle en hover
  infoDetalle.lugarNombre = seccion.nombre;
  infoDetalle.numerador = numerador;
  infoDetalle.denominador = denominador;
  infoDetalle.porcentaje = porcentaje.toFixed(2);

  let nombre = '';

  if (cerebroGlobales.nivel === 'municipios') {
    const codigoDpto = seccion.codigo.slice(0, 2);

    if (codigoDpto !== '88') {
      const { properties } = cerebroDatos._cache.departamentos.features.find(
        (obj) => obj.properties.codigo == codigoDpto
      );

      nombre = properties.nombre;
    } else {
      nombre = '';
    }
    infoDetalle.departamento = nombre ? nombre : '';
  }
}

function eventoFuera() {
  infoVisible.value = false;
}

function eventoMovimiento(evento) {
  posInfo.x = evento.pageX;
  posInfo.y = evento.pageY;
}

/***
 * Cambiar lugar seleccionado haciendo clic en el mapa
 */
function eventoClic(seccion) {
  if (hayLugarSeleccionado.value) {
    if (seccion.codigo === cerebroDatos.lugarSeleccionado) {
      // Si se hace clic en el lugar ya seleccionado, se borra la selección
      cerebroDatos.vaciarDatosLugar();
      cerebroGlobales.lugarSeleccionado = null;
    } else {
      cerebroDatos.actualizarDatosLugar(seccion);
    }
  } else {
    cerebroDatos.actualizarDatosLugar(seccion);
  }
  hayLugarSeleccionado.value = !hayLugarSeleccionado.value;
}
</script>

<template>
  <div id="contenedorMapa">
    <svg
      id="sanAndresProvidencia"
      :width="dimsSanAndresP.ancho * 3"
      :height="dimsSanAndresP.alto * 2"
      @mousemove="eventoMovimiento"
    >
      <path
        v-for="seccion in datosSanAndres"
        :key="`seccion-${seccion.codigo}`"
        class="lugar sanAndres"
        :class="claseLugar(seccion)"
        :d="seccion.linea"
        :fill="seccion.color"
        :data-nombre="seccion.nombre"
        @mouseenter="eventoEncima(seccion)"
        @mouseleave="eventoFuera"
        @click="(e) => eventoClic(seccion)"
        shape-rendering="geometricPrecision"
      />

      <path
        v-for="seccion in datosProvidencia"
        :key="`seccion-${seccion.codigo}`"
        class="lugar providencia"
        :class="claseLugar(seccion)"
        :d="seccion.linea"
        :fill="seccion.color"
        :data-nombre="seccion.nombre"
        @mouseenter="eventoEncima(seccion)"
        @mouseleave="eventoFuera"
        @click="(e) => eventoClic(seccion)"
        shape-rendering="geometricPrecision"
      />
    </svg>

    <svg id="mapa" ref="mapa" :width="dimsColombia.ancho" :height="dimsColombia.alto" @mousemove="eventoMovimiento">
      <defs>
        <pattern id="sinInfo" patternUnits="userSpaceOnUse" width="3.5" height="3.5" patternTransform="rotate(45)">
          <line x1="0" y="0" x2="0" y2="3.5" stroke="#46484A" stroke-width="1" />
        </pattern>
      </defs>

      <g id="colombia">
        <path
          v-for="seccion in datosLugar"
          ref="lugaresColombia"
          :id="seccion.codigo"
          :key="`seccion-${seccion.codigo}`"
          class="lugar"
          :class="claseLugar(seccion)"
          :d="seccion.linea"
          :fill="seccion.color"
          :data-nombre="seccion.nombre"
          @mouseenter="eventoEncima(seccion)"
          @mouseleave="eventoFuera"
          @click="(e) => eventoClic(seccion)"
          shape-rendering="geometricPrecision"
        />
      </g>
    </svg>

    <div id="sinDatos" v-if="sinDatos">
      Este indicador no tiene datos disponibles para el año <span class="resaltar">{{ cerebroGlobales.año }}.</span>
    </div>

    <div
      class="vistaMapa"
      id="informacion"
      :style="`opacity:${infoVisible ? 0.85 : 0};left:${posInfo.x}px; top:${posInfo.y}px`"
    >
      <DetalleDatos :dato="infoDetalle" :esLista="false" />
    </div>

    <div v-if="cerebroGlobales.mostrarPandemia" id="leyendaAnalisis">
      <p class="alarma" v-if="cerebroDatos.pandemiaNacional.alarma">
        A nivel nacional, este indicador empeoró durante la pandemia.
      </p>
      <p class="tendencia">La tendencia deseada es hacia {{ cerebroDatos.pandemiaNacional.tendencia }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

#contenedorMapa {
  position: relative;
  margin-top: 4vh;
  margin-bottom: 3vh;
}

#mapa {
  margin: 0 auto;
  display: block;
}

#sanAndresProvidencia {
  position: absolute;
  left: 50%;
  transform: translateX(-330%);

  .providencia {
    transform: translateX(60%) scale(0.8, 0.4);
  }

  .sanAndres {
    transform: translate(5px, 20%);
  }
}

#mapaProvidencia {
  height: auto;
  width: 3vw;
}

.lugar {
  stroke: $colorBlanco;
  transition: fill 0.3s ease-out;

  &.activo {
    stroke: $colorSeleccionMapa;
    stroke-width: 2;
  }
}

#informacion {
  position: fixed;
  color: $colorOscuro;
  font-size: 0.85em;
  font-family: $fuenteTexto;
  border: 2px solid $colorOscuro;
  padding: 0.5em;
  opacity: 0;
  transition: opacity 0.23s ease-out;
  background-color: rgba(255, 255, 255, 0.9);
  pointer-events: none;
  transform: translate(-50%, -110%);
  z-index: 99;

  p {
    margin: 0.3em;
  }
}

#sinDatos {
  position: fixed;
  border: 3px solid #eb5050;
  background-color: $colorBlanco;
  top: 50%;
  left: 35vw;
  padding: 1em;
  max-width: 200px;
  transform: translateY(-50%);

  .resaltar {
    font-weight: bold;
  }
}

#leyendaAnalisis {
  font-size: 0.85em;
  margin-top: -6em;

  .alarma {
    font-weight: bold;
    text-decoration: underline;
  }

  .tendencia {
    font-style: italic;
  }
}
</style>
