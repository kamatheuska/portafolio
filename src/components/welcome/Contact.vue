<template>
  <div class="Welcome__data" v-if="homepage.navigation[3].active">
    <h2>Nicolas A. Ramirez</h2>
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
      <a href="https://www.freecodecamp.org/porfolio/nikameush" target="_blank" title="FreeCodeCamp">
        <i class="fab fa-free-code-camp"></i>
      </a>
      <a href="https://github.com/kamatheuska" target="_blank" title="GitHub">
        <i class="fab fa-github-square"></i>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app-contact',
  data () {
    return {

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
  }
}
</script>

<style scoped>
.Welcome__data {
  grid-column: 1;
  grid-row: 2;
  margin-left: auto;
}
.Welcome__data--links {
  width: 70%;
  justify-content: flex-end;
  display: flex;
  font-size: 1.4rem;
  margin-top: 1rem;
  margin-left: auto;
}
.Welcome__data--links > * {
  flex: 1;
}
.Welcome__data h2 { font-family: 'Playfair Display', serif }
</style>
