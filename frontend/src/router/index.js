import { createRouter, createWebHistory } from "vue-router";
import PageHome from '../pages/PageHome.vue';
import PageNotFound from '../pages/PageNotFound.vue';
import LayoutStandard from '../layout/LayoutStandard.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: LayoutStandard,
      requiresAuth: true
    },
    components: {
      default: PageHome
    },
  },
  { path: '/:pathMatch(.*)*', component: PageNotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;