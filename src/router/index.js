import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '@/components/Welcome'
import Weather from '@/components/weather/Weather'
import RQMachine from '@/components/rqmachine/RQMachine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Welcome
    },
    {
      path: '/weather',
      component: Weather
    },
    {
      path: '/rqmachine',
      component: RQMachine
    }
  ]
})
