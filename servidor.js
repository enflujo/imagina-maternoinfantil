const { writeFileSync } = require('fs');
const xlsx = require('xlsx');

/**
 * Guarda datos de JS a un archivo .json
 *
 * @param {object} json Objeto o Array que se quiere guardar en archivo JSON.
 * @param {string} nombre Nombre del archivo.
 */
const guardarJSON = (json, nombre) => {
  writeFileSync(`./src/datos/${nombre}.json`, JSON.stringify(json));
};

/**
 * Redondea y reduce el número de decimales de un numero.
 *
 * @example
 * ```js
 * redondearDecimal(3.1938477402, 2, 5);
 * ```
 * @param {number} num Número decimal que se va a transformar.
 * @param {number} minimo El mínimo de decimales que debe tener el resultado.
 * @param {number} maximo El máximo de decimales que debe tener el resultado.
 * @returns {number} Número con decimales reducidos.
 */
const redondearDecimal = (num, minimo, maximo) =>
  Number(
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minimo,
      maximumFractionDigits: maximo,
    }).format(num)
  );

const extraerNombreCodigo = (texto) => {
  const arr = texto.split('-');
  const codigo = arr[0].trim();
  const nombre = arr[1].trim();
  return { nombre, codigo };
};

const rutaDenominador = './src/datos/porcentaje_anticoncepcion_denominador.xlsx';
const rutaNumerador = './src/datos/porcentaje_anticoncepcion_numerador.xlsx';
const municipiosGeoJson = require('./src/datos/MunicipiosVeredas1MB.json');
const departamentosGeoJson = require('./src/datos/departamentosFuente.json');
const excelDenominador = xlsx.readFile(rutaDenominador);
const excelNumerador = xlsx.readFile(rutaNumerador, { header: 1, range: 2 });

const denominador = xlsx.utils.sheet_to_json(excelDenominador.Sheets.Hoja1);
const numerador = xlsx.utils.sheet_to_json(excelNumerador.Sheets.Hoja1);
denominador.pop();
numerador.pop();

const datos = [];

/**
 * Agrega al objeto `datos` la información de un archivo .json y su respectiva llave.
 * Se usa para combinar en una sola estructura el total de personas que
 * asistieron a consultas médicas y el número de personas que consultaron por
 * anticoncepción por año y municipio. Con esos datos calcula el
 * porcentaje = `(numerador / denominador) * 100` es decir,
 * (consultas-por-anticoncepcion / consultas-totales) * 100, y agrega esa
 * variable a la estructura de los datos.
 * @param {json} datosFuente Datos originales.
 * @param {string} llave Nombre de los nuevos datos que se agregan.
 */
function estructurarDatos(datosFuente, llave) {
  datosFuente.forEach((obj) => {
    const { Anno, Departamento, Municipio, Total } = obj;

    const municipio = extraerNombreCodigo(Municipio);
    const departamento = extraerNombreCodigo(Departamento);
    let municipioI = datos.findIndex((mun) => mun.codMun === municipio.codigo);

    if (municipioI < 0) {
      datos.push({
        municipio: municipio.nombre,
        codMun: municipio.codigo,
        departamento: departamento.nombre,
        codDep: departamento.codigo,
        datos: {},
      });

      municipioI = datos.length - 1;
    }

    if (!datos[municipioI].datos[Anno]) {
      datos[municipioI].datos[Anno] = {
        numerador: 0,
        denominador: 0,
        porcentaje: 0,
      };
    }

    datos[municipioI].datos[Anno][llave] = Total;

    const numerador = datos[municipioI].datos[Anno].numerador;
    const denominador = datos[municipioI].datos[Anno].denominador;

    if (numerador && denominador) {
      datos[municipioI].datos[Anno].porcentaje = (numerador / denominador) * 100;
    }
  });
}

function reducirGeometria(geometria) {
  geometria.coordinates = geometria.coordinates.map((bloqueMulti) => {
    return bloqueMulti.map((poly) => {
      return poly.map((punto) => {
        if (typeof punto === 'object') {
          // Es MultiPolygon, seguir al siguiente nivel.
          return punto.map((nodo) => redondearDecimal(nodo, 2, 5));
        }
        // Es Polygon, resolver desde este nivel.
        return redondearDecimal(punto, 2, 5);
      });
    });
  });

  return geometria;
}

function limpiarGeojson() {
  municipiosGeoJson.features = municipiosGeoJson.features
    .filter((municipio) => municipio.geometry)
    .map((municipio) => {
      return {
        type: municipio.type,
        properties: {
          codigo: municipio.properties.DPTOMPIO,
          nombre: municipio.properties.MPIO_CNMBR,
          departamento: municipio.properties.DPTO_CCDGO,
        },
        geometry: reducirGeometria(municipio.geometry),
      };
    });

  departamentosGeoJson.features = departamentosGeoJson.features
    .filter((departamento) => departamento.geometry)
    .map((departamento) => {
      return {
        type: departamento.type,
        properties: {
          codigo: departamento.properties.DPTO,
          nombre: departamento.properties.NOMBRE_DPT,
        },
        geometry: reducirGeometria(departamento.geometry),
      };
    });
}

// estructurarDatos(denominador, 'denominador');
// estructurarDatos(numerador, 'numerador');
limpiarGeojson();
// const departamentosGeo = limpiarGeojson(municipiosGeoJson);

guardarJSON(datos, 'anticoncepcion');
guardarJSON(municipiosGeoJson, 'municipios');
guardarJSON(departamentosGeoJson, 'departamentos');
