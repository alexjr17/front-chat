// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import 'bootstrap'; // Importa el JavaScript de Bootstrap

createApp(App).use(router).mount('#app');
