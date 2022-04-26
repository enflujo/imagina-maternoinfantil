import './scss/estilos.scss';
import { select, scaleThreshold, geoPath, geoMercator, geoAlbersUsa, scaleLinear, max } from 'd3';
import * as topojson from 'topojson';

import municipios from '../../datos/MunicipiosVeredas1MB.json';
import municipiosTopo from '../../datos/colombia-municipios.json';
import datosAnticoncepcion from '../../pruebas/prueba1.json';

const llaveDepMapa = 'DPTO_CCDGO';
const llaveCodigoDatos = 'codigo';
const llaveMunMapa = 'MPIO_CCNCT';
let anchoVentana = 0;
let alturaVentana = 0;

async function dibujarMapa() {
  let dataIndex = {};
  for (let d of datosAnticoncepcion[2018]) {
    for (let m of d.municipios) {
      let codigoMunicipio = m.codigo;
      dataIndex[codigoMunicipio] = m.porcentaje;
    }
  }

  // mapear la información
  municipios.features = municipios.features.map((d) => {
    let codigoMunicipio = d.properties['DPTOMPIO'];
    let porcentaje = dataIndex[codigoMunicipio];
    d.properties.porcentaje = porcentaje;
    return d;
  });

  // Obtener las geometrías para luego adaptar el tamaño con fitSize()
  //let codigoMunicipio =
  var tierra = topojson.feature(municipiosTopo, {
    type: 'GeometryCollection',
    geometries: municipiosTopo.objects.mpios.geometries,
  });

  let porcentajeMin = Infinity;
  let porcentajeMax = 0;

  tierra.features = tierra.features.map((d) => {
    let codigoMunicipio = d.id;
    let datosMunicipio;

    datosAnticoncepcion[2018].find((departamento) => {
      const municipio = departamento.municipios.find((municipio) => municipio.codigo === codigoMunicipio);

      if (municipio) {
        datosMunicipio = municipio;
        return true;
      }
      return false;
    });

    if (datosMunicipio) {
      const porcentaje = datosMunicipio.porcentaje;
      porcentajeMin = porcentajeMin > porcentaje ? porcentaje : porcentajeMin;
      porcentajeMax = porcentajeMax < porcentaje ? porcentaje : porcentajeMax;

      d.porcentaje = porcentaje;
      return d;
    } else {
      console.log('ERROR', 'No hay datos del municipio', d.properties.name);
    }

    return d;
  });

  tierra.features.sort((a, b) => {
    if (a.porcentaje > b.porcentaje) return -1;
    if (b.porcentaje > a.porcentaje) return 1;

    return 0;
  });

  // const porcentajeMax = max(municipios.features, (d) => d.properties.porcentaje);
  const escalaColor = scaleLinear();

  escalaColor.domain([porcentajeMin, porcentajeMax]).range(['#BEEFED', '#3f5252']);

  const svg = select('svg');

  this.actualizarDimension();

  var ancho = +svg.attr('width');
  var alto = +svg.attr('height');

  let projection = geoMercator().fitSize([ancho, alto], tierra);
  // .scale(ancho)
  // .translate([ancho / 2, alto / 2]);

  const path = geoPath().projection(projection);

  svg
    .append('g')
    .selectAll('path')
    .data(tierra.features)
    .enter()
    .append('path')
    // draw each country
    .attr('d', path)
    .on('click', (d, i) => console.log(i))
    .attr('stroke', 'black')
    // set the color of each country
    .attr('fill', (d) => (d.porcentaje ? escalaColor(d.porcentaje) : '#f5f5f5')); //(d) => escalaColor(d.properties.porcentaje));
}

const actualizarDimension = () => {
  anchoVentana = window.innerWidth;
  alturaVentana = window.innerHeight * 2;
};

/***
 * Obtener datos usando a través de una API
 * @param {string} url - url para hacer la petición
 */
async function obtenerDatos(url = '') {
  const respuesta = await fetch(url, {
    method: 'GET',
    data: {
      $$app_token: '3ApcMRIM9OAbaYtZIwOq03uGt',
    },
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return respuesta.json();
}

window.addEventListener('resize', dibujarMapa);
dibujarMapa();
