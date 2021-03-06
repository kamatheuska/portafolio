import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// import * as Cookies from 'js-cookie';
// import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)
const hideElementsExcept = (menu, bool, arr) => {
  arr.forEach(el => {
    el.hidden = bool
  })
  // eslint-disable-next-line
  menu.active ? null : menu.hidden = !bool
  console.log(menu.hidden)
}

export default new Vuex.Store({
  state: {
    geolocation: {
      pos: {
        status: {
          error: false,
          msg: 'Unable to retrieve your location'
        },
        lat: '',
        lng: ''
      },
      clientError: false,
      msg: {
        success: 'No problem with your browser',
        error: 'Geolocation is not supported by your browser'
      }
    },
    configApi: {
      baseURL: 'http://localhost:5000/',
      data: {
        units: 'si',
        exclude: 'minutely,hourly,daily,alerts,flags'
      }
    },
    weatherApi: {
      url: {
        local: 'api/weather/local',
        other: 'api/weather/other'
      }
    },
    wikipediaApi: {
      url: 'https://en.wikipedia.org/w/api.php'
    },
    homepage: {
      svgConnectors: [
        { id: 'Connectors__welcome', hidden: false },
        { id: 'Connectors__bio', hidden: true },
        { id: 'Connectors__projects', hidden: true },
        { id: 'Connectors__music', hidden: true },
        { id: 'Connectors__contacts', hidden: true }
      ],
      navigation: [
        { id: 'nav-bio', name: 'bio', hidden: false, active: false },
        { id: 'nav-projects', name: 'projects', hidden: false, active: false },
        { id: 'nav-music', name: 'music', hidden: false, active: false },
        { id: 'nav-contact', name: 'contact', hidden: false, active: false }
      ]
    }
  },
  getters: {
    getFullConfigForLocal: ({ configApi }) =>
      (pos, service) => ({
        data: {
          units: configApi.data.units,
          exclude: configApi.data.exclude,
          coords: { lat: pos.lat, lng: pos.lng }
        },
        baseURL: configApi.baseURL
      }),

    getFullConfigForOther: ({ configApi }) =>
      (address, service) => ({
        data: {
          units: configApi.data.units,
          exclude: configApi.data.exclude,
          address: address
        },
        baseURL: configApi.baseear
      })

    // getNavIndex: ({ homepage }) =>
    // (name) => homepage.navigation.filter
  },
  mutations: {
    CONFIRM_GEOLOCATION_SUPPORT: state => { state.geolocation.clientError = false },
    NO_GEOLOCATION_SUPPORT: state => { state.geolocation.clientError = true },
    HANDLE_GEOLOCATION_SUCCESS: state => { state.geolocation.pos.status.error = false },
    HANDLE_GEOLOCATION_ERROR: state => { state.geolocation.pos.status.error = true },
    HANDLE_NAVIGATION_STATUS: ({ homepage }, menu) => {
      let navs = homepage.navigation
      let isNavActive = homepage.navigation.reduce((bool, el, i) => {
        // eslint-disable-next-line
        el.active ? bool = true : null
        return bool
      }, false)
      if (menu.name === 'projects' && !isNavActive) {
        hideElementsExcept(menu, true, navs)
        menu.active = true
      } else if (menu.name !== 'projects' && !isNavActive) {
        // Set hidden to true to every element except current
        hideElementsExcept(menu, true, navs)
        menu.active = true
      } else {
        // Return to main
        hideElementsExcept(menu, false, navs)
        menu.active = false
      }
    },
    TOGGLE_HOME_CONNECTORS: ({ homepage }, menu) => {
      console.log(menu)
      homepage.svgConnectors[0].hidden = !!menu.active
    },
    SET_NAVIGATION_TO_HOME: ({ homepage }) => {
      homepage.navigation.map(el => {
        el.active = false
        el.hidden = false
        return el
      })
      homepage.svgConnectors.map(el => {
        if (el.id !== 'Connectors__welcome') {
          el.hidden = true
        }
        el.hidden = false
      })
    },
    SET_USER_POSITION: (state, coords) => {
      state.geolocation.pos = {
        ...state.geolocation.pos,
        lat: coords.latitude.toFixed(4),
        lng: coords.longitude.toFixed(4)
      }
    }
  },
  actions: {

    showSubmenu ({ commit, state }, name) {
      let menu = state.homepage.navigation
        .filter(el => el.name === name)[0]
      commit('HANDLE_NAVIGATION_STATUS', menu)
      commit('TOGGLE_HOME_CONNECTORS', menu)
    },
    hideSubmenu ({ commit, state }) {
      commit('SET_NAVIGATION_TO_HOME')
    },

    requestApi ({ getters, state, commit }, req) {
      let config = req.config || {}

      switch (req.service) {
        case 'local':
          config = getters.getFullConfigForLocal(req.pos, req.service)
          return axios
            .create()
            .post(state.weatherApi.url[req.service], config)

        case 'other':
          config = getters.getFullConfigForOther(req.location, req.service)
          return axios
            .create()
            .post(state.weatherApi.url[req.service], config)

        case 'quote':
          return axios
            .create()
            .get('/api/quote')

        case 'tweet':
          return axios
            .create()
            .get('/api/quote')

        case 'wiki':
          return axios
            .create()
            .get(state.wikipediaApi.url, config)

        case 'twitch/users':
          return axios
            .create()
            .get('/api/twitch/users')

        case 'twitch/recommended':
          return axios
            .create()
            .get('/api/twitch/streams/recommended')

        case 'cv':
          return axios
            .create()
            .get('/files/cv')
      }
    },

    checkGeoSupport ({ state, commit }) {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          commit('NO_GEOLOCATION_SUPPORT')
          reject(state.geolocation.msg.error)
        } else {
          commit('CONFIRM_GEOLOCATION_SUPPORT')
          resolve()
        }
      })
    },

    getClientGeolocation ({ state, commit }) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((pos) => {
          commit('SET_USER_POSITION', pos.coords)
          commit('HANDLE_GEOLOCATION_SUCCESS')
          resolve(state.geolocation.pos)
        }, () => {
          commit('HANDLE_GEOLOCATION_ERROR')
          reject(state.pos.error.msg)
        })
      })
    }

  }
})
