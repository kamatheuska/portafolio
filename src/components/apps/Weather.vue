<template>
  <div class="Weather container grid">
    <div class="Weather__title grid__row">
      <h1>WEATHER APP</h1>
      <h2 v-if="pos.error.status">{{ pos.error.msg }}</h2>
      <h2 v-if="error.status">{{ error.msg }}</h2>
      <h2 v-if="success.status">{{ success.msg }}</h2>
    </div>
    <div>
      <h3 v-if="success.status" @click="getUserPosition()">LOCATION {{ pos.lat }} {{ pos.long }} </h3>
      <button @click="getUserPosition()">see my weather</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'weather-app',
  data () {
    return {
      pos: {
        error: {
          status: false,
          msg: 'Unable to retrieve your location'
        },
        lat: '',
        long: ''
      },
      error: {
        status: false,
        msg: 'Geolocation is not supported by your browser'
      },
      success: {
        status: false,
        msg: 'No problem with your browser'
      },
      response: {},
      buttonFired: 0
    }
  },
  computed: {
    ...mapState([ 'darksky' ])
  },
  methods: {
    fetchWeather () {
      axios.get('/api/weather')
        .then((response) => {
          Object.assign({}, this.response, response)
        })
        .catch((error) => {
          console.log('Error on fetchWeather', error)        
        })
    },
    getUserPosition () {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          this.error.status = !this.error.status
          reject()
        } else {
          this.success.status = !this.success.status
          navigator.geolocation.getCurrentPosition((pos) => {
            this.$set(this.pos, 'lat', pos.coords.latitude.toFixed(4))
            this.$set(this.pos, 'long', pos.coords.longitude.toFixed(4))
            this.pos.status = !this.pos.status
            resolve()
          }, () => {
            this.pos.error.status = !this.pos.error.status
            reject()
          })
        }
      })
    }
  },
  created () {
    this.getUserPosition().then(() => {
      console.log('logging...')
      this.fetchWeather()
    })

  }
}
</script>

<style>

</style>
