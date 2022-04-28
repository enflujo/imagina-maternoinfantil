import './scss/estilos.scss';
import procesarDatos from './utilidades/procesarDatos';
import { aRadianes, escalaColores, mercatorY } from './utilidades/ayudas';

let ancho = 0;
let alto = 0;
let añoSeleccionado = '';

const { municipios, años, porcentajeMin, porcentajeMax, latitudMin, latitudMax, longitudMin, longitudMax } =
  procesarDatos();
const mapearColor = escalaColores(porcentajeMin, porcentajeMax, '#BEEFED', '#00000');

const sur = aRadianes(latitudMin);
const norte = aRadianes(latitudMax);
const oriente = aRadianes(longitudMax);
const occidente = aRadianes(longitudMin);
const yMin = mercatorY(sur);
const yMax = mercatorY(norte);
const menu = document.getElementById('menu');
const contenedor = document.getElementById('contenedorMapa');

function crearMenu() {
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
      contenedor.innerHTML = '';
      dibujarMapa();
    };
    menu.appendChild(boton);
  });
}

// https://stackoverflow.com/questions/2103924/mercator-longitude-and-latitude-calculations-to-x-and-y-on-a-cropped-map-of-the
// https://stackoverflow.com/questions/41557891/convert-lat-long-to-x-y-position-within-a-bounding-box

function convertGeoToPixel([longitud, latitud]) {
  const latitudRad = aRadianes(latitud);
  const longitudRad = aRadianes(longitud);

  const escalaX = ancho / (oriente - occidente);
  const escalaY = alto / (yMax - yMin);

  const x = (longitudRad - occidente) * escalaX;
  const y = (yMax - mercatorY(latitudRad)) * escalaY;
  return { x, y };
}

function crearSeccionSvg(punto, cabeza) {
  const coordenadas = convertGeoToPixel(punto);
  return `${cabeza}${coordenadas.x} ${coordenadas.y} `;
}

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

function dibujarMapa() {
  municipios.features.forEach((municipio) => {
    const formaMunicipio = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    formaMunicipio.setAttributeNS(null, 'd', crearLinea(municipio.geometry.coordinates));
    formaMunicipio.setAttributeNS(
      null,
      'fill',
      municipio.datos[añoSeleccionado] ? mapearColor(municipio.datos[añoSeleccionado].porcentaje) : 'white'
    );

    contenedor.appendChild(formaMunicipio);
  });
}

const actualizarDimension = () => {
  ancho = window.innerWidth;
  alto = window.innerHeight / 1.3;
  contenedor.setAttributeNS(null, 'width', ancho);
  contenedor.setAttributeNS(null, 'height', alto);
  contenedor.innerHTML = '';
  dibujarMapa();
};

crearMenu(años);
actualizarDimension();
window.addEventListener('resize', actualizarDimension);
