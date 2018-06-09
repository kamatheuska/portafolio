import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '@/components/Welcome'
import WelcomeMobile from '@/components/WelcomeMobile'
import Weather from '@/components/weather/Weather'
import RQMachine from '@/components/rqmachine/RQMachine'
import WikiViewer from '@/components/wikiViewer/WikiViewer'
import TwitchBrowser from '@/components/twitchStreams/TwitchBrowser'
import Matiz from '@/components/Matiz'
import Earthbnb from '@/components/Earthbnb'
import SvgTest from '@/components/welcome/SvgTest'

Vue.use(Router)

const checkForMobile = (to, from, next) => {
  let queryPortrait = 'only screen and (min-device-width: 300px) and (max-device-width: 900px) and (orientation: portrait)'
  let queryLandscape = 'only screen and (min-device-width: 540px) and (max-device-width: 820px) and (orientation: landscape)'
  // eslint-disable-next-line
  if (Modernizr.mq(queryPortrait) || Modernizr.mq(queryLandscape)) {
    next('/m')
  } else {
    next()
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      component: Welcome,
      beforeEnter: checkForMobile
    },
    {
      path: '/m',
      component: WelcomeMobile
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
    },
    {
      path: '/twitchtv',
      component: TwitchBrowser
    },
    {
      path: '/matiz',
      component: Matiz
    },
    {
      path: '/earthbnb',
      component: Earthbnb
    },
    {
      path: '/test',
      component: SvgTest
    }
  ]
})
