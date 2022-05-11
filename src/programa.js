import './scss/estilos.scss';
import procesarDatos from './utilidades/procesarDatos';
import procesarDatosDepto from './utilidades/procesarDatosDepto';
import { escalaColores, escalaCoordenadas } from './utilidades/ayudas';
import fuentes from './utilidades/fuentes';

const menu = document.getElementById('menu');
const menuDeptos = document.getElementById('menuDeptos');
const contenedorDeptos = document.getElementById('contenedorMapaDeptos');
const contenedorMun = document.getElementById('contenedorMapaMun');

const informacion = document.getElementById('informacion');
const infoMun = informacion.querySelector('#municipio');
const infoNum = informacion.querySelector('#numerador');
const infoDen = informacion.querySelector('#denominador');
const infoPor = informacion.querySelector('#porcentaje');
const descIndicador = document.getElementById('descripcionIndicador');
const descIndicadorDeptos = document.getElementById('descripcionIndicadorDeptos');

let ancho = 0;
let alto = 0;
let añoSeleccionado = '';
let mapearColor;
let mapearCoordenadas;

async function cargarDatos(nombreArchivo) {
  const res = await fetch(`https://juanca.ml/mi/${nombreArchivo}.json`);
  return await res.json();
}

async function inicio() {
  const datosMunicipios = await cargarDatos('municipios');
  const datosDepartamentos = await cargarDatos('departamentos');
  // Cambiar el indice acá para cargar indicadores, va de 0 a 27.
  // indice 1 es 'nacidos vivos bajo peso' (ver utilidades/fuentes.js)
  const fuenteNombre = Object.keys(fuentes)[2];
  descIndicador.innerText = fuentes[fuenteNombre].descripcion;
  descIndicadorDeptos.innerText = fuentes[fuenteNombre].descripcion;
  const fuente = await cargarDatos(fuenteNombre);

  const { departamentos, porcentajeMin, porcentajeMax, latitudMin, latitudMax, longitudMin, longitudMax } =
    procesarDatosDepto(datosDepartamentos, fuente);

  const { municipios } = procesarDatos(datosMunicipios, fuente);

  crearMenu(Object.keys(fuente[0].agregados), municipios);
  crearMenuDeptos(Object.keys(fuente[0].agregados), departamentos);
  mapearColor = escalaColores(porcentajeMin, porcentajeMax, '#BEEFED', '#0042BF');
  mapearCoordenadas = escalaCoordenadas(latitudMin, latitudMax, longitudMin, longitudMax);

  actualizarDimension(latitudMin, latitudMax, longitudMin, longitudMax);
  dibujarMapa(municipios, 'municipios');
  dibujarMapa(departamentos, 'departamentos');

  window.addEventListener('resize', () => {
    actualizarDimension(latitudMin, latitudMax, longitudMin, longitudMax);
    dibujarMapa(municipios, 'municipios');
    dibujarMapa(departamentos, 'departamentos');
  });
}

inicio();

function crearMenuDeptos(años, departamentos) {
  años.forEach((año) => {
    const boton = document.createElement('span');
    boton.className = 'boton';
    boton.innerText = año;

    if (año === años[0]) {
      boton.classList.add('seleccionado');
      añoSeleccionado = año;
    }

    boton.onclick = () => {
      const botonSeleccionado = document.querySelector('.seleccionado');
      if (botonSeleccionado.innerText === año) return;
      botonSeleccionado.classList.remove('seleccionado');
      boton.classList.add('seleccionado');
      añoSeleccionado = año;
      contenedorDeptos.innerHTML = '';
      dibujarMapa(departamentos, 'departamentos');
    };
    menuDeptos.appendChild(boton);
  });
}

function crearMenu(años, municipos) {
  años.forEach((año) => {
    const boton = document.createElement('span');
    boton.className = 'boton';
    boton.innerText = año;

    /* if (año === años[0]) {
      boton.classList.add('seleccionado');
      añoSeleccionado = año;
    } */

    boton.onclick = () => {
      const botonSeleccionado = document.querySelector('.seleccionado');
      if (botonSeleccionado.innerText === año) return;
      botonSeleccionado.classList.remove('seleccionado');
      boton.classList.add('seleccionado');
      añoSeleccionado = año;
      contenedorMun.innerHTML = '';
      dibujarMapa(municipos, 'municipios');
    };
    menu.appendChild(boton);
  });
}

