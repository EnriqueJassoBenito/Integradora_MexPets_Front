import Vue from 'vue'
import App from './App.vue' // esto te trae los componentes asi es xd
import router from './routes' // para mandar a traer las rutas eii
import './assets/main.css'//hi purple girl 
import { BootstrapVue, IconsPlugin }  from 'bootstrap-vue'
import { VueFlux } from 'vue-flux'
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueFlux)
import './assets/main.css'

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
