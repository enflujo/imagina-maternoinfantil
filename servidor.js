const xlsx = require('xlsx');
const rutaDenominador = './datos/porcentaje_anticoncepcion_denominador.xlsx';
const rutaNumerador = './datos/porcentaje_anticoncepcion_numerador.xlsx';

const excelDenominador = xlsx.readFile(rutaDenominador);
const excelNumerador = xlsx.readFile(rutaNumerador, { header: 1, range: 2 });
const denominador = xlsx.utils.sheet_to_json(excelDenominador.Sheets.Hoja1);
const numerador = xlsx.utils.sheet_to_json(excelNumerador.Sheets.Hoja1);

console.log(numerador);
