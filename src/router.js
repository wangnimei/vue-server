import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export function createRouter() {
  return new VueRouter({
    mode: 'history',
    routes: [{
        name: 'home',
        path: '/home',
        component: () => import( /* webpackChunkName: 'home' */ './components/Home')
      },
      {
        name: 'other',
        path: '/other',
        component: () => import( /* webpackChunkName: 'other' */ './components/Other')
      }
    ]
  })
}