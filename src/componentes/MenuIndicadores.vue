<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { usarCerebroDatos } from '../cerebro/datos';
import fuentes from '../utilidades/fuentes';

const cerebroDatos = usarCerebroDatos();
const contenedor = ref(null);

onMounted(() => {
  document.body.addEventListener('click', clicFuera);
});

onUnmounted(() => {
  document.body.removeEventListener('click', clicFuera);
});

function clicFuera(evento) {
  if (!(contenedor.value === evento.target || contenedor.value.contains(evento.target))) {
    contenedor.value.classList.remove('visible');
  }
}

function cerrar() {
  contenedor.value.classList.remove('visible');
}

function abrir(evento) {
  evento.stopPropagation();
  contenedor.value.classList.add('visible');
}
</script>

<template>
  <aside>
    <button id="mostrarIndicadores" @click="abrir">Indicadores</button>

    <div id="contenedorIndicadores" ref="contenedor">
      <span class="cerrar" @click="cerrar">X</span>
      <h2>Indicadores</h2>
      <ul id="menuIndicadores" class="contenedorMenu">
        <li
          v-for="(indicador, i) in fuentes"
          @click="cerebroDatos.cambiarIndicador(i)"
          :key="indicador.nombreIndicador"
          class="botonIndicador"
          :class="i === cerebroDatos.indice ? 'activo' : ''"
        >
          {{ indicador.nombreIndicador }}
        </li>
      </ul>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

#contenedorIndicadores {
  position: fixed;
  z-index: 9;
  background-color: rgba($colorMenu, 0.9);
  height: calc(100vh - $tamañoEncabezado);
  top: $tamañoEncabezado;
  transition: all 0.2s ease-in-out;
  transform: translateX(-100%);
  border-radius: 0 10px 10px 0;
  overflow-y: auto;

  &.visible {
    transform: translateX(0);
  }
}

#menuIndicadores {
  color: $colorBlanco;
  padding: 1.5em 1.5em 5em 0;
  overflow: auto;
  margin: 0;
  width: 80vw;
}

h2 {
  color: $colorBlanco;
  border-bottom: 2px solid $colorBlanco;
  padding-bottom: 0.5em;
  padding-top: 1em;
  margin-bottom: 1em;
  margin-left: 1.5em;
}

.cerrar {
  font-size: 2em;
  margin: 0.5em 1em auto;
  cursor: pointer;
  display: block;
  text-align: right;
  color: $colorBlanco;
  margin-bottom: -1em;
}

.botonIndicador {
  cursor: pointer;
  padding: 0.5em 0.5em 0.5em 2.5em;
  border: 2px solid transparent;
  border-left: none;

  &:hover {
    opacity: 0.6;
  }

  &.activo {
    opacity: 1;
    border-color: $colorBlanco;
    background-color: $colorMenuClaro;
  }
}

// Teléfonos horizontal
@media (min-width: $minCelular) {
}
// Pantallas medianas (Tablets)
@media (min-width: $minTablet) {
}
// Dispositivos grandes y pantallas medianas
@media (min-width: $minPantalla) {
  #menuIndicadores {
    width: 50vw;
  }
}
// Pantallas grandes
@media (min-width: $minPantallaGrande) {
  #contenedorIndicadores {
    transform: none;
    position: relative;
    top: 0;
  }

  .cerrar,
  #mostrarIndicadores {
    display: none;
  }

  #menuIndicadores {
    width: 20vw;
  }
}
</style>
