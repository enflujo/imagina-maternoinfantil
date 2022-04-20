const { writeFileSync } = require('fs');
const xlsx = require('xlsx');
const rutaDenominador = './datos/porcentaje_anticoncepcion_denominador.xlsx';
const rutaNumerador = './datos/porcentaje_anticoncepcion_numerador.xlsx';

const excelDenominador = xlsx.readFile(rutaDenominador);
const excelNumerador = xlsx.readFile(rutaNumerador, { header: 1, range: 2 });

const denominador = xlsx.utils.sheet_to_json(excelDenominador.Sheets.Hoja1);
const numerador = xlsx.utils.sheet_to_json(excelNumerador.Sheets.Hoja1);
denominador.pop()
numerador.pop();

const datos = {};

function extraerNombreCodigo(texto) {
  const arr = texto.split('-');
  const codigo = arr[0].trim();
  const nombre = arr[1].trim();
  return { nombre, codigo }
}

const guardarJSON = (json, nombre) => {
  writeFileSync(`./pruebas/${nombre}.json`, JSON.stringify(json, null, 2));
};

denominador.forEach(den => {
  const { Anno, Departamento, Municipio, Total } = den;

  if (!datos.hasOwnProperty(Anno)) {
    datos[Anno] = [];
  }

  const departamento = extraerNombreCodigo(Departamento);
  let departamentoI = datos[Anno].findIndex(d => d.departamento === departamento.nombre);

  if (departamentoI < 0) {
    datos[Anno].push({
      departamento: departamento.nombre,
      codigo: departamento.codigo,
      municipios: []
    });

    departamentoI = datos[Anno].length - 1;
  }

  const municipio = extraerNombreCodigo(Municipio);
  const municipioI = datos[Anno][departamentoI].municipios.findIndex(d => d.municipio === municipio.nombre);

  if (municipioI < 0) {
    datos[Anno][departamentoI].municipios.push({
      municipio: municipio.nombre,
      codigo: municipio.codigo,
      denominador: Total
    })
  }
});

numerador.forEach(num => {
  const { Anno, Departamento, Municipio, Total } = num;

  if (!datos.hasOwnProperty(Anno)) {
    datos[Anno] = [];
  }

  const departamento = extraerNombreCodigo(Departamento);
  let departamentoI = datos[Anno].findIndex(d => d.departamento === departamento.nombre);

  if (departamentoI < 0) {
    datos[Anno].push({
      departamento: departamento.nombre,
      municipios: [],
      codigo: departamento.codigo
    });

    departamentoI = datos[Anno].length - 1;
  }

  const municipio = extraerNombreCodigo(Municipio);
  let municipioI = datos[Anno][departamentoI].municipios.findIndex(d => d.municipio === municipio.nombre);

  if (municipioI < 0) {
    datos[Anno][departamentoI].municipios.push({
      municipio: municipio.nombre,
      codigo: municipio.codigo,
      numerador: Total
    })
  } else {
    console.log('hey')
    datos[Anno][departamentoI].municipios[municipioI].numerador = Total;
  }


})


guardarJSON(datos, 'prueba1')


// for (var i = 0; i < 10; i++) {
//   if (numerador[i].Anno === denominador[i].Anno && numerador[i].Departamento && numerador[i].Municipio) {
//     console.log(numerador[i].Municipio + ': ' + (parseInt(numerador[i].Total) / parseInt(denominador[i].Total)) * 100 + '%');
//   }
// }