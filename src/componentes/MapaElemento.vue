<script setup>
import { ref, reactive, watch } from 'vue';
import { extremosLugar } from '../utilidades/procesador';
import { escalaCoordenadas, escalaColores, crearLinea } from '../utilidades/ayudas';
import { usarCerebroDatos } from '../cerebro/datos';
import { usarCerebroGlobales } from '../cerebro/globales';
import { colores } from '../utilidades/constantes';

const datosSecciones = reactive([]);
const datosSanAndres = reactive([]);
const datosProvidencia = reactive([]);
const nombreLugar = ref('');
const infoNumerador = ref('');
const infoDenominador = ref('');
const infoPorcentaje = ref('');
const infoVisible = ref(false);
const ancho = ref(0);
const alto = ref(0);
const anchoSanAndres = ref(0);
const altoSanAdres = ref(0);
const anchoProvidencia = ref(0);
const altoProvidencia = ref(0);

const infoIzq = ref(0);
const infoArriba = ref(0);
const mapearCoordenadas = ref();
const mapearProvidencia = ref();
const mapearSanAndres = ref();
const mapearColor = escalaColores(0, 100, colores[0], colores[1]);
const colorLinea = 'white'; //'#ffc1f8';

const cerebroDatos = usarCerebroDatos();
const cerebroGlobales = usarCerebroGlobales();

watch(
  () => cerebroDatos.geojsonLugar,
  (nuevos) => {
    const { latitudMin, latitudMax, longitudMin, longitudMax } = extremosLugar(nuevos);
    mapearCoordenadas.value = escalaCoordenadas(latitudMin, latitudMax, longitudMin, longitudMax);
    actualizarDimension(latitudMin, latitudMax, longitudMin, longitudMax);
    datosSecciones.splice(0);

    nuevos.features.forEach((lugar) => {
      const { codigo, nombre } = lugar.properties;

      datosSecciones.push({
        codigo,
        nombre,
        datos: [],
        linea: crearLinea(lugar.geometry.coordinates, mapearCoordenadas.value, ancho.value, alto.value),
        color: 'white',
      });
    });
  }
);

watch(
  () => cerebroDatos.geojsonSanAndres,
  (lugar) => {
    if (cerebroGlobales.nivel === 'departamentos') {
      const coordenadasProvidencia = [...lugar.geometry.coordinates[1], ...lugar.geometry.coordinates[2]];

      const pro = extremosLugar(coordenadasProvidencia);
      const sa = extremosLugar(lugar.geometry.coordinates[0]);

      const coordenadasAnchoSanAndres = sa.longitudMax - sa.longitudMin;
      const coordenadasAltoSanAndres = sa.latitudMax - sa.latitudMin;
      const coordenadasAnchoProvidencia = pro.longitudMax - pro.longitudMin;
      const coordenadasAltoProvidencia = pro.latitudMax - pro.latitudMin;

      mapearSanAndres.value = escalaCoordenadas(sa.latitudMin, sa.latitudMax, sa.longitudMin, sa.longitudMax);
      mapearProvidencia.value = escalaCoordenadas(pro.latitudMin, pro.latitudMax, pro.longitudMin, pro.longitudMax);

      datosSanAndres.splice(0);
      datosProvidencia.splice(0);

      if (coordenadasAnchoSanAndres > coordenadasAltoSanAndres) {
        altoSanAdres.value = anchoSanAndres.value * (coordenadamapearColsAnchoSanAndres / coordenadasAltoSanAndres);
      }

      if (coordenadasAnchoProvidencia > coordenadasAltoProvidencia) {
        altoProvidencia.value = anchoProvidencia.value * (coordenadasAltoProvidencia / coordenadasAnchoProvidencia);
      } else {
        anchoProvidencia.value = altoProvidencia.value * (coordenadasAnchoProvidencia / coordenadasAltoProvidencia);
      }

      const { codigo, nombre } = lugar.properties;

      datosSanAndres.push({
        codigo,
        nombre,
        datos: [],
        linea: crearLinea(
          lugar.geometry.coordinates[0],
          mapearSanAndres.value,
          anchoSanAndres.value,
          altoSanAdres.value
        ),
        color: 'white',
      });

      datosProvidencia.push({
        codigo,
        nombre,
        datos: [],
        linea: crearLinea(
          lugar.geometry.coordinates[2],
          mapearProvidencia.value,
          anchoProvidencia.value,
          altoProvidencia.value
        ),
        color: 'white',
      });
    }
  }
);

