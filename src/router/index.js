import Vue from 'vue'
import Router from 'vue-router'
import demo from '@/components/demo'
import color from '@/components/color/color'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'demo',
      component: demo
    },
    {
      path: '/color',
      name: 'color',
      component: color
    }
  ]
})
