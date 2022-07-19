export const convertirEscala = (valor, escalaBaseMin, escalaBaseMax, escalaDestinoMin, escalaDestinoMax) => {
  return (
    ((valor - escalaBaseMin) * (escalaDestinoMax - escalaDestinoMin)) / (escalaBaseMax - escalaBaseMin) +
    escalaDestinoMin
  );
};

export const PI_CUARTO = Math.PI / 4;
export const aRadianes = (grados) => (grados * Math.PI) / 180;
export const mercatorY = (latitud) => Math.log(Math.tan(latitud / 2 + PI_CUARTO));

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

/**
 * Convierte una escala de valores a una escala de colores y mapea el
 * valor ingresado al color correspondiente.
 * @param {number} valorMin Valor mínimo de la escala que se quiere mapear.
 * @param {number} valorMax Valor máximo de la escala que se quiere mapear.
 * @param {color} color1 Color inicial de la escala en hexadecimal.
 * @param {color} color2 Color final de la escala en hexadecimal.
 * @returns
 */
export const escalaColores = (valorMin, valorMax, color1, color2) => {
  const [rMin, gMin, bMin] = hexARGB(color1);
  const [rMax, gMax, bMax] = hexARGB(color2);

  /**
   * @param {number} valor Cualquier número de la escala que se quiere mapear.
   */
  return (valor) => {
    const r = convertirEscala(valor, valorMin, valorMax, rMin, rMax);
    const g = convertirEscala(valor, valorMin, valorMax, gMin, gMax);
    const b = convertirEscala(valor, valorMin, valorMax, bMin, bMax);
    return `rgb(${r},${g},${b})`;
  };
};

/**
 * Proyecta un punto de coordenadas a pixeles.
 */
export const escalaCoordenadas = (latitudMin, latitudMax, longitudMin, longitudMax) => {
  const sur = aRadianes(latitudMin);
  const norte = aRadianes(latitudMax);
  const oriente = aRadianes(longitudMax);
  const occidente = aRadianes(longitudMin);
  const yMin = mercatorY(sur);
  const yMax = mercatorY(norte);

  // https://stackoverflow.com/questions/41557891/convert-lat-long-to-x-y-position-within-a-bounding-box
  /**
   * Proyección de un punto de coordenadas a pixeles
   *
   * @param {array} punto Punto en formato [longitud, latitud]
   * @param {number} ancho Ancho del mapa en pixeles
   * @param {number} alto Alto del mapa en pixeles
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

function crearSeccionSvg(punto, cabeza, mapearCoordenadas, ancho, alto) {
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
 * `L` = _lineTo_ (Punto de una línea. `L{punto.x} {punto.y}`)
 *
 * `Z` = _closePath_ (Fin del _path_. `Z`)
 * @param {Object} coordenadas Array de coordenadas
 * @param {Callback} mapearCoordenadas Función para mapear de latitud, longitud a pixeles.
 * @returns res contiene los datos de los elementos SVG<path>
 */
export function crearLinea(coordenadas, mapearCoordenadas, ancho, alto) {
  let res = '';
  coordenadas.forEach((grupo) => {
    grupo.forEach((punto, i) => {
      const cabeza = i === 0 ? 'M' : 'L';

      if (typeof punto[0] === 'object') {
        punto.forEach((puntoMulti, j) => {
          if (j === 0) {
            res += crearSeccionSvg(puntoMulti, 'M', mapearCoordenadas, ancho, alto);
          } else {
            res += crearSeccionSvg(puntoMulti, 'L', mapearCoordenadas, ancho, alto);
          }
        });
      } else {
        res += crearSeccionSvg(punto, cabeza, mapearCoordenadas, ancho, alto);
      }

      res += i === grupo.length - 1 ? 'Z' : '';
    });
  });
  return res;
}
