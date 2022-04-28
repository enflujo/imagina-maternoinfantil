import './scss/estilos.scss';
import { select, geoEquirectangular, geoAlbersUsa, scaleLinear, max, selectAll } from 'd3';
import procesarDatos from './utilidades/procesarDatos';
import { aRadianes, mercatorY } from './utilidades/ayudas';

let ancho = 0;
let alto = 0;
let añoSeleccionado = '';

const { municipios, años, porcentajeMin, porcentajeMax, latitudMin, latitudMax, longitudMin, longitudMax } =
  procesarDatos();

const sur = aRadianes(latitudMin);
const norte = aRadianes(latitudMax);
const oriente = aRadianes(longitudMax);
const occidente = aRadianes(longitudMin);
const yMin = mercatorY(sur);
const yMax = mercatorY(norte);
const menu = document.getElementById('menu');
const contenedor = document.getElementById('contenedorMapa');
const svg = select('svg');
const escalaColor = scaleLinear();

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
      selectAll('svg > *').remove();
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

function dibujarMapa() {
  svg
    .selectAll('path')
    .data(municipios.features)
    .enter()
    .append('path')
    .attr('d', (d) => {
      let res = '';
      d.geometry.coordinates.forEach((grupo) => {
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
    })
    // .attr('stroke', 'black')
    .attr('fill', (d) => (d.datos[añoSeleccionado] ? escalaColor(d.datos[añoSeleccionado].porcentaje) : 'white'));
}

const actualizarDimension = () => {
  ancho = window.innerWidth / 1.8;
  alto = window.innerHeight / 1.3;
  svg.attr('width', ancho).attr('height', alto);

  escalaColor.domain([porcentajeMin, porcentajeMax]).range(['#BEEFED', 'black']);

  dibujarMapa();
};

crearMenu(años);
actualizarDimension();

console.log(latitudMin, latitudMax, longitudMin, longitudMax);
// window.addEventListener('resize', actualizarDimension);
// console.log(municipios, porcentajeMax, porcentajeMin, años, latitudMax, latitudMin, longitudMax, longitudMin);
