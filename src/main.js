import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import './register'
import './cube-ui'
import './assets/css/global/index.scss'

const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://dollylosingweight.today/take-away/api'
  : '/api'

Vue.config.productionTip = false
Vue.prototype.$axios = axios.create({
  baseURL
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
