/**
 * Extrae los extremos del area contenida en datos GeoJSON
 *
 * @param {Object} geojson - Datos en GeoJSON
 */

export const extremosLugar = (geojson) => {
  let latitudMin = Infinity;
  let latitudMax = -Infinity;
  let longitudMin = Infinity;
  let longitudMax = -Infinity;

  if (geojson.type === 'FeatureCollection') {
    geojson.features.forEach((area) => {
      area.geometry.coordinates.forEach((areas) => {
        extraer(areas);
      });
    });
  } else if (geojson.type === 'Feature') {
    geojson.geometry.coordinates.forEach((area) => {
      area.forEach((n) => {
        extraer(n);
      });
    });
  } else if (typeof geojson === 'object') {
    geojson.forEach((area) => {
      extraer(area);
    });
  }

  function extraer(areas) {
    areas.forEach((punto) => {
      const [longitud, latitud] = punto;
      longitudMin = longitudMin > longitud ? longitud : longitudMin;
      longitudMax = longitudMax < longitud ? longitud : longitudMax;
      latitudMin = latitudMin > latitud ? latitud : latitudMin;
      latitudMax = latitudMax < latitud ? latitud : latitudMax;
    });
  }

  return { latitudMin, latitudMax, longitudMin, longitudMax };
};

export const extremosPorcentaje = (datos, año) => {
  let porcentajeMin = Infinity;
  let porcentajeMax = -Infinity;

  datos.forEach((lugar) => {
    if (lugar.datos.año) {
      const porcentaje = lugar.datos[año][2];
      porcentajeMin = porcentaje < porcentajeMin ? porcentaje : porcentajeMin;
      porcentajeMax = porcentaje > porcentajeMax ? porcentaje : porcentajeMax;
    }
  });

  return { porcentajeMin, porcentajeMax };
};
