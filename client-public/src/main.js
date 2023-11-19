import './assets/style.css'
import vue3GoogleLogin from 'vue3-google-login'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(pinia)
app.use(router)

app.use(vue3GoogleLogin, {
  clientId: '403418316532-ln6qcrtfm0p7df810lfc183kq6ve95ah.apps.googleusercontent.com'
})

app.mount('#app')
