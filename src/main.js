import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import cloudinary from 'cloudinary-core';
import VueFormulate from '@braid/vue-formulate';
import '@braid/vue-formulate/dist/snow.min.css';

import './assets/main.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const cloudinaryConfig = {
  cloud_name: 'db5zuwucd',
  api_key: '733776665585982',
  api_secret: 'UHMJ6N_YU8m5ozoxqyVKB68u49U',
};

Vue.prototype.$cloudinary = cloudinary.Cloudinary.new(cloudinaryConfig);
+Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(IconsPlugin)
Vue.use(VueFormulate);

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
