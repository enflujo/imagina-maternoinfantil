export const PI_CUARTO = Math.PI / 4;
export const aRadianes = (grados) => (grados * Math.PI) / 180;
export const mercatorY = (latitud) => Math.log(Math.tan(latitud / 2 + PI_CUARTO));
