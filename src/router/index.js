import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from '../views/Goods.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Goods',
    component: Goods
  },
  {
    path: '/seller',
    name: 'Seller',
    component: () => import(/* webpackChunkName: "seller" */ '../views/Seller.vue')
  },
  {
    path: '/ratings',
    name: 'Ratings',
    component: () => import(/* webpackChunkName: "ratings" */ '../views/Ratings.vue')
  }
]

const router = new VueRouter({
  routes,
  linkExactActiveClass: 'active'
})

export default router
