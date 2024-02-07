import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import auth from './firebase'
import { useAuthStore } from './store/AuthStore'
import { onAuthStateChanged } from 'firebase/auth'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia);

const authStore = useAuthStore();
app.provide('authStore', authStore);

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
})

app.use(router).use(vuetify).mount('#app')


onAuthStateChanged(auth, (user) => {
  console.log('user in main.js is ',user);
  authStore.setUser(user);
   // 只有当应用程序初始化完成后，才跳转到相应页面
  if (app && router.currentRoute.value.path === '/login') {
    router.push('/home');
  }
});
