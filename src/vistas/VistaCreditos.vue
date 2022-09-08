<template>
  <div id="creditos">
    <h1>Créditos</h1>

    <div class="seccion" id="primerParrafo">
      Este proyecto fue financiado por la
      <span class="negrita"><a href="https://www.fundacionexito.org/" target="_blank">Fundación Éxito</a></span
      >, y desarrollado por
      <span class="negrita">IMAGINA - Centro para la promoción del bienestar de la infancia y adolescencia</span> en
      colaboración con el
      <span class="negrita"><a href="https://enflujo.com/" target="_blank">Laboratorio EnFlujo</a></span> en la
      Universidad de Los Andes de Bogotá, Colombia.
      <div id="logos" :class="clase ? clase : ''">
        <a href="https://www.fundacionexito.org/" target="_blank"
          ><img class="logo" src="../assets/imgs/logo_f_exito.svg"
        /></a>
        <img class="logo" src="../assets/imgs/logo_andes_imagina.svg" />
        <a href="https://enflujo.com" target="_blank"><img class="logo" src="../assets/imgs/logo_enflujo.svg" /></a>
      </div>
    </div>

    <div class="seccion">
      <h2 class="titulo">Investigadores</h2>
      <ul>
        <li type="circle">
          Tatiana Andia, PhD - Profesora Asociada, Departamento de Sociología Universidad de Los Andes
        </li>
        <li type="circle">
          Catalina González, PhD - Profesora Asociada, Facultad de Medicina Universidad de Los Andes
        </li>
        <li type="circle">
          Juan Camilo González, PhD - Profesor Asistente, Centro de Estudios en Periodismo y Facultad de Artes y
          Humanidades Universidad de Los Andes
        </li>
        <li type="circle">
          Arturo Harker, PhD - Director Centro IMAGINA y Profesor Asociado, Escuela de Gobierno Universidad de Los Andes
        </li>
        <li type="circle">
          Sandra Martínez, PhD - Investigadora Posdoctoral, Facultad de Medicina Universidad de Los Andes
        </li>
        <li type="circle">Carlos Rincón, MsC - Investigador Centro IMAGINA Universidad de Los Andes</li>
      </ul>
    </div>

    <div class="seccion">
      <h2 class="titulo">Asistentes de investigación</h2>
      <ul>
        <li type="circle">Natalia Córdoba Flechas</li>
        <li type="circle">Luis Esteban Díaz Jerez</li>
        <li type="circle">David Madinger</li>
        <li type="circle">Santiago Muñoz Vergara</li>
        <li type="circle">Samuel Pérez Castiblanco</li>
      </ul>
    </div>

    <div class="seccion">
      <h2 class="titulo">Programación y desarrollo web</h2>
      <ul>
        <li type="circle">
          Juan Camilo González - <a href="https://enflujo.com/" target="_blank">Laboratorio EnFlujo</a>
        </li>
        <li type="circle">
          Antonia Bustamante Robledo - <a href="https://enflujo.com/" target="_blank">Laboratorio EnFlujo</a>
        </li>
      </ul>
    </div>

    <div class="seccion">
      <h2 class="titulo">Diseño</h2>
      <ul>
        <li type="circle">
          Julián Camilo García - <a href="https://enflujo.com/" target="_blank">Laboratorio EnFlujo</a>
        </li>
      </ul>
    </div>

    <div class="seccion">
      <h2 class="titulo">Colaboración</h2>
      <ul>
        <li type="circle">Paula Salazar</li>
        <li type="circle">Issabella Rozo</li>
        <li type="circle">Gabriela Gil Yusty</li>
        <li type="circle">María José León</li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../assets/constantes.scss';

#creditos {
  width: 45vw;
  margin: 5em;
  padding: 2em;
  color: $colorOscuro;
  text-align: justify;

  .seccion {
    margin-top: 4em;

    .titulo {
      margin-bottom: 1em;
    }

    li {
      margin-top: 0.5em;
    }
  }

  #primerParrafo {
    font-size: 1.2em;
  }
}

.negrita {
  font-weight: bold;
}

#logos {
  padding: 3em 1em 0em 1em;
  z-index: 999999;
  background-color: rgba($colorFondoClaro, 0.75);

  &.historia {
    background-color: rgba($colorFondoHistorias, 0.75);
  }
}

.logo {
  height: 60px;
  margin: 0 2em;
}

a,
a:link {
  text-decoration: none;
  color: lighten($colorOscuro, 20%);
  transition: color 0.15s ease-in-out;

  &:hover {
    color: lighten($colorOscuro, 40%);
  }
}

ul {
  margin-left: 1.1em;
}
</style>
