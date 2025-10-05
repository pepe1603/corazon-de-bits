import { createApp } from 'vue'
import App from './App.vue'

//style
import './assets/master.css'

// Importaciones de Font Awesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { registerPWA } from './registerServiceWorker' //paso 1.- importamos metood de regisstrro PWA

const app = createApp(App)
// Registramos el componente de Font Awesome globalmente
app.component('font-awessome-icon', FontAwesomeIcon)

//apso 2. Llamar a la función de registro del Service Worker
// Esto se hace antes de montar la aplicación principal
registerPWA()

app.mount('#app')
