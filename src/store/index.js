import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// import * as Cookies from 'js-cookie';
// import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
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
        baseURL: configApi.baseURL
      })
  },
  mutations: {
    CONFIRM_GEOLOCATION_SUPPORT: state => { state.geolocation.clientError = false },
    NO_GEOLOCATION_SUPPORT: state => { state.geolocation.clientError = true },
    HANDLE_GEOLOCATION_SUCCESS: state => { state.geolocation.pos.status.error = false },
    HANDLE_GEOLOCATION_ERROR: state => { state.geolocation.pos.status.error = true },
    SET_USER_POSITION: (state, coords) => {
      state.geolocation.pos = {
        ...state.geolocation.pos,
        lat: coords.latitude.toFixed(4),
        lng: coords.longitude.toFixed(4)
      }
    }
  },
  actions: {

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
