<template>
  <div class="Welcome grid">
    <svg-home></svg-home>
    <transition name=fade>
      <app-contact></app-contact>
    </transition>
    <transition name=fade>
      <app-bio></app-bio>
    </transition>
    <transition name=fade>
      <div class="Welcome__music--text" v-if="homepage.navigation[2].active">
        <p>...artistics manifestations developing at the moment...</p>
      </div>
    </transition>
    <transition name=fade>
      <div class="Welcome__music--img" v-if="homepage.navigation[2].active">
        <img src="/static/img/partitura.jpg" alt="">
      </div>
    </transition>
    <div v-if="!homepage.navigation[2].active" class="Welcome__name">
      <p><strong>Nicolas Ramirez |</strong> Barcelona 2018 | Download CV <a href="/static/cv2018.pdf" target="_blank"><strong>HERE</strong></a>
      </p>
    </div>
  </div>
 </template>

<script>
import { mapState, mapActions } from 'vuex'

import SvgHome from './welcome/SvgHome'
import Contact from './welcome/Contact'
import Bio from './welcome/Bio'

export default {
  name: 'app-welcome',
  data () {
    return {
      email: 'nicolas.ramirez.ka@gmail.com'
    }
  },
  computed: {
    ...mapState([ 'homepage' ])
  },
  methods: {
    ...mapActions([
      'requestApi'
    ]),
    getFile () {
      console.log('test')
      this.requestApi({ service: 'cv' })
        .then((res) => {
          console.log(res)
        })
    }
  },
  components: {
    'svg-home': SvgHome,
    'app-contact': Contact,
    'app-bio': Bio
  }
}
</script>

<style scoped>
.Welcome {
  text-align: right;
  font-family: 'montserratmedium', Arial, sans-serif;
  grid-template-columns: 1fr 90vh 1fr;
  grid-template-rows:  1fr auto 1fr;
  align-items: center;
  justify-items: center;
  font-size: 1rem;
  font-weight: 400;
  color: #11804F;
  grid-gap: 0;
}
.Welcome__music--text {
  grid-column: 2;
  grid-row: 1;
  align-items: center;
}
.Welcome__music--img img { max-width: 100% }
.Welcome__music--img {
  width: 90%;
  top: -15vh;
  position: relative;
  grid-column: 1 / span 3;
  grid-row: 3;
  align-items: center;
}
.Welcome__name a {
  cursor: pointer;
  display: inline-block;
}
.Welcome__name {
  grid-column: 1 / span 3;
  grid-row: 3;
  width: 100%;
  text-align: center;
}
@media only screen
  and (max-device-width: 520px)
  and (orientation: portrait) {
    .Welcome {
      display: block
    }
  }

@media only screen
  and (min-device-width: 540px)
  and (max-device-width: 820px)
  and (orientation: landscape) {
    .Welcome {
      display: block
    }
  }
</style>
