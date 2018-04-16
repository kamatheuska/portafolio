import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '@/components/Welcome'
import Weather from '@/components/weather/Weather'
import RQMachine from '@/components/rqmachine/RQMachine'
import WikiViewer from '@/components/wikiViewer/WikiViewer'

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
    },
    {
      path: '/wikiviewer',
      component: WikiViewer
    }
  ]
})
