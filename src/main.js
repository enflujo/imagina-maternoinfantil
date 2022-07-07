import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import rutas from './rutas';

const app = createApp(App);

app.use(createPinia());
app.use(rutas);

app.mount('#app');