function crearSeccionSvg(punto, cabeza) {
  const coordenadas = mapearCoordenadas(punto, ancho, alto);
  return `${cabeza}${coordenadas.x} ${coordenadas.y} `;
}

/**
 * Averigua si cada `grupo` de coordenadas es un polígono o un multipolígono y a la
 * variable `res` (respuesta), que contiene los datos de los SVG, le agrega la
 * ubicación de cada punto y sus líneas conectoras.
 *
 * `M` = _moveTo_ (Inicio del _path_. `M{punto.x} {punto.y}`)
 *
 * `L` = _lineTo_ (Punto de una línea. `Lpunto.x} {punto.y}`)
 *
 * `Z` = _closePath_ (Fin del _path_. `Z`)
 * @param {Object} coordenadas Array de coordenadas
 * @returns res contiene los datos de los elementos SVG<path>
 */
function crearLinea(coordenadas) {
  let res = '';
  coordenadas.forEach((grupo) => {
    grupo.forEach((punto, i) => {
      const cabeza = i === 0 ? 'M' : 'L';

      if (typeof punto[0] === 'object') {
        punto.forEach((puntoMulti) => {
          res += crearSeccionSvg(puntoMulti, cabeza);
        });
      } else {
        res += crearSeccionSvg(punto, cabeza);
      }

      res += i === grupo.length - 1 ? 'Z' : '';
    });
  });
  return res;
}

/**
 * Dibuja el mapa haciendo un _append_ de las formas SVG y lo colorea
 * según una escala cromática que corresponde a una escala de valores de los datos.
 */
function dibujarMapa(municipios, division) {
  municipios.features.forEach((municipio) => {
    const formaMunicipio = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    formaMunicipio.setAttributeNS(null, 'd', crearLinea(municipio.geometry.coordinates));

    if (municipio.datos && municipio.datos[añoSeleccionado]) {
      const [numerador, denominador, porcentaje] = municipio.datos[añoSeleccionado];
      const color = mapearColor(porcentaje);
      formaMunicipio.setAttributeNS(null, 'fill', color);
      formaMunicipio.onmouseenter = () => {
        informacion.style.opacity = 1;
        infoMun.innerText = municipio.properties.nombre;
        infoNum.innerText = numerador;
        infoDen.innerText = denominador;
        infoPor.innerText = `${porcentaje.toFixed(2)}%`;
      };

      formaMunicipio.onmouseout = () => {
        informacion.style.opacity = 0;
      };

      // Según la división, pinta el mapa en un contenedor distinto
      if (division === 'departamentos') {
        contenedorDeptos.appendChild(formaMunicipio);
      }
      if (division === 'municipios') {
        contenedorMun.appendChild(formaMunicipio);
      }
    }
  });
}

const actualizarDimension = (latitudMin, latitudMax, longitudMin, longitudMax) => {
  ancho = window.innerWidth;
  alto = window.innerHeight / 1.4;

  const coordenadasAncho = longitudMax - longitudMin;
  const coordenadasAlto = latitudMax - latitudMin;

  if (coordenadasAncho > coordenadasAlto) {
    alto = ancho * (coordenadasAlto / coordenadasAncho);
  } else {
    ancho = alto * (coordenadasAncho / coordenadasAlto);
  }

  ancho = ancho | 0;
  alto = alto | 0;

  contenedorMun.setAttributeNS(null, 'width', ancho);
  contenedorMun.setAttributeNS(null, 'height', alto);

  contenedorDeptos.setAttributeNS(null, 'width', ancho);
  contenedorDeptos.setAttributeNS(null, 'height', alto);

  contenedorMun.innerHTML = '';
  contenedorDeptos.innerHTML = '';
};

contenedorMun.onmousemove = (evento) => {
  Object.assign(informacion.style, {
    top: `${evento.pageY}px`,
    left: `${evento.pageX}px`,
  });
};

contenedorDeptos.onmousemove = (evento) => {
  Object.assign(informacion.style, {
    top: `${evento.pageY}px`,
    left: `${evento.pageX}px`,
  });
};

// const contenedorPrueba = document.getElementById('graficas');
// const detalle = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
// detalle.setAttributeNS(null, 'width', window.innerWidth / 2);
// detalle.setAttributeNS(null, 'height', window.innerHeight / 2);

// const medellin = municipios.features[0];
// console.log(medellin);

// contenedorPrueba.appendChild(detalle);

// console.log(convertirEscala(50, 0, 100, 100, 200));
