<template>
  <main>
    <h1>Mitigar el impacto de la pandemia del Covid19 sobre la salud materno infantil</h1>
    <button @click="dibujarMapa">Dibujar mapa</button>
    <div>
      <canvas id="lienzo"> </canvas>
    </div>

    <!-- <p @click="mostrarDatos('https://www.datos.gov.co/resource/ynn5-77cb.json')">obtener datos</p> -->
  </main>
</template>

<script>
import Enlace from '../Componentes/Enlace.vue';
import { geoTransverseMercator, geoNaturalEarth1, geoPath, json } from 'd3';
import * as topojson from 'topojson';
import municipios from '../../datos/MunicipiosVeredas1MB.json';

export default {
  components: { Enlace },
  data: function () {
    return {
      datos: {
        anchoVentana: document.documentElement.clientWidth,
        alturaVentana: document.documentElement.clientHeight,
      },
    };
  },

  mounted() {
    window.addEventListener('resize', this.dibujarMapa);
    this.dibujarMapa;
  },

  methods: {
    async dibujarMapa() {
      this.actualizarDimension();

      // Seleccionar el elemento 'lienzo' del html
      const lienzo = document.getElementById('lienzo');

      lienzo.width = this.anchoVentana / 2;
      lienzo.height = this.alturaVentana;

      // Elegir y configurar la proyección para el mapa
      const proyeccion = geoNaturalEarth1()
        // //.rotate([0, -15])
        .scale(lienzo.width * 1.4)
        .translate([lienzo.width * 2, lienzo.height / 2]);

      // Elegir el contexto
      const ctx = lienzo.getContext('2d');

      const generadorTrazo = geoPath(proyeccion, ctx);

      //ctx.fillStyle = 'pink';
      //ctx.fillRect(0, 5, lienzo.width, lienzo.height);
      const respuesta = await fetch('.');
      // const datos = await respuesta.json();

      ctx.beginPath();
      generadorTrazo(municipios);
      //generadorTrazo(topojson.mesh(datos, datos.objects.mpios));
      //generadorTrazo(topojson.mesh(datos, datos.objects.depts));
      ctx.fillStyle = 'yellow';
      ctx.fill();

      ctx.strokeStyle = 'black';
      ctx.stroke();
      // ctx.beginPath();
      // ctx.lineWidth = '3';
      // ctx.strokeStyle = 'black';
      // ctx.moveTo(0, 5);
      // ctx.lineTo(100, 100);
      // ctx.stroke();
    },

    actualizarDimension() {
      this.anchoVentana = window.innerWidth;
      this.alturaVentana = window.innerHeight;
    },
    /***
     * Obtener datos usando a través de una API
     * @param {string} url - url para hacer la petición
     */
    async obtenerDatos(url = '') {
      const respuesta = await fetch(url, {
        method: 'GET',
        data: {
          $$app_token: '3ApcMRIM9OAbaYtZIwOq03uGt',
        },
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return respuesta.json();
    },
    mostrarDatos(url) {
      this.obtenerDatos(url).then((data) => {
        console.log(data);
      });
    },

    // onComplete(resultado, archivo) {
    //   this.datos = resultado;
    //   console.log(this.datos);
    // },
    // leerArchivo() {
    //   var archivo = '../codigos_division_colombia.csv';
    //   console.log(archivo)
    //   this.$papa.parse(archivo, {
    //     header: true,
    //     complete: this.onComplete
    //   });
    // }
  },
};
</script>

<style lang="scss">
#lienzo {
  background-color: gray;
}
</style>
