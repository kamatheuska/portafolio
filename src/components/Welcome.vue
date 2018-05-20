<template>
  <div class="Welcome grid">
    <svg-home></svg-home>
  </div>

 </template>

<script>
import SvgHome from './welcome/SvgHome'

export default {
  data () {
    return {

    }
  },
  components: {
    'svg-home': SvgHome
  }
}
</script>

<style scoped>
.Welcome {
  text-align: center;
  grid-template-columns: 3rem auto 3rem;
  grid-template-rows:  3rem auto 3rem;
  align-items: center;
  justify-items: center;
}
@media only screen
  and (max-device-width: 520px)
  and (orientation: portrait) {
    .Welcome {
      grid-template-columns: auto;
      grid-template-rows: repeat(4, auto);
      grid-gap: 0;
    }
  }

@media only screen
  and (min-device-width: 540px)
  and (max-device-width: 820px)
  and (orientation: landscape) {
    .Welcome {
      grid-template-columns: repeat(3, auto);
      grid-template-rows: repeat(3, auto);
      grid-gap: 0;
    }
  }
</style>
