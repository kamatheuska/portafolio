import Vue from 'vue'
import Vuex from 'vuex'

// import * as Cookies from 'js-cookie';
// import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    geolocation: {
      pos: {
        error: {
          status: false,
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
    }
  },
  getters: {

  },
  mutations: {
    CONFIRM_GEOLOCATION_SUPPORT: state => { state.geolocation.clientError = false },
    NO_GEOLOCATION_SUPPORT: state => { state.geolocation.clientError = true },
    HANDLE_GEOLOCATION_SUCCESS: state => { state.geolocation.pos.error.status = false },
    HANDLE_GEOLOCATION_ERROR: state => { state.geolocation.pos.error.status = true },
    SET_USER_POSITION: (state, coords) => {
      state.geolocation.pos = {
        ...state.geolocation.pos,
        lat: coords.latitude.toFixed(4),
        lng: coords.longitude.toFixed(4)
      }
    }
  },
  actions: {

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
