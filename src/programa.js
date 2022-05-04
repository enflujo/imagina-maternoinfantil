import './scss/estilos.scss';
import procesarDatos from './utilidades/procesarDatos';
import { escalaColores, escalaCoordenadas } from './utilidades/ayudas';

const menu = document.getElementById('menu');
const contenedor = document.getElementById('contenedorMapa');
const informacion = document.getElementById('informacion');
const infoMun = informacion.querySelector('#municipio');
const infoNum = informacion.querySelector('#numerador');
const infoDen = informacion.querySelector('#denominador');
const infoPor = informacion.querySelector('#porcentaje');

let ancho = 0;
let alto = 0;
let añoSeleccionado = '';

const { municipios, años, porcentajeMin, porcentajeMax, latitudMin, latitudMax, longitudMin, longitudMax } =
  procesarDatos();
const mapearColor = escalaColores(porcentajeMin, porcentajeMax, '#BEEFED', '#000');
const mapearCoordenadas = escalaCoordenadas(latitudMin, latitudMax, longitudMin, longitudMax);

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
function dibujarMapa() {
  municipios.features.forEach((municipio) => {
    const formaMunicipio = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    formaMunicipio.setAttributeNS(null, 'd', crearLinea(municipio.geometry.coordinates));

    const datosActuales = municipio.datos[añoSeleccionado];
    const color = datosActuales ? mapearColor(datosActuales.porcentaje) : 'white';
    formaMunicipio.setAttributeNS(null, 'fill', color);

    formaMunicipio.onmouseenter = () => {
      informacion.style.opacity = 1;
      infoMun.innerText = municipio.properties.nombre;
      infoNum.innerText = datosActuales.numerador;
      infoDen.innerText = datosActuales.denominador;
      infoPor.innerText = `${datosActuales.porcentaje.toFixed(2)}%`;
    };

    formaMunicipio.onmouseout = () => {
      informacion.style.opacity = 0;
    };

    contenedor.appendChild(formaMunicipio);
  });
}

const actualizarDimension = () => {
  ancho = window.innerWidth;
  alto = window.innerHeight / 1.3;

  const coordenadasAncho = longitudMax - longitudMin;
  const coordenadasAlto = latitudMax - latitudMin;

  if (coordenadasAncho > coordenadasAlto) {
    alto = ancho * (coordenadasAlto / coordenadasAncho);
  } else {
    ancho = alto * (coordenadasAncho / coordenadasAlto);
  }

  ancho = ancho | 0;
  alto = alto | 0;

  contenedor.setAttributeNS(null, 'width', ancho);
  contenedor.setAttributeNS(null, 'height', alto);

  contenedor.innerHTML = '';
  dibujarMapa();
};

crearMenu(años);
actualizarDimension();
window.addEventListener('resize', actualizarDimension);

contenedor.onmousemove = (evento) => {
  Object.assign(informacion.style, {
    top: `${evento.pageY}px`,
    left: `${evento.pageX}px`,
  });
};
