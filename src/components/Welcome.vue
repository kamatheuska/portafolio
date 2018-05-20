<template>
  <div class="Welcome grid">
    <svg-home></svg-home>
    <transition name=fade>
      <div class="Welcome__data" v-if="homepage.navigation[3].active">
        <h2>Nicolas Ramirez</h2>
        <h3>nicolas.ramirez.ka@gmail.com</h3>
        <h3>+34 620 543 185</h3>
        <h3>Barcelona, Spain</h3>
      </div>
    </transition>
    <transition name=fade>
      <div class="Welcome__data" v-if="homepage.navigation[0].active">
        <h2>...bio happening live...</h2>
      </div>
    </transition>
    <transition name=fade>
      <div class="Welcome__data" v-if="homepage.navigation[2].active">
        <h2>...artistics manifestations developing at the moment...</h2>
      </div>
    </transition>
  </div>

 </template>

<script>
import { mapState } from 'vuex'

import SvgHome from './welcome/SvgHome'

export default {
  name: 'app-welcome',
  data () {
    return {

    }
  },
  computed: {
    ...mapState([ 'homepage' ])
  },
  components: {
    'svg-home': SvgHome
  }
}
</script>

<style scoped>
.Welcome {
  text-align: right;
  grid-template-columns: 1fr 90vh 1fr;
  grid-template-rows:  1rem auto 1rem;
  align-items: center;
  justify-items: center;
  font-size: 1rem;
  color: #138654;
}
.Welcome__data {
  grid-column: 1;
  grid-row: 2;
  font-family: monospace;
  font-weight: 100;
}
@media only screen
  and (max-device-width: 520px)
  and (orientation: portrait) {
    .Welcome {
    }
  }

@media only screen
  and (min-device-width: 540px)
  and (max-device-width: 820px)
  and (orientation: landscape) {
    .Welcome {
    }
  }
</style>
