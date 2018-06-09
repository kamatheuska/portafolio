<template>
  <div class="Contact" v-if="homepage.navigation[3].active">
    <button class="button__tiny--welcome" @click="hideSubmenu()">back</button>
    <div class="Contact__container">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <p>{{ user.phone }}</p>
      <p>{{ user.city }}</p>
      <div class="Contact__links">
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
      <div class="Contact__links">
        <a href="https://soundcloud.com/nikameush" target="_blank" title="SoundCloud">
          <i class="fab fa-soundcloud"></i>
        </a>
        <a href="https://www.freecodecamp.org/nikameush" target="_blank" title="FreeCodeCamp">
          <i class="fab fa-free-code-camp"></i>
        </a>
        <a href="https://github.com/kamatheuska" target="_blank" title="GitHub">
          <i class="fab fa-github-square"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'app-contact',
  data () {
    return {
      user: {
        name: 'Nicolas A. Ramirez',
        email: 'nico9017@gmail.com',
        phone: '+34 620 543 185',
        city: 'Barcelona, Spain'
      }
    }
  },
  computed: {
    ...mapState([ 'homepage' ])
  },
  methods: {
    ...mapActions([ 'hideSubmenu' ]),

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
.Contact {
  grid-column: 1;
  grid-row: 2;
  margin-left: auto;
}
.Contact__links {
  width: 70%;
  justify-content: flex-end;
  display: flex;
  font-size: 1.4rem;
  margin-top: 1rem;
  margin-left: auto;
}
.Contact__links > * {
  flex: 1;
}
.Contact h2 { font-family: 'Playfair Display', serif }

@media only screen
  and (min-device-width: 300px)
  and (max-device-width: 900px)
  and (orientation: portrait) {
    .Contact {
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
    .Contact h2,
    .Contact p {
      background-color: #fff;
    }
    .Contact__links {
      width: 70%;
      justify-content: flex-end;
      display: flex;
      font-size: 1.7rem;
      margin: 1rem auto;
    }
  }
@media only screen
  and (min-device-width: 300px)
  and (max-device-width: 900px)
  and (orientation: landscape) {
    .Contact {
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
    .Contact h2,
    .Contact p {
      background-color: #fff;
    }
    .Contact__links {
      width: 70%;
      justify-content: flex-end;
      display: flex;
      font-size: 1.7rem;
      margin: 1rem auto;
    }
  }
</style>
