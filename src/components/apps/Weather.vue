<template>
  <div class="Weather container grid"
  :class="setBackground">
  <div class="Weather__title grid__row">
    <h1>WEATHER APP</h1>
    <h5 v-if="pos.error.status">{{ pos.error.msg }}</h5>
    <h5 v-if="error.status">{{ error.msg }}</h5>
  </div>
  <div class="Weather__container grid">
    <transition name="fade">
    <div v-if="weather.show">      
      <div class="Weather__icons">
        <icon-sun v-if="weather.icon.sun"></icon-sun>
        <icon-cloud v-if="weather.icon.cloud"></icon-cloud>
        <icon-rain v-if="weather.icon.rain"></icon-rain>
        <icon-storm v-if="weather.icon.storm"></icon-storm>
        <icon-sunrain v-if="weather.icon.sunrain"></icon-sunrain>
        <icon-snow v-if="weather.icon.snow"></icon-snow>
      </div>
      <div class="Weather__data">
        <span class="Weather__data--temp">{{ weather.currently.temperature }}&ordm;C</span>
        <h2 class="Weather__data--sum">{{ weather.currently.summary }}</h2>
        <span>Wind <strong>{{ weather.currently.windSpeed }}km/h</strong></span><br>
        <span>Precip. <strong>{{ weather.currently.precipProbability }}</strong></span><br>
        <span>Cloud cover <strong>{{ weather.currently.cloudCover }}</strong></span>
      </div>
    </div>     
    </transition>
  </div>
  <div class="Weather__footer grid__row">
    <button class="button__small" @click="fetchWeather()">see my weather</button>
  </div>  
</div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

import Sun from './icons/Sun'
import Cloud from './icons/Cloud'
import Rain from './icons/Rain'
import Storm from './icons/Storm'
import SunAndRain from './icons/SunAndRain'
import Snow from './icons/Snow'

export default {
  name: 'weather-app',
  components: {
    'icon-sun': Sun,
    'icon-cloud': Cloud,
    'icon-rain': Rain,
    'icon-storm': Storm,
    'icon-sunrain': SunAndRain,
    'icon-snow': Snow
  },
  data () {
    return {
      currentTime: {
        hours: new Date().getHours(),
        night: true
      },
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
      weather: {
        currently: {
          show: false,
          summary: 'SOME SUMMARY',
          icon: '',
          precipProbability: 0,
          temperature: 0,
          windSpeed: 0,
          cloudCover: 0
        },
        error: {
          status: false,
          msg: 'There was a problem retrieving the weather...'
        },
        success: {
          status: false,
          msg: 'Everything good!'
        },
        icon: {
          sun: false,
          cloud: false,
          rain: false,
          storm: false,
          sunrain: false,
          snow: true
        },
        show: false
      },
      buttonFired: 0
    }
  },
  computed: {
    ...mapState([ 'darksky' ]),
    setBackground () {
      return {
        'Weather__night': this.currentTime.hours < 6 || this.currentTime.hours > 19
      }
    }
  },
  methods: {
    fetchWeather () {
      this.getUserPosition()
      .then((data) => {
        console.log(data)
        return axios
        .create()
        .post('/api/weather', {
          baseURL: 'http://localhost:5000',           
          data: {
            coords: {
              lat: data.lat,
              long: data.long
            },
            units: 'si',
            exclude: 'minutely,hourly,daily,alerts,flags'
          }
        })
      })
      .then((res) => {
        this.weather = Object.assign({}, this.weather, res.data)
        this.weather.success.status = !this.weather.success.status
        this.showWeatherIcon(res.data.currently.icon)
        this.weather.show = true
      })
      .catch((error) => {
        console.log('Error on fetchWeather', error)
        this.weather.error.status = !this.weather.error.status
      })
    },
    getUserPosition () {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          this.error.status = !this.error.status
          reject(this.error.msg)
        } else {
          this.success.status = !this.success.status
          navigator.geolocation.getCurrentPosition((pos) => {
            this.$set(this.pos, 'lat', pos.coords.latitude.toFixed(4))
            this.$set(this.pos, 'long', pos.coords.longitude.toFixed(4))
            this.pos.status = !this.pos.status
            resolve({
              lat: pos.coords.latitude.toFixed(4),
              long: pos.coords.longitude.toFixed(4)
            })
          }, () => {
            this.pos.error.status = !this.pos.error.status
            reject(this.pos.error.msg)
          })
        }
      })
    },
    showWeatherIcon (icon) {
      switch (icon) {
        case 'clear-day':
        this.showIconAndHideOthers()
        .then(() => this.weather.icon.sun = !this.weather.icon.sun)
        break;
        case 'clear-night':
        case 'rain':
        this.showIconAndHideOthers()
        .then(() => this.weather.icon.rain = !this.weather.icon.rain)
        break;
        case 'snow':
        this.showIconAndHideOthers()
        .then(() => this.weather.icon.snow = !this.weather.icon.snow)
        break;
        case 'sleet':
        case 'wind':
        case 'fog':
        case 'cloudy':
        this.showIconAndHideOthers()
        .then(() => this.weather.icon.rain = !this.weather.icon.rain)
        break;
        case 'partly-cloudy-day':
        this.showIconAndHideOthers()
        .then(() => this.weather.icon.cloud = !this.weather.icon.cloud)
        break;
        case 'partly-cloudy-night':
        this.showIconAndHideOthers()
        .then(() => this.weather.icon.cloud = !this.weather.icon.cloud)
        break;
      }
    },
    showIconAndHideOthers () {
      let keys = Object.keys(this.weather.icon)
      keys.forEach((key) => this.weather.icon[key] = false)
      return Promise.resolve()
    }
  },
  created () {
  }
}
</script>

<style scoped>
.Weather {
  grid-template-columns: auto repeat(2, 15rem) auto;
  grid-template-rows: 4.5rem repeat(2,15rem);
  grid-gap: 1rem;
  justify-items: center;
  transition: all 1s ease;
  color: #204775;
  text-align: center;
}
.Weather__container {
  border-radius: 50%;
  background-color: #ebf4f690;
  grid-column: 2 / span 2;
  grid-row: 2 / span 2;
  padding: 2rem;
  justify-items: center;
  text-align: center;
}
.Weather__data { padding-top: 2rem }
.Weather__data--temp {
  font-size: 3rem;
  font-family: 'montserratbold', Arial, sans-serif;
}
.Weather__title {
  font-family: 'montserratmedium', Arial, sans-serif;
}
.Weather__night {
  background-color: #0B1A2C;
  color: #F2F2F2;
}
.Weather__night .Weather__container { background-color: #22657499 }
.Weather__night .button__small {
  background-color: #0B1A2C;
  border: 2px solid #F2F2F2;
  color: #F2F2F2;
}
.Weather__night .button__small:hover {
  background-color: #F2F2F2;
  border: 2px solid #F2F2F2;
  color: #0B1A2C;
}
.button__small:hover {
  background-color: #3B9ED7;
  border: 2px solid #FFF;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  color:  #FFF;
}
.Weather__footer {
  align-self: end;
}
</style>
