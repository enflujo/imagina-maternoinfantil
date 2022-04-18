<template>
  <main>
    <h1>Mitigar el impacto de la pandemia del Covid19 sobre la salud materno infantil</h1>
    <ul>
      <li>
        <enlace href="/">Inicio</enlace>
      </li>
      <p @click="mostrarDatos('https://www.datos.gov.co/resource/ynn5-77cb.json')">obtener datos</p>
    </ul>
  </main>
</template>

<script>
import Enlace from '../Componentes/Enlace.vue';

export default {
  components: { Enlace },
  data: function() {
    return {
      datos: {}
    };
  },

  methods: {
    async obtenerDatos(url = '') {
      const respuesta = await fetch(url, {
        method: 'GET',
        data: {
          $$app_token: '3ApcMRIM9OAbaYtZIwOq03uGt'
        },
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return respuesta.json();
    },

    mostrarDatos(url) {
      this.obtenerDatos(url).then(data => {
        console.log(data);
      });
    }

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
  }
};
</script>

<style lang="scss"></style>
