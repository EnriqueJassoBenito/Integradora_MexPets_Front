import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import VeeValidate  from 'vee-validate'
import { Validator } from 'vee-validate'

import './assets/main.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VeeValidate)
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(IconsPlugin)

Validator.localize('es', {
  messages: {
    alpha: () => 'Este campo solo puede contener letras.',
    alpha_spaces: 'Solo acepta letras y espacios',
    required: () => 'Este campo es obligatorio.',
    digits:(filedName,[digito])=>`Deben ser ${digito} digitos y solo numeros`,
    date_format : 'El formato debe ser dd/MM/yyyy',
    date_between : "No esta en las fechas de 10/09/1954 al 20/09/2005",
    alpha_num: 'Solo acepta numeros y letras',
    max : (field,[num])=>`Solo ${num} como maximo`, 
    credit_card:"Debe ser una tarjeta de crédito/debito válida.",
    email:"El correo deb ser valido",
    alpha_dash:"Solo puede contener caracteres alfabéticos, números, guiones o guiones bajos.",
    min : (field,[num])=>`Debe de contener ${num} caracteres como minimo`,
    included:"Debes de selccionar una opcion (Masculino/Femenino)"
  }
});

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
