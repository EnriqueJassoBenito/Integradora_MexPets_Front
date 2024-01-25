import Vue from 'vue'
import App from './App.vue'
import router from './routes'

import { BootstrapVue, IconsPlugin }  from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import './assets/main.css'

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
