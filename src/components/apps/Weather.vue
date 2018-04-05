<template>
  <div class="Weather container grid"
       :class="setBackground">
    <div class="Weather__title grid__row">
      <h1>WEATHER</h1>
      <h4>APP</h4>
      <h5 v-if="geolocation.pos.status.error">{{ geolocation.pos.status.msg }}</h5>
      <h5 v-if="weather.status.error">{{ weather.status.msg.error }}</h5>
    </div>
    <div class="Weather__container grid">
      <transition name="fade">
        <div v-if="weather.show">
          <div class="Weather__icons" id="test3">
            <icon-sun v-if="weather.icon['clear-day']"></icon-sun>
            <icon-moon v-if="weather.icon['clear-night']"></icon-moon>
            <icon-cloud v-if="weather.icon['cloudy']"></icon-cloud>
            <icon-sunrain v-if="weather.icon['partly-cloudy-day']"></icon-sunrain>
            <icon-moonrain v-if="weather.icon['partly-cloudy-night']"></icon-moonrain>
            <icon-rain v-if="weather.icon['rain']"></icon-rain>
            <icon-snow v-if="weather.icon['snow']"></icon-snow>
            <icon-wind v-if="weather.icon['wind']"></icon-wind>
            <icon-storm v-if="weather.icon['thunder']"></icon-storm>
          </div>
          <div class="Weather__data">
            <div>
              <span class="Weather__data--temp h--bold">
                {{ weather.currently.temperature | toFixedDecimal(0) }}<span>{{ weather.unitTemp.current }}
              </span></span>
            </div>
            <div>
              <span class="button__tiny"
                  @click="changeUnits()">Change to {{ weather.unitTemp.other }}</span>
            </div>
            <div class="Weather__data--sum">
              <span>{{ weather.currently.summary }}</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div v-if="weather.show">
        <span>Wind <strong>{{ weather.currently.windSpeed | toFixedDecimal(1) }}km/h</strong></span><br>
        <span>Precip. <strong>{{ weather.currently.precipProbability }}</strong></span><br>
      </div>
    </transition>
    <div class="Weather__controler">
      <button class="button__small" @click="fetchLocalWeather()">My Location</button><br>
      <button class="button__small" @click="fetchOthersWeather()">Other Places</button>
      <input v-model="otherLocation"
             class="input__text--large"
             type="text"
             placeholder="New York"><br>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
        hours: new Date().getHours()
      },
      otherLocation: 'Bangkok',
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
        status: {
          error: false,
          msg: {
            success: 'Everything good!',
            error: 'There was a problem retrieving the weather...'
          }
        },
        icon: {
          'clear-day': false,
          'clear-night': false,
          'cloudy': false,
          'fog': false,
          'partly-cloudy-day': false,
          'partly-cloudy-night': false,
          'rain': false,
          'sleet': false,
          'snow': false,
          'wind': false,
          'thunder': false
        },
        unitTemp: {
          current: 'ºC',
          other: 'ºF'
        },
        show: false
      }
    }
  },
  computed: {

    ...mapState([ 'geolocation' ]),

    setBackground () {
      return {
        'Weather__night': this.currentTime.hours < 6 || this.currentTime.hours > 19
      }
    }
  },
  methods: {

    ...mapActions([
      'checkGeoSupport',
      'getClientGeolocation',
      'sendDataToServer'
    ]),

    changeUnits () {
      let temperature = this.weather.currently.temperature
      let unitTemp = this.weather.unitTemp
      if (unitTemp.current === 'ºC') {
        unitTemp.current = 'ºF'
        unitTemp.other = 'ºC'
        this.weather.currently.temperature =
          (temperature * 9 / 5) + 32
      } else if (unitTemp.current === 'ºF') {
        unitTemp.current = 'ºC'
        unitTemp.other = 'ºF'
        this.weather.currently.temperature =
          (temperature - 32) * 5 / 9
      }
    },

    fetchLocalWeather () {
      this.checkGeoSupport()
        .then(() => this.getClientGeolocation())
        .then((pos) => this.sendDataToServer({ pos, service: 'local' }))
        .then((res) => { this.weatherSuccessHandler(res) })
        .catch((error) => { this.errorHandler(error) })
    },

    fetchOthersWeather () {
      let location = this.otherLocation
      this.sendDataToServer({ location, service: 'other' })
        .then((res) => { this.weatherSuccessHandler(res) })
        .catch((error) => { this.errorHandler(error) })
    },

    // fetchOthersWeather () {
    //   let apiUrl = 'api/weather/other'
    //   let config = {
    //     baseURL: 'http://localhost:5000/',
    //     data: {
    //       address: this.otherLocation,
    //       units: 'si',
    //       exclude: 'minutely,hourly,daily,alerts,flags'
    //     }
    //   }
    //   this.sendDataToServer(apiUrl, config)
    //     .then((res) => {
    //       console.log(res)
    //       this.weatherSuccessHandler(res)
    //     })
    //     .catch((error) => {
    //       this.errorHandler(error)
    //     })
    // },

    showWeatherIcon (responseIcon) {
      let iconNames = Object.keys(this.weather.icon)

      iconNames.forEach((iconName, i) => {
        if (iconName === responseIcon) {
          console.log(iconName, i)
          this.showIconAndHideOthers().then(() => {
            this.weather.icon[iconName] = !this.weather.icon[iconName]
          })
        }
      })
    },

    showIconAndHideOthers () {
      let keys = Object.keys(this.weather.icon)
      keys.forEach((key) => { this.weather.icon[key] = false })
      return Promise.resolve()
    },

    weatherSuccessHandler (res) {
      console.log('SUCCESS************')
      this.weather = Object.assign({}, this.weather, res.data)
      this.weather.status.error = false
      this.showWeatherIcon(res.data.currently.icon)
      this.weather.show = true
    },

    errorHandler (error) {
      console.log('Error on fetchLocalWeather', error)
      this.weather.status.error = false
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
  grid-template-columns: 1fr repeat(2,2fr) repeat(3, 1fr);
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
/*............POSIBLE BACKGROUNDS DEPENDING ON ICON............*/
.Weather__container--sun       { background-color: #E0FAFF }
.Weather__container--storm     { background-color: #EFDFFF }

.Weather__container--rain,
.Weather__container--snow,
.Weather__container--wind      { background-color: #CCFFFA }

.Weather__container--moon,
.Weather__container--moonrain  { background-color: #B9F6FF }

.Weather__container--cloud,
.Weather__container--sunrain   { background-color: #D0F3FF }

.Weather__data--sum  {
  font-size: 2rem;
  margin: 0.7rem 0;
}

.Weather__title      { font-family: 'montserratmedium', Arial, sans-serif }
.Weather__data       { padding-top: 2rem }
.Weather__data--temp { font-size: 2.5rem }

.Weather__controler {
  width: 100%;
  grid-row: 3;
  grid-column: 4 / -1;
}

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
