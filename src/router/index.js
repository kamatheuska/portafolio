import Vue from 'vue'
import Router from 'vue-router'

// import Welcome from '@/components/Welcome'
import Weather from '@/components/apps/Weather'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   component: Welcome
    // },
    {
      path: '/weather',
      component: Weather
    }
  ]
})
