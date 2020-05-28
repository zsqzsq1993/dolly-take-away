import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import './register'
import './cube-ui'

import './assets/css/global/index.scss'

Vue.config.productionTip = false
Vue.prototype.$axios = axios.create({
  baseURL: 'http://106.53.118.169:8080/api' // 本地开发localhost
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
