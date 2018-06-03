<template>
  <div class="Bio box__big" v-if="homepage.navigation[0].active">
    <h1>Biografy</h1>
    <p>My name is Nicolas, I am from Cartagena, Colombia and I love to meet new people from all over the world!</p>
    <p>To travel to absorb literature, music and films. I love sincere, brutally honest and creative art that speaks to the heart in no matter which beatiful, tragic or disgusting way. I have been around the world a bit, but have still a lot places to go. Countries I’ve visited: Belgium, Colombia, France, Germany, Italy, Luxembourg, Poland, Spain, Venezuela.</p>
    <p>I think eLearning and other similar plataforms is one of the best ways to meet people from outside your circle, outside what we think is common place, and to improve your knowledge of the world that in any other way would take an inemense amount of time and resources. </p>
    <p>My personal experience tells me that this is the best way to grow as a person, for your mind to open new unbelievable frontiers within itself. I am a composer, programmer and writer, so for me stories and conversation are the fuel of my work.</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app-bio',
  data () {
    return {

    }
  },
  computed: {
    ...mapState([ 'homepage' ])
  }
}
</script>

<style scoped>
.Bio {
  grid-column: 3;
  grid-row: 2;
  margin-right: auto;
  text-align: left;
  background-color: #FFF;
  padding: 2rem;
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
