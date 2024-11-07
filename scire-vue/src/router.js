import { createRouter, createWebHistory } from 'vue-router';
import ListaArticoli from './components/ListaArticoli.vue';
import DettaglioArticolo from './components/DettaglioArticolo.vue';

const routes = [
  { path: '/', component: ListaArticoli },
  { path: '/articolo/:id', component: DettaglioArticolo, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
