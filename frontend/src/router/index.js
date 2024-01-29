import { createRouter, createWebHistory } from "vue-router";
import PageLogin from '../pages/PageLogin.vue';
import PageHome from '../pages/PageHome.vue';
import PageAbout from '../pages/PageAbout.vue';
import PageNotFound from '../pages/PageNotFound.vue';
import LayoutStandard from '../layout/LayoutStandard.vue';
import LayoutLogin from '../layout/LayoutLogin.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    meta: {
      layout: LayoutLogin,
      requiresAuth: false
    },
    components: {
      default: PageLogin
    },
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      layout: LayoutStandard,
      requiresAuth: true
    },
    components: {
      default: PageHome
    },
  },  
  {
    path: '/about',
    name: 'About',
    meta: {
      layout: LayoutStandard,
      requiresAuth: true
    },
    components: {
      default: PageAbout
    },
  },
  
  { path: '/:pathMatch(.*)*', component: PageNotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;