import { createRouter, createWebHistory } from "vue-router";
import PageHome from '../pages/PageHome.vue';
import PageNotFound from '../pages/PageNotFound.vue';

const routes = [
    { path: '/home', component: PageHome},
    // { path: '/', redirect: '/dishTypes'},
    { path: '/:pathMatch(.*)*', component: PageNotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;