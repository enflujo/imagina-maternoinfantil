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

  geojson.features.forEach((area) => {
    area.geometry.coordinates.forEach((areas) => {
      areas.forEach((punto) => {
        const [longitud, latitud] = punto;
        longitudMin = longitudMin > longitud ? longitud : longitudMin;
        longitudMax = longitudMax < longitud ? longitud : longitudMax;
        latitudMin = latitudMin > latitud ? latitud : latitudMin;
        latitudMax = latitudMax < latitud ? latitud : latitudMax;
      });
    });
  });

  return { latitudMin, latitudMax, longitudMin, longitudMax };
};

export const extremosPorcentaje = (datos, año) => {
  let porcentajeMin = Infinity;
  let porcentajeMax = -Infinity;

  datos.forEach((lugar) => {
    const porcentaje = lugar.datos[año][2];
    porcentajeMin = porcentaje < porcentajeMin ? porcentaje : porcentajeMin;
    porcentajeMax = porcentaje > porcentajeMax ? porcentaje : porcentajeMax;
  });

  return { porcentajeMin, porcentajeMax };
};
