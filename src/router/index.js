import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['@/components/Layout/home.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['@/pages/index.vue'], resolve)
        },
        {
          path: '/index.html',
          component: resolve => require(['@/pages/index.vue'], resolve)
        },
        {
          path: '/item/:id(\\d+).html',
          component: resolve => require(['@/pages/item.vue'], resolve)
        },
        {
          path: '/me.html',
          component: resolve => require(['@/pages/me.vue'], resolve)
        },
        {
          path: '/shopping-cart.html',
          component: resolve => require(['@/pages/shopping-cart.vue'], resolve)
        },
        {
          path: '/pay.html',
          component: resolve => require(['@/pages/pay.vue'], resolve)
        },
        {
          path: '/trade/:id(\\d+).html',
          component: resolve => require(['@/pages/trade.vue'], resolve)
        }
      ]
    }
  ]
})
