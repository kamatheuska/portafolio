<template>
  <div class="Welcome__svg-home grid">
    <svg xmlns="http://www.w3.org/2000/svg" class="Letters" height="19.19mm" width="1292mm" version="1.1" viewBox="0 0 4576.7659 68.010554">
      <svg-letters></svg-letters>
    </svg>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Letters from './Letters'

export default {
  name: 'SvgTest',
  data () {
    return {

    }
  },
  computed: {
    ...mapState([ 'homepage' ])
  },
  components: {
    'svg-letters': Letters
  }
}
</script>

<style scoped>
.SvgHome__svg {
  height: 100%;
  width: 100%;
}
.Welcome__svg-home {
  height: 100%;
  width: 100%;
  padding: 2rem;
}
@media only screen
  and (max-device-width: 520px)
  and (orientation: portrait) {
    .SvgHome__svg {
      height: 100vh;
      width: 100vh;
    }
  }

@media only screen
  and (min-device-width: 540px)
  and (max-device-width: 820px)
  and (orientation: landscape) {
    .SvgHome__svg {
      height: 100vh;
      width: 100vh;
    }
  }
</style>
