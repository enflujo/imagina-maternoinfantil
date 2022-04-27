import './scss/estilos.scss';
import { select, geoEquirectangular, geoAlbersUsa, scaleLinear, max } from 'd3';
import municipios from './datos/municipios.json';
import datosAnticoncepcion from './datos/anticoncepcion.json';

const menu = document.getElementById('menu');
const años = [];
let ancho = 0;
let alto = 0;
let porcentajeMin = Infinity;
let porcentajeMax = 0;
let añoSeleccionado = '';
let latitudMin = Infinity;
let latitudMax = 0;
let longitudMin = Infinity;
let longitudMax = 0;

const svg = select('svg');
const escalaColor = scaleLinear();
const proyeccion = geoEquirectangular();

function crearMenu() {
  años.forEach(año => {
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
    };
    menu.appendChild(boton);
  });
}

function combinarDatos() {
  municipios.features = municipios.features.map(municipio => {
    const codigo = municipio.properties.codigo;
    const datosMunicipio = datosAnticoncepcion.find(datosMun => datosMun.codMun === codigo);

    municipio.geometry.coordinates.forEach(area => {
      area.forEach(punto => {
        const [longitud, latitud] = punto;
        longitudMin = longitudMin > longitud ? longitud : longitudMin;
        longitudMax = longitudMax < longitud ? longitud : longitudMax;
        latitudMin = latitudMin > latitud ? latitud : latitudMin;
        latitudMax = latitudMax < latitud ? latitud : latitudMax;
      });
    });

    if (datosMunicipio) {
      for (let año in datosMunicipio.datos) {
        if (!años.includes(año)) años.push(año);
        const porcentaje = datosMunicipio.datos[año].porcentaje;
        porcentajeMin = porcentajeMin > porcentaje ? porcentaje : porcentajeMin;
        porcentajeMax = porcentajeMax < porcentaje ? porcentaje : porcentajeMax;
      }

      municipio.datos = datosMunicipio.datos;
      return municipio;
    } else {
      console.log('No hay datos de', municipio.properties.nombre);
    }
  });
}
function proyeccionMercator(punto, zoom, d) {
  const latitudeToRadians = (punto[1] * Math.PI) / 180;
  let mercN = Math.log(Math.tan(Math.PI / 4 + latitudeToRadians / 2));
  const anchoRadianes = (ancho / 360) * zoom;
  const x = (punto[0] + 180) * anchoRadianes;
  const y = alto / 2 - (ancho * zoom * mercN) / (2 * Math.PI);
  if (!x || !y) {
    console.log(d);
  }
  return { x, y };
}
// https://stackoverflow.com/questions/2103924/mercator-longitude-and-latitude-calculations-to-x-and-y-on-a-cropped-map-of-the
function convertGeoToPixel(
  [longitude, latitude],
  mapWidth = ancho, // in pixels
  mapHeight = alto, // in pixels
  mapLngLeft = longitudMin, // in degrees. the longitude of the left side of the map (i.e. the longitude of whatever is depicted on the left-most part of the map image)
  mapLngRight = longitudMax, // in degrees. the longitude of the right side of the map
  mapLatBottom = latitudMin
) {
  // in degrees.  the latitude of the bottom of the map
  const mapLatBottomRad = (mapLatBottom * Math.PI) / 180;
  const latitudeRad = (latitude * Math.PI) / 180;
  const mapLngDelta = mapLngRight - mapLngLeft;

  const worldMapWidth = ((mapWidth / mapLngDelta) * 360) / (2 * Math.PI);
  const mapOffsetY = (worldMapWidth / 2) * Math.log((1 + Math.sin(mapLatBottomRad)) / (1 - Math.sin(mapLatBottomRad)));

  const x = (longitude - mapLngLeft) * (mapWidth / mapLngDelta);
  const y =
    mapHeight -
    ((worldMapWidth / 2) * Math.log((1 + Math.sin(latitudeRad)) / (1 - Math.sin(latitudeRad))) - mapOffsetY);

  return { x, y }; // the pixel x,y value of this point on the map image
}

function dibujarMapa() {
  svg
    .selectAll('path')
    .data(municipios.features)
    .enter()
    .append('path')
    .attr('d', d => {
      let res = '';
      d.geometry.coordinates.forEach(grupo => {
        grupo.forEach((punto, i) => {
          if (typeof punto[0] === 'object') {
            punto.forEach(puntoMulti => {
              const coordenadas = convertGeoToPixel(puntoMulti);
              const cabeza = i === 0 ? 'M' : 'L';
              res += `${cabeza}${coordenadas.x} ${coordenadas.y} `;
            });
          } else {
            const coordenadas = convertGeoToPixel(punto);
            const cabeza = i === 0 ? 'M' : 'L';
            res += `${cabeza}${coordenadas.x} ${coordenadas.y} `;

            if (i === grupo.length - 1) {
              res += 'Z';
            }
          }
        });
      });
      return res;
    })
    .attr('stroke', 'black')
    .attr('fill', 'white');
}

const actualizarDimension = () => {
  ancho = window.innerWidth;
  alto = window.innerHeight / 1.3;
  svg.attr('width', ancho).attr('height', alto);

  escalaColor.domain([porcentajeMin, porcentajeMax]).range(['#BEEFED', '#3f5252']);
  proyeccion.fitSize([500, 500], municipios);

  dibujarMapa();
};

combinarDatos();
crearMenu();
actualizarDimension();
// window.addEventListener('resize', actualizarDimension);
// console.log(municipios, porcentajeMax, porcentajeMin, años, latitudMax, latitudMin, longitudMax, longitudMin);
