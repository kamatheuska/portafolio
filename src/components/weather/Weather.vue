<template>
  <div class="Weather container grid"
       :class="setBackground">
    <div class="button__home">
      <router-link to="/"><h5><em>back to dash</em></h5></router-link>
    </div>
    <div class="Weather__title grid__row">
      <h1>WEATHERZILLA</h1>
      <h3>An app to check your Weather</h3>
      <h5 v-if="geolocation.pos.status.error">{{ geolocation.pos.status.msg }}</h5>
      <h5 v-if="weather.status.error">{{ weather.status.msg.error }}</h5>
      <h5>
        <a href="https://darksky.net/poweredby/" title="Go to darksky.net" target="_blank">
          <strong>Powered by Dark Sky</strong>
        </a>
      </h5>
    </div>
    <transition name="fade">
      <div class="Weather__icons" v-if="weather.show">
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
    </transition>
    <transition name="fade">
      <div class="Weather__data" v-if="weather.show">
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
        <div v-if="weather.show" class="Weather__data--other">
          <span>Wind <strong>{{ weather.currently.windSpeed | toFixedDecimal(1) }}km/h</strong></span><br>
          <span>Precip. <strong>{{ weather.currently.precipProbability }}</strong></span><br>
        </div>
      </div>
    </transition>
    <div class="Weather__controller">
      <button class="button__small" @click="fetchLocalWeather()">weather on my location</button><br>
      <button class="button__small" @click="fetchOthersWeather()">weather on other places</button>
      <input v-model="otherLocation"
             class="input__text--large"
             type="text"
             style="margin-bottom: 0.5rem; text-align: center"
             placeholder="New York"><br>
      <span><em>
        <strong><small>Try typing the name of a city</small></strong>
      </em></span>
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
      'requestApi'
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
        .then((pos) => this.requestApi({ pos, service: 'local' }))
        .then((res) => { this.weatherSuccessHandler(res) })
        .catch((error) => { this.errorHandler(error) })
    },

    fetchOthersWeather () {
      let location = this.otherLocation
      this.requestApi({ location, service: 'other' })
        .then((res) => { this.weatherSuccessHandler(res) })
        .catch((error) => { this.errorHandler(error) })
    },

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
  grid-template-columns: repeat(6, 1fr);;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 1rem;
  justify-items: center;
  transition: all 1s ease;
  color: #204775;
  text-align: center;
  font-size: 1.3rem;
}
.Weather__icons {
  grid-column: 2 / span 2;
  grid-row: 2 / span 2;
  padding: 2rem;
  justify-items: center;
  text-align: center;
  height: 38vh;
}
/*............POSIBLE BACKGROUNDS DEPENDING ON ICON............*/
.Weather__data       {
  padding-top: 2rem;
  grid-column: 4 / span 2;
  grid-row: 2 / span 2;
}
.Weather__data--sum  {
  font-size: 1.6em;
  margin: 0.7rem 0;
}
.Weather__title      { font-family: 'Oswald', sans-serif }
.Weather__data--temp { font-size: 2.2em }

.Weather__controller {
  width: 100%;
  grid-column: 4 / span 2;
  grid-row: 5 / -1;
}

/*............NIGHT............*/
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

/*............MEDIA QUERIES............*/
@media only screen
  and (min-device-width: 320px)
  and (orientation: portrait) {
  .Weather {
    padding: 0.4rem;
    grid-gap: 0.2rem;
    grid-template-columns: auto;
    grid-template-rows: repeat(4, auto);
  }
  .Weather__title { font-size: 0.7em }
  .Weather__icons {
    grid-column: 1 / -1;
    grid-row: 2 / span 1;
    padding: 0.2rem;
    height: 23vh;
  }
  .Weather__data {
    grid-column: 1 / -1;
    grid-row: 3 / span 1;
  }
  .Weather__controller {
    grid-column: 1 / -1;
    grid-row: 4 / span 1;
  }
}

@media only screen
  and (min-device-width: 320px)
  and (max-device-width: 812px)
  and (orientation: landscape) {
  .Weather {
    padding: 0.4rem;
    grid-gap: 0.2rem;
    grid-template-columns: auto auto;
    grid-template-rows: repeat(3, auto);
  }
  .Weather__title {
    font-size: 0.8em;
    grid-column: 1 / -1;
  }
  .Weather__icons {
    grid-column: 1 / span 1;
    grid-row: 2 / span 1;
    padding: 0;
    height: 23vh;
  }
  .Weather__data {
    grid-column: 2 / -1;
    grid-row: 2 / span 2;
    padding: 0;
  }
  .Weather__controller {
    grid-column: 1 / span 1;
    grid-row: 3 / span 1;
  }
}
</style>
