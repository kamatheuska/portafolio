<template>
  <div class="Welcome grid">
    <svg-home></svg-home>
    <transition name=fade>
      <div class="Welcome__data" v-if="homepage.navigation[3].active">
        <h2>Nicolas Ramirez</h2>
        <p>{{ email }}</p>
        <p>+34 620 543 185</p>
        <p>Barcelona, Spain</p>
        <div class="Welcome__data--links">
          <a href="https://twitter.com/nikameush" target="_blank" title="Twitter">
            <i class="fab fa-twitter-square"></i>
          </a>
          <span @click="doCopy()" title="Copy Email">
            <i class="fas fa-envelope-square"></i>
          </span>
          <a href="https://www.linkedin.com/in/nikameush" target="_blank" title="LinkedIn">
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
        <div class="Welcome__data--links">
          <a href="https://soundcloud.com/nikameush" target="_blank" title="SoundCloud">
            <i class="fab fa-soundcloud"></i>
          </a>
          <a href="https://www.freecodecamp.org/kamatheuska" target="_blank" title="FreeCodeCamp">
            <i class="fab fa-free-code-camp"></i>
          </a>
          <a href="https://github.com/kamatheuska" target="_blank" title="GitHub">
            <i class="fab fa-github-square"></i>
          </a>
        </div>
      </div>
    </transition>
    <transition name=fade>
      <div class="Welcome__bio" v-if="homepage.navigation[0].active">
        <p>...bio happening live...</p>
      </div>
    </transition>
    <transition name=fade>
      <div class="Welcome__music--text" v-if="homepage.navigation[2].active">
        <p>...artistics manifestations developing at the moment...</p>
      </div>
    </transition>
    <transition name=fade>
      <div class="Welcome__music--img" v-if="homepage.navigation[2].active">
        <img src="/static/partitura.png" alt="">
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
      email: 'nicolas.ramirez.ka@gmail.com'
    }
  },
  computed: {
    ...mapState([ 'homepage' ])
  },
  methods: {
    doCopy () {
      this.$copyText(this.email).then(function (e) {
        alert('Email copied')
        console.log(e)
      }, function (e) {
        alert('Can not copy')
        console.log(e)
      })
    }
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
  grid-template-rows:  1fr auto 1fr;
  align-items: center;
  justify-items: center;
  font-size: 1rem;
  font-weight: 400;
  color: #138654;
}
.Welcome__music--text {
  grid-column: 2;
  grid-row: 1;
  align-items: center;
}
.Welcome__music--img img { max-width: 100% }
.Welcome__music--img {
  width: 90%;
  top: -9vh;
  position: relative;
  grid-column: 1 / span 3;
  grid-row: 3;
  align-items: center;
}
.Welcome__bio {
  grid-column: 3;
  grid-row: 2;
  margin-right: auto;
}
.Welcome__data {
  grid-column: 1;
  grid-row: 2;
  margin-left: auto;
}
.Welcome__data--links {
  width: 70%;
  justify-content: flex-end;
  display: flex;
  font-size: 2rem;
  margin-top: 1rem;
  margin-left: auto;
}
.Welcome__data--links > * {
  flex: 1;
}
.Welcome__data h2 { font-family: 'Playfair Display', serif }
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
