import { createRouter, createWebHistory } from 'vue-router';
import VistaTablero from '../vistas/VistaTablero.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: VistaTablero,
    },
    {
      path: '/creditos',
      name: 'creditos',
      // en función se exporta aparte y el JS se carga sólo cuando se abre la ruta.
      component: () => import('../vistas/VistaCreditos.vue'),
    },
    {
      path: '/historias',
      name: 'historias',
      // en función se exporta aparte y el JS se carga sólo cuando se abre la ruta.
      component: () => import('../vistas/VistaHistorias.vue'),
    },
  ],
});

export default router;
