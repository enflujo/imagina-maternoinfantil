<script setup></script>

<template>
  <div id="contenedorFrase">
    (...) a las siete de la mañana me rompió fuente, ella misma [la doctora] la rompió -con un ganchito-. Llegaron las 4
    de la tarde y la bebé estaba sin líquido. Ahí fue donde me pasaron a cesárea cuando ya estaba muy débil,
    prácticamente inconsciente.
    <span id="mas"><a href="/imagina-maternoinfantil/historias">+</a></span>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/constantes.scss';

#contenedorFrase {
  width: 97%;
  background: $colorBlanco;
  color: $colorOscuro;
  height: fit-content;
  padding: 2em 1.5em;
  border-radius: 1px;
  margin: 2em auto;
  font-family: $fuenteTexto;
  font-size: 0.9em;
  font-weight: $fuentePesoNegrita;
  font-style: italic;
  border: $colorVerdeResaltado solid 3px;
  position: relative;
  top: 20%;
  left: 3em;
}
#mas {
  padding: 0.3em;
  line-height: 0.9em;
  text-decoration: none;
  display: block;
  font-size: 1.3em;
  background-color: #e1dfdf;
  width: fit-content;
  border: $colorOscuro solid 1px;
  border-radius: 5px;
  position: relative;
  left: 97%;

  a {
    text-decoration: none;
  }
}
</style>
