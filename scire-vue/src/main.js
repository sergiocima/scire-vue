import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa il router
import './style.css'; // Importa il file CSS globale

// Crea l'app Vue, utilizza il router e monta l'applicazione
const app = createApp(App);
app.use(router);
app.mount('#app');
