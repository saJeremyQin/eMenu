import { createRouter, createWebHistory } from "vue-router";
import PageLogin from '../pages/PageLogin.vue';
import PageHome from '../pages/PageHome.vue';
import PageAbout from '../pages/PageAbout.vue';
import PageDishTypes from '../pages/PageDishTypes.vue';
import PageNotFound from '../pages/PageNotFound.vue';
import LayoutStandard from '../layout/LayoutStandard.vue';
import LayoutLogin from '../layout/LayoutLogin.vue';
import auth from "@/firebase";

const routes = [
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
    path: '/dishTypes',
    name: 'dishTypes',
    meta: {
      layout: LayoutStandard,
      requiresAuth: true
    },
    components: {
      default: PageDishTypes
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
  {
    path: '/',
    redirect: '/home',
  },
  { path: '/:pathMatch(.*)*', component: PageNotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to,from,next) => {
  // Wait for the authentication state to be resolved
  await new Promise(resolve => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log(user);
      unsubscribe(); // Unsubscribe once the state is resolved
      resolve();     // Resolve the promise
    });
  });
  if(to.path === '/login' && auth.currentUser) {
    console.log('come here when i am about?');
    next('/home')
    return
  }
  if(to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/login')
    return
  }
  next()
})
export default router;