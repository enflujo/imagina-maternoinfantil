export const PI_CUARTO = Math.PI / 4;
export const aRadianes = (grados) => (grados * Math.PI) / 180;
export const mercatorY = (latitud) => Math.log(Math.tan(latitud / 2 + PI_CUARTO));
export const mapear = (valor, x1, y1, x2, y2) => ((valor - x1) * (y2 - x2)) / (y1 - x1) + x2;

export const hexARGB = (valor) => {
  valor = valor.includes('#') ? valor.replace('#', '') : valor;
  if (valor.length === 3) {
    valor = valor[0] + valor[0] + valor[1] + valor[1] + valor[2] + valor[2];
  }
  if (valor.length != 6) {
    console.log(`No se puede convertir el color ${valor}`);
  }

  const [r, g, b] = valor.match(/.{1,2}/g);
  const rgb = [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
  return rgb;
};

export const escalaColores = (valorMin, valorMax, color1, color2) => {
  const [rMin, gMin, bMin] = hexARGB(color1);
  const [rMax, gMax, bMax] = hexARGB(color2);

  return (valor) => {
    const r = mapear(valor, valorMin, valorMax, rMin, rMax);
    const g = mapear(valor, valorMin, valorMax, gMin, gMax);
    const b = mapear(valor, valorMin, valorMax, bMin, bMax);
    return `rgb(${r},${g},${b})`;
  };
};

export const escalaCoordenadas = (latitudMin, latitudMax, longitudMin, longitudMax) => {
  const sur = aRadianes(latitudMin);
  const norte = aRadianes(latitudMax);
  const oriente = aRadianes(longitudMax);
  const occidente = aRadianes(longitudMin);
  const yMin = mercatorY(sur);
  const yMax = mercatorY(norte);

  // https://stackoverflow.com/questions/41557891/convert-lat-long-to-x-y-position-within-a-bounding-box
  /**
   * Proyección de un punto en coordenadas a pixeles
   *
   * @param {array} punto Punto en formato [longitud, latitud]
   * @param {number} ancho Ancho del mapa en pixeles
   * @param {number} alto Alto del mapa en piexeles
   * @returns {object} Coordenadas en {x, y}
   */
  return ([longitud, latitud], ancho, alto) => {
    const latitudRad = aRadianes(latitud);
    const longitudRad = aRadianes(longitud);

    const escalaX = ancho / (oriente - occidente);
    const escalaY = alto / (yMax - yMin);

    const x = (longitudRad - occidente) * escalaX;
    const y = (yMax - mercatorY(latitudRad)) * escalaY;
    return { x, y };
  };
};
