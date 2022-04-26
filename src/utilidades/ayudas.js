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
export const redondearDecimal = (num, minimo, maximo) =>
  Number(
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minimo,
      maximumFractionDigits: maximo
    }).format(num)
  );
