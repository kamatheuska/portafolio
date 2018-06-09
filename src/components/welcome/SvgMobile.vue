<template>
  <div class="Welcome__svg-mobile">
    <svg class="SvgMobile__svg"
         xmlns="http://www.w3.org/2000/svg"
         height="1e3"
         width="562.5"
         version="1.1"
         viewBox="0 0 527.3 937.5">
      <svg-connectors-mob></svg-connectors-mob>
      <svg-nav-mob></svg-nav-mob>
      <svg-letters-mob></svg-letters-mob>
      <svg-logo-mob></svg-logo-mob>
    </svg>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import NavigationMob from './mobile/NavigationMob'
import LettersMob from './mobile/LettersMob'
import LogoMob from './mobile/LogoMob'
import ConnectorsMob from './mobile/ConnectorsMob'

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
    'svg-letters-mob': LettersMob,
    'svg-nav-mob': NavigationMob,
    'svg-logo-mob': LogoMob,
    'svg-connectors-mob': ConnectorsMob
  }
}
</script>

<style scoped>
.SvgMobile__svg {
  height: 85vh;
  max-width: 100%;
  transition: all 2s ease;
}
.Welcome__svg-mobile {
  grid-row: 2;
}
@media only screen
  and (min-device-width: 300px)
  and (max-device-width: 900px)
  and (orientation: landscape) {
    .SvgMobile__svg {
      height: 140vh;
    }
  }
</style>
