# Respuesta para mitigar el impacto sobre la salud materno infantil

La crisis sanitaria, social y económica del COVID-19 ha generado un traumatismo importante sobre el sistema de salud que pudo afectar especialmente la salud materno infantil, aumentando desenlaces que, en condiciones normales son prevenibles: morbilidad materna extrema, bajo peso al nacer, razón de mortalidad materna, parto pre-término, entre otros. Además, sabemos que este impacto negativo debió ser aún más grande en poblaciones donde estos problemas históricamente han sido más prevalentes.

---

En este repositorio se desarrollarán las visualizaciones y tableros de control de los resultados de la investigación.

Universidad de Los Andes.
Bogotá, 2022.

---

## Cómo usar este repositorio

### Configuración Webpack

El webpack exporta todo a `/docs` que es el nombre de la carpeta que Github Pages puede usar en una de sus múltiples configuraciones. Se puede cambiar si necesitan usar esta plantilla para otra cosa que no sea una página gratis en Github Pages.

### Instalación

Para instalar dependencias primero usar el comando:

```bash
yarn
```

o

```bash
npm install
```

### Desarrollo

Primero debe cambiar el nombre del archivo `.env.ejemplo` a `.env` (este .env no se va a incluir en el repositorio para mantener estas variables privadas).

Para crear un servidor local y ver los cambios del código al guardar:

```bash
yarn start
```

El `404.html` es exactamente igual a `index.html` - es para que Github Pages redireccione los 404 a un duplicado de `index.html`.

### Exportar sitio final

Para compilar el código y exportar todo los archivos que se deben subir al servidor (quedan en `/docs`):

```bash
yarn build
```
