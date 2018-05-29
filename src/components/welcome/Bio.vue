<template>
  <div class="Bio" v-if="homepage.navigation[0].active")
    <h1>Biografia</h1>
  </div>
</template>

<script>

export default {
  name: 'app-bio',
  data () {
    return {

    }
  }
}
</script>

<style scoped>
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
