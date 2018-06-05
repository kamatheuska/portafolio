<template>
  <div class="Bio box__big"
        v-if="homepage.navigation[0].active ">
    <div class="Bio__button">
      <button class="button--primary button__tiny"
        @click="changeLanguage('eng')">ENG</button>
      <button class="button--primary button__tiny"
        @click="changeLanguage('spa')">SPA</button>
    </div>
    <br>
    <div class="Bio__eng" v-if="language[0].active">
      <h1>Biografy</h1>
      <p>My name is Nicolas, I am from Cartagena, Colombia. I have strong background in music composition, which I studied thoroughly in the UdK Berlin. This sparkled in me the wondwe about algorithms and the relation between maths and music, and not much later I encounter the world of programming and computer science, which in a sense has tons of resemblences to the music endeavour.</p>
      <p>I am passionate about traveling, and I am reaaly into literature, music and films. I love sincere, brutally honest and creative art that speaks to the heart in no matter which beatiful, tragic or disgusting way. I have been around the world a bit, but have still a lot places to go. Countries I’ve visited: Belgium, Colombia, France, Germany, Italy, Luxembourg, Poland, Spain, Venezuela.</p>
      <p>I think eLearning and other similar plataforms is one of the best ways to meet people from outside your circle, outside what we think is common place, and to improve your knowledge of the world that in any other way would take an inemense amount of time and resources. </p>
      <p>My personal experience tells me that this is the best way to grow as a person, for your mind to open new unbelievable frontiers within itself. I am a composer, programmer and writer, so for me stories and conversation are the fuel of my work.</p>
    </div>
    <div class="Bio__spa" v-if="language[1].active">
      <h1>Biografía</h1>
      <p>Mi nombre es Nicolás, Soy de Cartagena, Colombia. Tengo un....</p>
      <h4>EN CONSTRUCCION...</h4>  
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app-bio',
  data () {
    return {
      language: [
        { name: 'eng', active: true },
        { name: 'spa', active: false },
      ] 
    }
  },
  computed: {
    ...mapState([ 'homepage' ])
  },
  methods: {

    changeLanguage (name) {
      this.language.map(obj => {
        if (obj.name !== name) {
          obj.active = false
        } else {
          obj.active = true
        }
      })
    }
  }
}
</script>

<style scoped>
.Bio {
  grid-column: 3;
  grid-row: 1 / span 3;
  margin-right: auto;
  text-align: left;
  background-color: #FFF;
  padding: 2rem;
  height: 80%;
  overflow: auto;
}
.Bio__button .button__tiny {
  color: #fff;
  font-size: 0.9em;
  border-radius: 4px;
}
@media only screen
  and (max-device-width: 520px)
  and (orientation: portrait) {
  }

@media only screen
  and (min-device-width: 540px)
  and (max-device-width: 820px)
  and (orientation: landscape) {
  }
</style>
