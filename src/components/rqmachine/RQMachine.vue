<template>
  <div class="RQMachine grid" :class="newBackground">
    <transition name="fade">
      <div class="RQMachine__container box grid">
        <h1 class="grid__row">Random Movie Quotes</h1>
        <div class="box grid__row">
          <h1 class="RQMachine__quote">{{ quote }}</h1><br>
          <h3 class="RQMachine__author">{{ author }}</h3>
        </div>
        <div class="RQMachine__icons">
          <a :href="encodedQuote"
              target="_blank"
             title="Wanna tweet?">
            <i class="fab fa-twitter"></i>
          </a>
        </div>
        <button class="button"
                @click="getRandomQuote()">Get a new quote</button>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {

      quote: '"What a dump."',
      author: 'Beyond the Forest',
      darker: false,
      tweetUrl: ''
    }
  },
  computed: {
    newBackground () {
      return {
        'RQMachine--darker': this.darker
      }
    },

    encodedQuote () {
      return this.tweetUrl
    }
  },
  methods: {
    ...mapActions([
      'requestApi'
    ]),

    getRandomQuote () {
      this.requestApi({service: 'quote'})
        .then((res) => {
          console.log(res)
          this.quote = res.data.quote
          this.author = res.data.author
        })
      this.darker = !this.darker
    },

    sendTweet () {
      this.tweetUrl = encodeURI(`https://twitter.com/intent/tweet?text=${this.quote} ${this.author}`)
      console.log(this.tweetUrl)
    }
  }

}
</script>

<style scoped>
.RQMachine a { display: inline-block }
.RQMachine {
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  font-size: 1rem;
  background-color: #276f6f;
  transition: background-color 1s ease;
}
.RQMachine .box { border: none }
.RQMachine__icons > * { margin-right: 1rem }
.RQMachine__icons {
  font-size: 2.2em;
  grid-column: 1 / span 2;
  height: fit-content;
  align-self: center;
}
.RQMachine__quote { font-family: 'Playfair Display', serif }
.RQMachine__container .box {
  background: #EFFEFE;
  color: #276f6f;
  transition: background-color 1s ease;
}
.RQMachine__container {
  background: #202020;
  text-align: center;
  grid-column: 2;
  grid-row: 2;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, auto);
  color: #EFFEFE;
  transition: background-color 1s ease;
}
.RQMachine__container .button {
  grid-column: 3 / span 2;
  border: none;
  color: inherit;
  font-size: 1.2em;
  width: 100%;
  padding: 0.5rem;
}
.RQMachine--darker { background-color: #202020 }
.RQMachine--darker .RQMachine__container .box {
  background: #276f6f;
  color: #EFFEFE;
}
.RQMachine--darker .RQMachine__container {
  color: #202020;
  background: #EFFEFE;
}

/*............MEDIA QUERIES............*/
@media only screen
  and (min-device-width: 320px)
  and (orientation: portrait) {
    .RQMachine {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-gap: 0;
    }
    .RQMachine__container {
      grid-column: 1 / -1
    }
}

@media only screen
  and (min-device-width: 320px)
  and (max-device-width: 812px)
  and (orientation: landscape) {
    .RQMachine {
      font-size: 0.8rem;
      display: block;
    }

}
</style>
