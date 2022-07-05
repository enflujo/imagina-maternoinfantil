<script setup></script>

<template>
  <div id="contenedorGaleria">
    <h3>Bocetos de cómo nos imaginamos la interfaz</h3>
    <div id="galeria"></div>
    <div id="contenedorImagen"></div>
  </div>
</template>

<style lang="scss" scoped>
#contenedorGaleria {
  display: flex;
  flex-direction: column;
  margin: 2%;
  font-family: $fuenteTitulos;
  color: rgb(239, 100, 97);

  &.abierto {
    display: block;
  }

  h3 {
    margin-left: 2%;
    font-size: 2em;
  }
}

#galeria {
  display: flex;
  overflow-x: scroll;
  flex-wrap: wrap;
  justify-content: center;
}

.imagen {
  height: 35vh;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
}

#contenedorImagen {
  padding: 2%;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  display: none;

  &.abierto {
    display: block;
    cursor: pointer;
  }

  img {
    height: 90vh;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  #flechaDerecha {
    width: 2%;
    right: 5%;
    position: absolute;
    top: 46vh;
    font-size: 5em;
    font-family: $fuenteTexto;
    color: #2ddfa9;

    &.ultima {
      color: #000000;
    }
  }

  #flechaDerecha:hover {
    color: #ef6461;
  }

  #flechaIzquierda {
    width: 2%;
    left: 5%;
    position: absolute;
    top: 46vh;
    font-size: 5em;
    font-family: $fuenteTexto;
    color: #2ddfa9;
  }

  #flechaIzquierda:hover {
    color: #ef6461;
  }
}
</style>
