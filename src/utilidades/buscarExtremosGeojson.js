/**
 * Extrae los extremos del area contenida en datos GeoJSON
 *
 * @param {Object} geojson - Datos en GeoJSON
 */
export default (geojson) => {
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
