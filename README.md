# Plantilla Vue

Una plantilla con una configuración mínima para usar Vue. Tiene implementadas las siguientes tecnologías:

- Webpack
- SASS (con autoprefixer)
- Babel

## Configuración Webpack

El webpack exporta todo a `/docs` que es el nombre de la carpeta que Github Pages puede usar en una de sus múltiples configuraciones. Se puede cambiar si necesitan usar esta plantilla para otra cosa que no sea una página gratis en Github Pages.

## Instalación

Para instalar dependencias primero usar el comando:

```bash
yarn
```

o

```bash
npm install
```

## Desarrollo

Primero debe cambiar el nombre del archivo `.env.ejemplo` a `.env` (este .env no se va a incluir en el repositorio para mantener estas variables privadas).

Para crear un servidor local y ver los cambios del código al guardar:

```bash
yarn start
```

El `404.html` es exactamente igual a `index.html` - es para que Github Pages redireccione los 404 a un duplicado de `index.html`.

## Exportar sitio final

Para compilar el código y exportar todo los archivos que se deben subir al servidor (quedan en `/docs`):

```bash
yarn build
```
