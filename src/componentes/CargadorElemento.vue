<template>
  <div id="cargador">
    <svg
      version="1.1"
      id="L4"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enable-background="new 0 0 0 0"
      xml:space="preserve"
    >
      <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1" />
      </circle>
      <circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2" />
      </circle>
      <circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3" />
      </circle>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/constantes.scss';

#cargador {
  position: fixed;
  z-index: 999999999999999999;
  background-color: rgba($colorVerdeResaltado, 0.3);
  color: white;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

svg {
  width: 200px;
  position: fixed;
  left: 50%;
  top: 50vh;
  transform: translate(-50%, -50%);
}
</style>
