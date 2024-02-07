import { createRouter, createWebHistory } from "vue-router";
import PageLogin from '../pages/PageLogin.vue';
import PageHome from '../pages/PageHome.vue';
import PageAbout from '../pages/PageAbout.vue';
import PageNotFound from '../pages/PageNotFound.vue';
import LayoutStandard from '../layout/LayoutStandard.vue';
import LayoutLogin from '../layout/LayoutLogin.vue';
import { inject } from "vue";


const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
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

router.beforeEach((to, from, next) => {
  const authStore = inject('authStore');

  if(to.matched.some(record => record.meta.requiresAuth)) {
    next();
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.user) {
    console.log('User is not authenticated, redirecting to login page.');
    next('/login');
    return;
  }

  if (to.path === '/login' && authStore.user) {
    console.log('User is already authenticated, redirecting to home page.');
    next('/home');
    return;
  }

  next();
});


export default router;