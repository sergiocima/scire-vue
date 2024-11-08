import { createRouter, createWebHashHistory } from 'vue-router';
import ListaArticoli from './components/ListaArticoli.vue';
import DettaglioArticolo from './components/DettaglioArticolo.vue';

const routes = [
  {
    path: '/',
    name: 'ListaArticoli',
    component: ListaArticoli
  },
  {
    path: '/articolo/:Nid',
    name: 'DettaglioArticolo',
    component: DettaglioArticolo,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