watch(() => cerebroGlobales.año, actualizarDatos);

watch(
  () => cerebroDatos.datos,
  () => {
    if (!datosSecciones.length) return;
    actualizarDatos();
  }
);

function actualizarDatos() {
  cerebroDatos.geojsonLugar.features.forEach((lugar, i) => {
    datosSecciones[i].datos = [];
    datosSecciones[i].color = 'transparent';
    const { codigo } = lugar.properties;
    const datosLugar = cerebroDatos.datos.find((obj) => obj.codigo === codigo);

    if (!datosLugar || !datosLugar.datos[cerebroGlobales.año]) {
      return;
    }

    datosSecciones[i].datos = datosLugar.datos;
    datosSecciones[i].color = mapearColor(datosLugar.datos[cerebroGlobales.año][2]);
  });

  // Colorear San Andrés
  datosSanAndres.color = 'transparent';

  let datosSanAndresActualizados;

  if (cerebroGlobales.nivel === 'departamentos') {
    datosSanAndresActualizados = cerebroDatos.datos.find((obj) => obj.codigo === '88');
  } else if (cerebroGlobales.nivel === 'municipios') {
    datosSanAndresActualizados = cerebroDatos.datos.find((obj) => obj.codigo === '88001');
  }

  datosSanAndres.datos = datosSanAndresActualizados.datos;

  if (!datosSanAndres || !datosSanAndres.datos[cerebroGlobales.año]) {
    return;
  }

  datosSanAndres.color = mapearColor(datosSanAndres.datos[cerebroGlobales.año][2]);

  // Colorear Providencia
  datosProvidencia.color = 'transparent';

  let datosProvidenciaActualizados;

  if (cerebroGlobales.nivel === 'departamentos') {
    datosProvidenciaActualizados = datosSanAndresActualizados;
  } else if (cerebroGlobales.nivel === 'municipios') {
    datosProvidenciaActualizados = cerebroDatos.datos.find((obj) => obj.codigo === '88564');
  }

  datosProvidencia.datos = datosProvidenciaActualizados.datos;

  if (!datosProvidencia || !datosProvidencia.datos[cerebroGlobales.año]) {
    return;
  }

  datosProvidencia.color = mapearColor(datosProvidencia.datos[cerebroGlobales.año][2]);
}

const actualizarDimension = (latitudMin, latitudMax, longitudMin, longitudMax) => {
  ancho.value = window.innerWidth;
  alto.value = window.innerHeight / 1.4;

  const coordenadasAncho = longitudMax - longitudMin;
  const coordenadasAlto = latitudMax - latitudMin;

  // Revisa las proporciones del mapa para que no se deforme
  if (coordenadasAncho > coordenadasAlto) {
    alto.value = ancho.value * (coordenadasAlto / coordenadasAncho);
  } else {
    ancho.value = alto.value * (coordenadasAncho / coordenadasAlto);
  }

  ancho.value = ancho.value | 0;
  alto.value = alto.value | 0;

  anchoSanAndres.value = (ancho.value / 20) | 0;
  altoSanAdres.value = anchoSanAndres.value * 2.5;

  anchoProvidencia.value = (ancho.value / 30) | 0;
  altoProvidencia.value = anchoProvidencia.value * 2.5;
};

