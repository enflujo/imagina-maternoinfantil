export default (municipios, fuente) => {
  let porcentajeMin = Infinity;
  let porcentajeMax = -Infinity;
  let latitudMin = Infinity;
  let latitudMax = -Infinity;
  let longitudMin = Infinity;
  let longitudMax = -Infinity;

  municipios.features = municipios.features.map((municipio) => {
    const codigo = municipio.properties.codigo;
    let datosMunicipio;
    // Acá están disponibles los datos de departamento para cuando se necesite mapear info a nivel departamental.
    const datosDepartamento = fuente.find((datosDep) => {
      const municipio = datosDep.municipios.find((datosMun) => datosMun.mun === codigo);

      if (municipio) {
        datosMunicipio = municipio;
        return true;
      }
      return false;
    });

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
      for (let año in datosMunicipio.agregados) {
        const porcentaje = datosMunicipio.agregados[año][2];
        porcentajeMin = porcentajeMin > porcentaje ? porcentaje : porcentajeMin;
        porcentajeMax = porcentajeMax < porcentaje ? porcentaje : porcentajeMax;
      }

      municipio.datos = datosMunicipio.agregados;
    } else {
      // console.log('No hay datos de', municipio.properties.nombre);
    }
    return municipio;
  });

  return { municipios, porcentajeMin, porcentajeMax, latitudMin, latitudMax, longitudMin, longitudMax };
};
