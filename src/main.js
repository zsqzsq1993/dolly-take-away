import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import './register'
import './cube-ui'

import './assets/css/global/index.scss'

Vue.config.productionTip = false
Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:8080/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