function eventoEncima(seccion) {
  let [numerador, denominador, porcentaje] = [0, 0, 0];

  /* if (cerebroGlobales.nivel === 'departamentos') { */
  if (seccion.codigo === '88') {
    [numerador, denominador, porcentaje] = datosSanAndres.datos[cerebroGlobales.año];
  } else if (!seccion.datos[cerebroGlobales.año]) return;
  else {
    [numerador, denominador, porcentaje] = seccion.datos[cerebroGlobales.año];
  }
  //}

  // TODO: No sirve a nivel municipal
  /*   if (cerebroGlobales.nivel === 'municipios') {
    let datosSanAndresActualizados = cerebroDatos.datos.find((obj) => obj.codigo === '88001');

    if (seccion.codigo === '88001') {
      [numerador, denominador, porcentaje] = datosSanAndresActualizados.datos[cerebroGlobales.año];
    } else if (seccion.codigo === '88564') {
      let datosProvidenciaActualizados = cerebroDatos.datos.find((obj) => obj.codigo === '88564');

      [numerador, denominador, porcentaje] = datosProvidenciaActualizados.datos[cerebroGlobales.año];
    } else if (!seccion.datos[cerebroGlobales.año]) return;
    else {
      [numerador, denominador, porcentaje] = seccion.datos[cerebroGlobales.año];
    }
  } */

  infoVisible.value = true;
  nombreLugar.value = seccion.nombre;
  infoNumerador.value = `${numerador} de`;
  infoDenominador.value = denominador;
  infoPorcentaje.value = `${porcentaje.toFixed(2)}`;
}

function eventoFuera() {
  infoVisible.value = false;
}

function eventoMovimiento(evento) {
  infoIzq.value = evento.pageX;
  infoArriba.value = evento.pageY;
}
</script>

<template>
  <div id="sanAndresProvidencia">
    <svg id="mapaSanAndres" :width="anchoSanAndres" :height="altoSanAdres" @mousemove="eventoMovimiento">
      <path
        v-for="seccion in datosSanAndres"
        :key="`seccion-${seccion.codigo}`"
        :d="seccion.linea"
        :fill="datosSanAndres.color"
        :stroke="colorLinea"
        :data-nombre="seccion.nombre"
        stroke-width="0.5px"
        @mouseenter="eventoEncima(seccion)"
        @mouseleave="eventoFuera"
        @click="cerebroDatos.actualizarDatosLugar(seccion)"
      ></path>
    </svg>

    <svg id="mapaProvidencia" :width="ancho" :height="alto" @mousemove="eventoMovimiento">
      <path
        v-for="seccion in datosProvidencia"
        :key="`seccion-${seccion.codigo}`"
        :d="seccion.linea"
        :fill="datosProvidencia.color"
        :stroke="colorLinea"
        :data-nombre="seccion.nombre"
        stroke-width="0.5px"
        @mouseenter="eventoEncima(seccion)"
        @mouseleave="eventoFuera"
        @click="cerebroDatos.actualizarDatosLugar(seccion)"
      ></path>
    </svg>
  </div>

  <svg id="mapa" :width="ancho" :height="alto" @mousemove="eventoMovimiento">
    <path
      v-for="seccion in datosSecciones"
      :key="`seccion-${seccion.codigo}`"
      :d="seccion.linea"
      :fill="seccion.color"
      :stroke="colorLinea"
      :data-nombre="seccion.nombre"
      stroke-width="0.5px"
      @mouseenter="eventoEncima(seccion)"
      @mouseleave="eventoFuera"
      @click="cerebroDatos.actualizarDatosLugar(seccion)"
    ></path>
  </svg>

  <div id="informacion" :style="`opacity:${infoVisible ? 1 : 0};left:${infoIzq}px; top:${infoArriba}px`">
    <p id="departamento">{{ nombreLugar }}</p>
    <p id="numerador">{{ infoNumerador }}</p>
    <p id="denominador">{{ infoDenominador }}</p>
    <p id="porcentaje">{{ infoPorcentaje }}</p>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

#mapa {
  margin: 0 auto;
  display: block;

  // left: 19em;
  // top: 8em;
  // position: relative;
  // transform: scale(1.3);
}

#sanAndresProvidencia {
  width: 8%;
  display: flex;
  justify-content: space-evenly;
  position: absolute;
  padding: 1em;
  border: solid 1px cadetblue;
  margin: 6em 0em 0em 4em;
}

#mapaProvidencia {
  height: auto;
  width: 3vw;
}

#mapaSanAndres {
}

#informacion {
  position: absolute;
  color: rgb(239, 100, 97);
  font-size: 0.85em;
  font-family: $fuenteTexto;
  padding: 0.5em;
  opacity: 0;
  transition: opacity 0.23s ease-out;
  background-color: rgba(255, 255, 255, 0.9);
  pointer-events: none;
  transform: translate(-50%, -110%);

  p {
    margin: 0.3em;
  }
}
</style>
