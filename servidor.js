const { writeFileSync } = require('fs');
const xlsx = require('xlsx');

/**
 * Guarda datos de JS a un archivo .json
 *
 * @param {object} json Objeto o Array que se quiere guardar en archivo JSON.
 * @param {string} nombre Nombre del archivo.
 */
const guardarJSON = (json, nombre) => {
  writeFileSync(`./src/datos/${nombre}.json`, JSON.stringify(json, null, 2));
};

const extraerNombreCodigo = texto => {
  const arr = texto.split('-');
  const codigo = arr[0].trim();
  const nombre = arr[1].trim();
  return { nombre, codigo };
};

const rutaDenominador = './src/datos/porcentaje_anticoncepcion_denominador.xlsx';
const rutaNumerador = './src/datos/porcentaje_anticoncepcion_numerador.xlsx';
const excelDenominador = xlsx.readFile(rutaDenominador);
const excelNumerador = xlsx.readFile(rutaNumerador, { header: 1, range: 2 });

const denominador = xlsx.utils.sheet_to_json(excelDenominador.Sheets.Hoja1);
const numerador = xlsx.utils.sheet_to_json(excelNumerador.Sheets.Hoja1);
denominador.pop();
numerador.pop();

const datos = [];

function estructurarDatos(datosFuente, llave) {
  datosFuente.forEach(obj => {
    const { Anno, Departamento, Municipio, Total } = obj;

    const municipio = extraerNombreCodigo(Municipio);
    const departamento = extraerNombreCodigo(Departamento);
    let municipioI = datos.findIndex(mun => mun.codMun === municipio.codigo);

    if (municipioI < 0) {
      datos.push({
        municipio: municipio.nombre,
        codMun: municipio.codigo,
        departamento: departamento.nombre,
        codDep: departamento.codigo,
        datos: {}
      });

      municipioI = datos.length - 1;
    }

    if (!datos[municipioI].datos[Anno]) {
      datos[municipioI].datos[Anno] = {
        numerador: 0,
        denominador: 0,
        porcentaje: 0
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

estructurarDatos(denominador, 'denominador');
estructurarDatos(numerador, 'numerador');

guardarJSON(datos, 'anticoncepcion');
