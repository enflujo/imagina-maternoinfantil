import municipios from '../datos/municipios.json';
import datosAnticoncepcion from '../datos/anticoncepcion.json';

export default () => {
  const años = [];
  let porcentajeMin = Infinity;
  let porcentajeMax = -Infinity;
  let latitudMin = Infinity;
  let latitudMax = -Infinity;
  let longitudMin = Infinity;
  let longitudMax = -Infinity;

  municipios.features = municipios.features.map((municipio) => {
    const codigo = municipio.properties.codigo;
    const datosMunicipio = datosAnticoncepcion.find((datosMun) => datosMun.codMun === codigo);

    municipio.geometry.coordinates.forEach((area) => {
      area.forEach((punto) => {
        const [longitud, latitud] = punto;
        longitudMin = longitudMin > longitud ? longitud : longitudMin;
        longitudMax = longitudMax < longitud ? longitud : longitudMax;
        latitudMin = latitudMin > latitud ? latitud : latitudMin;
        latitudMax = latitudMax < latitud ? latitud : latitudMax;
      });
    });

    if (datosMunicipio) {
      for (let año in datosMunicipio.datos) {
        if (!años.includes(año)) años.push(año);
        const porcentaje = datosMunicipio.datos[año].porcentaje;
        porcentajeMin = porcentajeMin > porcentaje ? porcentaje : porcentajeMin;
        porcentajeMax = porcentajeMax < porcentaje ? porcentaje : porcentajeMax;
      }

      municipio.datos = datosMunicipio.datos;
      return municipio;
    } else {
      console.log('No hay datos de', municipio.properties.nombre);
    }
  });

  return { municipios, años, porcentajeMin, porcentajeMax, latitudMin, latitudMax, longitudMin, longitudMax };
};
