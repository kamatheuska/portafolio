<template>
  <div class="Bio box__big"
        v-if="homepage.navigation[0].active">
    <button class="button__tiny--welcome" @click="hideSubmenu()">back</button>
    <div class="Bio__button">
      <button class="button--primary button__tiny"
        @click="changeLanguage('eng')">ENG</button>
      <button class="button--primary button__tiny"
        @click="changeLanguage('spa')">SPA</button>
    </div>
    <br>
    <div class="Bio__eng" v-if="language[0].active">
      <h1>Biography</h1>
      <p>My name is Nicolas, I am from Cartagena, Colombia. I have strong background in music composition, which I studied thoroughly in the MusikSchule Tempelhof-Schöneberg and in the UdK Berlin. This learning process sparkled in me a big curiosity on algorithms and the relation between maths and music, and not much later I encounter the world of programming and computer science, which in a sense has tons of resemblences to the music endeavour.</p>
      <p>I am passionate about traveling, and I am reaaly into literature, music and films. I love sincere, brutally honest and creative art that speaks to the heart in no matter which beatiful, tragic or disgusting way. I have been around the world a bit, but have still a lot places to go. Countries I’ve visited: Belgium, Colombia, France, Germany, Italy, Luxembourg, Poland, Spain, Venezuela.</p>
      <p>My personal experience tells me that selflearning with tons of backup is the best way to grow as a person, for your mind to open new unbelievable frontiers within itself.</p>
    </div>
    <div class="Bio__spa" v-if="language[1].active">
      <h1>Biografía</h1>
      <p>Mi nombre es Nicolás, Soy de Cartagena, Colombia. Tengo una formación sólida en composición musical, que estudié a profundidad en la MusikSchule Tempelhof-Schöneberg y en UdK Berlin, la Universidad de Artes. Este proceso de aprendizaje encendió en mi una gran curiosidad en cuanto a la relación de las matemáticas y el pensamiento algorítmico, y la música. No mucho después descubrí el mundo de la programación y de la informática, que en cierto sentido tiene muchas similitudes y procesos análogos a la música</p>
      <p>Me apasiona viajar, la literatura, la música y el cine. Aprecio mucho el arte que es sincero, brutalmente honesto y creativo, que hable desde el corazón sin importar de que manera lo haga. He viajado algo por el mundo, pero todavía tengo muchos sitios que anhelo visitar.</p>
      <p>Mi experiencia personal me dice que aprender por mi mismo, teniendo apoyo desde muchos angulos, es la mejor manera de crecer como persona y de abrir inimaginables fronteras dentro de nuestra mente.</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'app-bio',
  data () {
    return {
      language: [
        { name: 'eng', active: true },
        { name: 'spa', active: false }
      ]
    }
  },
  computed: {
    ...mapState([ 'homepage' ])
  },
  methods: {
    ...mapActions([ 'hideSubmenu' ]),

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
  and (min-device-width: 300px)
  and (max-device-width: 900px)
  and (orientation: portrait) {
    .Bio {
      font-size: 1rem;
      color: #236E4D;
      position: absolute;
      height: 95vh;
      width: 90vw;
      background-color: rgba(255, 255, 255, 0.9);
      text-align: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      top: 2vh;
      left: 8vw;
    }
  }
</style>
