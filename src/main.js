import { createApp } from 'vue'
import App from './App.vue'

//style
import './assets/master.css'

// Importaciones de Font Awesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)
// Registramos el componente de Font Awesome globalmente
app.component('font-awessome-icon', FontAwesomeIcon)
app.mount('#app')
