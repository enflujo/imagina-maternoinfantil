<template>
  <div id="creditos">
    <h1>Créditos</h1>

    <div class="seccion">
      <h2 class="titulo">Investigación principal:</h2>

      <ul>
        Tatiana Andia, PhD
      </ul>
      <ul>
        Catalina González, PhD
      </ul>
      <ul>
        Juan Camilo González, PhD
      </ul>
      <ul>
        Arturo Harcker, PhD
      </ul>
      <ul>
        Sandra Martínez, PhD
      </ul>
      <ul>
        Carlos Rincón, MsC
      </ul>
      <ul>
        Catalina González, PhD
      </ul>
    </div>

    <div class="seccion">
      <h2 class="titulo">Asistencia de investigación:</h2>
      <ul>
        Luis Esteban Díaz Jerez
      </ul>
      <ul>
        Natalia Córdoba Flechas
      </ul>
      <ul>
        Samuel Pérez Castiblanco
      </ul>
      <ul>
        Santiago Muñoz Vergara
      </ul>
    </div>

    <div class="seccion">
      <h2 class="titulo">Programación y desarrollo web:</h2>
      <ul>
        Juan Camilo González (<a href="https://enflujo.com/">Laboratorio EnFlujo</a
        >)
      </ul>
      <ul>
        Antonia Bustamante Robledo (<a href="https://enflujo.com/">Laboratorio EnFlujo</a
        >)
      </ul>
    </div>

    <div class="seccion">
      <h2 class="titulo">Diseño:</h2>
      <ul>
        Julián Camilo García (<a href="https://enflujo.com/">Laboratorio EnFlujo</a
        >)
      </ul>
    </div>

    <div class="seccion">
      <h2 class="titulo">Colaboración:</h2>
      <ul>
        Paula Salazar
      </ul>
      <ul>
        Issabella Rozo
      </ul>
      <ul>
        Gabriela Gil Yusty
      </ul>
      <ul>
        María José León
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../assets/constantes.scss';

#creditos {
  // visibility: hidden;
  // position: absolute;
  width: 90vw;
  // height: 87vh;
  margin: 5em;
  // background-color: $colorBlanco;
  // opacity: 0.97;
  // z-index: 99;
  padding: 2em;
  color: #0041bf;
  // border: solid;
  // box-shadow: 0px 0px 5px 2px #4e4e4e;
  // border-radius: 15px;
  // overflow-y: scroll;

  // #cerrar {
  //   position: absolute;
  //   right: 3%;
  //   top: 3%;
  //   font-size: 1.2em;
  //   cursor: pointer;
  //   background-color: white;
  //   border: solid 1px;
  //   border-radius: 50%;
  //   height: 1.4em;
  //   width: 1.4em;
  //   justify-content: center;
  //   text-align: center;
  //   padding-top: 0.1em;
  //   font-weight: bold;
  // }

  .seccion {
    margin-top: 2em;

    .titulo {
      margin-bottom: 1em;
    }
  }
}
</style>
