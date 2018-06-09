<template>
  <div class="WelcomeMobile grid">

    <svg-mobile></svg-mobile>

    <transition name=fade>
      <app-contact></app-contact>
    </transition>

    <transition name=fade>
      <app-bio></app-bio>
    </transition>

    <transition name=fade>
      <div class="WelcomeMobile__music" v-if="homepage.navigation[2].active">
        <button class="button__tiny--welcome" @click="hideSubmenu()">back</button>
        <div class="WelcomeMobile__music--text" v-if="homepage.navigation[2].active">
          <p>...artistics manifestations developing at the moment...</p>
        </div>
        <div class="WelcomeMobile__music--img" v-if="homepage.navigation[2].active">
          <img src="/static/img/partitura--small.jpg" alt="">
        </div>
      </div>
    </transition>

    <transition name=fade>
      <div v-if="!homepage.navigation[0].active" class="WelcomeMobile__name">
        <div class="WelcomeMobile__name--span">
          <span><strong>Nicolas Ramirez</strong></span>
        </div>
        <div class="WelcomeMobile__name--span">
          <span>Barcelona 2018</span>
        </div>
        <div class="WelcomeMobile__name--span">
          <span>Download CV <a href="/static/files/cv2018.pdf" target="_blank"><strong>HERE</strong></a></span>
        </div>
      </div>
    </transition>

  </div>
 </template>

<script>
import { mapState, mapActions } from 'vuex'

import SvgMobile from './welcome/SvgMobile'
import Contact from './welcome/Contact'
import Bio from './welcome/Bio'

export default {
  name: 'app-WelcomeMobile',
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
      'requestApi',
      'hideSubmenu'
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
    'svg-mobile': SvgMobile,
    'app-contact': Contact,
    'app-bio': Bio
  }
}
</script>

<style scoped>

.button__tiny--welcome {
  color: inherit;
  font-size: 1rem;
  font-family: 'Oswald', sans-serif;
}
.WelcomeMobile {
  text-align: right;
  font-family: 'montserratmedium', Arial, sans-serif;
  grid-template-columns: auto;
  grid-template-rows:  2rem auto 2rem;
  align-items: center;
  justify-items: center;
  font-size: 1rem;
  font-weight: 400;
  color:#31966a;
  grid-gap: 0;
}
.WelcomeMobile__music {
  font-size: 1.3rem;
  color: #236E4D;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.WelcomeMobile__music--text {
  padding-top: 1rem;
  text-align: center;
  grid-row: 1;
  align-items: center;
}
.WelcomeMobile__music--img img { max-width: 100% }
.WelcomeMobile__music--img {
  width: 100%;
  position: relative;
  grid-row: 3;
  align-items: center;
}
.WelcomeMobile__name a {
  cursor: pointer;
  display: inline-block;
}
.WelcomeMobile__name--span {
  width: 30%;
}
.WelcomeMobile__name {
  grid-row: 1;
  width: 100%;
  text-align: center;
  font-size: 10px;
  display: flex;
  justify-content: center;
}

</style>
