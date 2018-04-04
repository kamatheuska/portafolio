<template>
  <div class="Weather container grid"
       :class="setBackground">
    <div class="Weather__title grid__row">
      <h1>WEATHER APP</h1>
      <h5 v-if="pos.error.status">{{ pos.error.msg }}</h5>
      <h5 v-if="error.status">{{ error.msg }}</h5>
    </div>
    <div class="Weather__container grid"
         :class="weatherContainerColor" id="test1">
      <transition name="fade">
      <div v-if="weather.show" id="test2">
        <div class="Weather__icons" id="test3">
          <icon-sun v-if="weather.icon.sun"></icon-sun>
          <icon-cloud v-if="weather.icon.cloud"></icon-cloud>
          <icon-rain v-if="weather.icon.rain"></icon-rain>
          <icon-storm v-if="weather.icon.storm"></icon-storm>
          <icon-sunrain v-if="weather.icon.sunrain"></icon-sunrain>
          <icon-snow v-if="weather.icon.snow"></icon-snow>
          <icon-moon v-if="weather.icon.moon"></icon-moon>
          <icon-moonrain v-if="weather.icon.moonrain"></icon-moonrain>
          <icon-wind v-if="weather.icon.wind"></icon-wind>
        </div>
        <div class="Weather__data">
          <div>
            <span class="Weather__data--temp h--bold">
              {{ weather.currently.temperature | toFixedDecimal(0) }}<span>{{weather.unitTemp.current}}
            </span>
              <span class="button__tiny"
                  @click="changeUnits()">{{weather.unitTemp.other}}</span></span><br>
          </div>
          <div class="Weather__data--sum">
            <span>{{ weather.currently.summary }}</span>
          </div>
          <div>
            <span>Wind <strong>{{ weather.currently.windSpeed | toFixedDecimal(1) }}km/h</strong></span><br>
            <span>Precip. <strong>{{ weather.currently.precipProbability }}</strong></span><br>
          </div>
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
import Moon from './icons/Moon'
import Cloud from './icons/Cloud'
import Rain from './icons/Rain'
import Storm from './icons/Storm'
import Snow from './icons/Snow'
import Wind from './icons/Wind'
import SunAndRain from './icons/SunAndRain'
import MoonAndRain from './icons/MoonAndRain'

export default {
  name: 'weather-app',
  components: {
    'icon-sun': Sun,
    'icon-moon': Moon,
    'icon-cloud': Cloud,
    'icon-wind': Wind,
    'icon-snow': Snow,
    'icon-rain': Rain,
    'icon-storm': Storm,
    'icon-sunrain': SunAndRain,
    'icon-moonrain': MoonAndRain
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
          moon: false,
          cloud: false,
          rain: false,
          storm: false,
          sunrain: false,
          snow: false,
          wind: false,
          moonrain: false
        },
        unitTemp: {
          current: 'ºC',
          other: 'ºF'
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
    },
    weatherContainerColor () {
      return {
        'Weather__container--sun': this.weather.icon.sun,
        'Weather__container--moon': this.weather.icon.moon,
        'Weather__container--cloud': this.weather.icon.cloud,
        'Weather__container--rain': this.weather.icon.rain,
        'Weather__container--storm': this.weather.icon.storm,
        'Weather__container--sunrain': this.weather.icon.sunrain,
        'Weather__container--snow': this.weather.icon.snow,
        'Weather__container--wind': this.weather.icon.wind,
        'Weather__container--moonrain': this.weather.icon.moonrain
      }
    }
  },
  methods: {
    changeUnits () {
      if (this.weather.unitTemp.current === 'ºC') {
        this.weather.unitTemp.current = 'ºF'
        this.weather.unitTemp.other = 'ºC'
      } else if (this.weather.unitTemp.current === 'ºF') {
        this.weather.unitTemp.current = 'ºC'
        this.weather.unitTemp.other = 'ºF'
      }
    },
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
        case 'sleet':
        case 'clear-day':
          this.showIconAndHideOthers()
            .then(() => this.weather.icon.sun = !this.weather.icon.sun)
          break
        case 'clear-night':
          this.showIconAndHideOthers()
            .then(() => this.weather.icon.moon = !this.weather.icon.moon)
          break
        case 'rain':
          this.showIconAndHideOthers()
            .then(() => this.weather.icon.rain = !this.weather.icon.rain)
          break
        case 'snow':
          this.showIconAndHideOthers()
            .then(() => this.weather.icon.snow = !this.weather.icon.snow)
          break
        case 'wind':
          this.showIconAndHideOthers()
            .then(() => this.weather.icon.wind = !this.weather.icon.wind)
          break
        case 'fog':
        case 'cloudy':
          this.showIconAndHideOthers()
            .then(() => this.weather.icon.rain = !this.weather.icon.rain)
          break
        case 'partly-cloudy-day':
          this.showIconAndHideOthers()
            .then(() => this.weather.icon.sunrain = !this.weather.icon.sunrain)
          break
        case 'partly-cloudy-night':
          this.showIconAndHideOthers()
            .then(() => this.weather.icon.moonrain = !this.weather.icon.moonrain)
          break
      }
    },
    showIconAndHideOthers () {
      let keys = Object.keys(this.weather.icon)
      keys.forEach((key) => this.weather.icon[key] = false)
      return Promise.resolve()
    }
  },
  filters: {
    toFixedDecimal (num, dec) {
      return num.toFixed(dec)
    }
  }
}
</script>

<style scoped>
.Weather {
  grid-template-columns: 1fr repeat(2,2fr) 1fr;
  grid-template-rows: 1fr repeat(2,2fr) 1fr;
  grid-gap: 1rem;
  justify-items: center;
  transition: all 1s ease;
  color: #204775;
  text-align: center;
}
.Weather__container {
  border-radius: 50%;
  grid-column: 2 / span 2;
  grid-row: 2 / span 2;
  padding: 2rem;
  justify-items: center;
  text-align: center;
  height: 60vh;
  width: 60vh;
}
.Weather__data--sum  {
  font-size: 2rem;
  margin: 0.7rem 0;
}
.Weather__title { font-family: 'montserratmedium', Arial, sans-serif }
.Weather__data  { padding-top: 2rem }
.Weather__data--temp { font-size: 2.5rem }
.Weather__footer     { align-self: end }

.Weather__container--sun       { background-color: #E0FAFF }
.Weather__container--storm     { background-color: #EFDFFF }

.Weather__container--cloud,
.Weather__container--sunrain   { background-color: #D0F3FF }

.Weather__container--rain,
.Weather__container--snow,
.Weather__container--wind      { background-color: #CCFFFA }

.Weather__container--moon,
.Weather__container--moonrain  { background-color: #B9F6FF }

/*............NIGHT............*/
.Weather__night .Weather__container { background-color: #22657499 }
.Weather__night {
  background-color: #0B1A2C;
  color: #F2F2F2;
}
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
.button__tiny {
  cursor: pointer;
  align-self: center;
  margin-left: 0.5rem;
  border: none;
  font-size: 1.1rem;
  padding: 0;
  color: #3B9ED7;
  width: 5rem;
  min-height: 2.2rem;
  border-radius: 50%;
  transition: all 1s ease;
}
</style>
