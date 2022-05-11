export default (departamentos, fuente) => {
  let porcentajeMin = Infinity;
  let porcentajeMax = -Infinity;
  let latitudMin = Infinity;
  let latitudMax = -Infinity;
  let longitudMin = Infinity;
  let longitudMax = -Infinity;

  departamentos.features = departamentos.features.map((departamento) => {
    const codigo = departamento.properties.codigo;
    const datosDepartamento = fuente.find((depObj) => codigo === depObj.dep);

    departamento.geometry.coordinates.forEach((area) => {
      area.forEach((punto) => {
        const [longitud, latitud] = punto;
        longitudMin = longitudMin > longitud ? longitud : longitudMin;
        longitudMax = longitudMax < longitud ? longitud : longitudMax;
        latitudMin = latitudMin > latitud ? latitud : latitudMin;
        latitudMax = latitudMax < latitud ? latitud : latitudMax;
      });
    });

    if (datosDepartamento) {
      for (let año in datosDepartamento.agregados) {
        const porcentaje = datosDepartamento.agregados[año][2];
        porcentajeMin = porcentajeMin > porcentaje ? porcentaje : porcentajeMin;
        porcentajeMax = porcentajeMax < porcentaje ? porcentaje : porcentajeMax;
      }

      departamento.datos = datosDepartamento.agregados;
    } else {
      // console.log('No hay datos de', municipio.properties.nombre);
    }
    return departamento;
  });

  return { departamentos, porcentajeMin, porcentajeMax, latitudMin, latitudMax, longitudMin, longitudMax };
};
