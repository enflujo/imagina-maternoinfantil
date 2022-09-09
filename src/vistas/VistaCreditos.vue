<template>
  <main id="creditos">
    <header>
      <h2>Créditos</h2>

      <p>
        Este proyecto fue financiado por la
        <span class="negrita"><a href="https://www.fundacionexito.org/" target="_blank">Fundación Éxito</a></span
        >, y desarrollado por
        <span class="negrita">IMAGINA - Centro para la promoción del bienestar de la infancia y adolescencia</span> en
        colaboración con el
        <span class="negrita"><a href="https://enflujo.com/" target="_blank">Laboratorio EnFlujo</a></span> en la
        Universidad de Los Andes de Bogotá, Colombia.
      </p>

      <div id="logos" :class="clase ? clase : ''">
        <a href="https://www.fundacionexito.org/" target="_blank">
          <img class="logo" src="../assets/imgs/logo_f_exito.svg" />
        </a>

        <img class="logo" src="../assets/imgs/logo_andes_imagina.svg" />

        <a href="https://enflujo.com" target="_blank">
          <img class="logo" src="../assets/imgs/logo_enflujo.svg" />
        </a>
      </div>
    </header>

    <section>
      <h3>Investigadores</h3>

      <ul>
        <li>
          <a href="https://cienciassociales.uniandes.edu.co/profesores/tatiana-andia/" target="_blank" rel="external"
            >Tatiana Andia</a
          >, PhD - Profesora Asociada, Departamento de Sociología Universidad de Los Andes
        </li>
        <li>
          <a href="https://academia.uniandes.edu.co/AcademyCv/cgonzalez" target="_blank" rel="external"
            >Catalina González</a
          >, PhD - Profesora Asociada, Facultad de Medicina Universidad de Los Andes
        </li>
        <li>
          <a href="https://enflujo.com/equipo/juan-camilo-gonzalez" target="_blank" rel="external"
            >Juan Camilo González</a
          >, PhD - Profesor Asistente, Centro de Estudios en Periodismo y Facultad de Artes y Humanidades Universidad de
          Los Andes
        </li>
        <li>
          <a href="https://academia.uniandes.edu.co/AcademyCv/a.harker" target="_blank" rel="external">Arturo Harker</a
          >, PhD - Director Centro IMAGINA y Profesor Asociado, Escuela de Gobierno Universidad de Los Andes
        </li>
        <li>
          <a
            href="https://colev.uniandes.edu.co/en/about-us/our-team/16-our-team/104-sandra-martinez"
            target="_blank"
            rel="external"
            >Sandra Martínez</a
          >
          , PhD - Investigadora Posdoctoral, Facultad de Medicina Universidad de Los Andes
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/carlowrp/?trk=people_directory&originalSubdomain=co"
            target="_balnk"
            rel="external"
            >Carlos Rincón</a
          >, MsC - Investigador Centro IMAGINA Universidad de Los Andes
        </li>
      </ul>
    </section>

    <section>
      <h3>Asistentes de investigación</h3>
      <ul>
        <li>Natalia Córdoba Flechas</li>
        <li>Luis Esteban Díaz Jerez</li>
        <li>David Madinger</li>
        <li>Santiago Muñoz Vergara</li>
        <li>Samuel Pérez Castiblanco</li>
      </ul>
    </section>

    <section>
      <h3>Programación y desarrollo web</h3>
      <ul>
        <li>
          <a href="https://enflujo.com/equipo/juan-camilo-gonzalez" target="_blank" rel="external"
            >Juan Camilo González</a
          >
        </li>
        <li>
          <a href="https://enflujo.com/equipo/antonia-bustamante" target="_blank" rel="external"
            >Antonia Bustamante Robledo</a
          >
        </li>
      </ul>
    </section>

    <section>
      <h3>Diseño</h3>
      <ul>
        <li>
          <a href="https://enflujo.com/equipo/julian-garcia" target="_blank" rel="external">Julián Camilo García</a>
        </li>
      </ul>
    </section>

    <section>
      <h3>Colaboración</h3>
      <ul>
        <li>Paula Alejandra Salazar</li>
        <li>Issabella Rozo</li>
        <li>Gabriela Gil Yusty</li>
        <li>María José León</li>
      </ul>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@import '../assets/constantes.scss';

h2 {
  font-size: 2em;
  margin-bottom: 1em;
}

h3 {
  font-size: 1.5em;
  margin-bottom: 1em;
}

#creditos {
  padding: 2em 2em 10em 2em;
  color: $colorOscuro;
  text-align: justify;
}

section {
  margin-top: 4em;

  li {
    margin-top: 0.5em;
    list-style-type: circle;
  }
}

header {
  p {
    font-size: 1.2em;
  }
}

.negrita {
  font-weight: bold;
}

#logos {
  background-color: rgba($colorFondoClaro, 0.75);
  margin-top: 3em;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;

  &.historia {
    background-color: rgba($colorFondoHistorias, 0.75);
  }
}

.logo {
  height: 35px;
}

a,
a:link {
  text-decoration: none;
  color: lighten($colorOscuro, 20%);
  transition: color 0.15s ease-in-out;
  font-weight: bold;

  &:hover {
    color: lighten($colorOscuro, 40%);
  }
}

ul {
  margin-left: 1.1em;
}

// Teléfonos horizontal
@media (min-width: $minCelular) {
  .logo {
    height: 45px;
  }
}
// Pantallas medianas (Tablets)
@media (min-width: $minTablet) {
  #creditos {
    margin: 5em;
  }
}
// Dispositivos grandes y pantallas medianas
@media (min-width: $minPantalla) {
  .logo {
    height: 50px;
  }
}
// Pantallas grandes
@media (min-width: $minPantallaGrande) {
  #creditos {
    width: 50vw;
    max-width: 900px;
  }
}
</style>
