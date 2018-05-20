<template>
  <div class="Welcome__svg-home">
    <svg class="SvgHome__svg" xmlns="http://www.w3.org/2000/svg" height="660mm" width="750mm" version="1.1" viewBox="0 0 2657.4803 2338.5826">
      <svg-connectors></svg-connectors>
      <svg-alphabet></svg-alphabet>
      <svg-nav></svg-nav>
      <svg-logo></svg-logo>
    </svg>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Navigation from './Navigation'
import Alphabet from './Alphabet'
import Logo from './Logo'
import Connectors from './Connectors'

export default {
  name: 'main-home',
  data () {
    return {

    }
  },
  computed: {
    ...mapState([ 'homepage' ])
  },
  components: {
    'svg-alphabet': Alphabet,
    'svg-nav': Navigation,
    'svg-logo': Logo,
    'svg-connectors': Connectors
  }
}
</script>

<style scoped>
.SvgHome__svg {
  height: 80vh;
  width: 100vh;
}
.Welcome__svg-home {
  grid-column: 2;
  grid-row: 2;
}
</style>
