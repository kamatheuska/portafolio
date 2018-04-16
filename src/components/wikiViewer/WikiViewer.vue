<template>
  <div class="Wiki container grid">
    <div @click="options = !options"
          class="Wiki__search-icon"
           v-if="!options">
        <i class="fas fa-search"></i><br>
        <span class="Wiki__hint h--bold">Click here to start!</span>
    </div>
    <div class="Wiki__search">
      <transition name="slide-fade">
        <div class="Wiki__options" v-if="options">
          <random-dice></random-dice>
          <div class="Wiki__input">
            <input type="text"
                v-model="query"
            placeholder="Search in Wikipedia"
                  class="input__text--full">
            <button class="button--primary"
            @click="getWikiDocs()">Go get them all!</button>
          </div>
        </div>
      </transition>
    </div>
    <div class="Wiki__results box"
         v-for="(page, i) in wiki.query.search"
         :key="`page-${i}`"
         @mouseover="showByIndex = i"
         @mouseout="showByIndex = null"
         :class="`Wiki__results${i}`">
      <h2 v-if="showByIndex !== i">{{ page.title | textToUpperCase }}</h2>
        <span v-show="showByIndex === i" v-html="page.snippet"></span>
    </div>
  </div>
</template>

<script>
import RandomDice from './RandomDice'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      options: false,
      query: 'Heavy metal',

      wiki: {
        query: {
          search: []
        }
      },
      showByIndex: null
    }
  },
  components: {
    'random-dice': RandomDice
  },
  methods: {

    ...mapActions([
      'requestApi'
    ]),

    getWikiDocs () {
      let config = {
        params: {
          origin: '*',
          action: 'query',
          prop: 'revisions',
          format: 'json',
          list: 'search',
          srsearch: this.query
        }
      }
      this.requestApi({ config, service: 'wiki' })
        .then((res) => {
          this.wiki = Object.assign({}, this.wiki, res.data)
        })
    }
  },
  filters: {
    textToUpperCase (str) {
      return str.toUpperCase()
    }
  }
}
</script>

<style>
.Wiki {
  text-align: center;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr) ;
  background: url(./wikiBack.png) top center no-repeat;
  background-size: auto 20rem, cover;
  height: 100%;
  width: 100%;
}
.Wiki__search-icon {
  height: 100%;
  font-size: 3rem;
  color: #6D6D6D;
  grid-column: 2 / span 2;
  grid-row: 2;
  align-self: center;
}
.Wiki__search {
  grid-column: 2 / span 2;
  grid-row: 2;
  align-self: center;
}
.Wiki__input,
.Wiki__randomDice {
  margin-top: 1rem;
  flex: 1;
}
.Wiki__options {
  display: flex;
  align-items: center;
}
.button--primary {
  margin-top: 1rem;
  height: 2.5rem;
  color: #6D6D6D;
  font-family: monospace;
}

/*............RESULTS FROM API............*/
.Wiki__results {
  box-shadow: -2px 0.2rem 1.3rem -4px rgba(0,0,0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem;
  opacity: 0.65;
}
.Wiki__results0 { background: #BCF6DA }
.Wiki__results1 { background: #DDFFF1 }
.Wiki__results2 { background: #D9F7F2 }
.Wiki__results3 { background: #E3F9F2 }
.Wiki__results4 { background: #F8FFFC }
.Wiki__results5 { background: #DDFFF1 }
.Wiki__results6 { background: #D9F7F2 }
.Wiki__results7 { background: #E3F9F2 }
.Wiki__results8 { background: #F8FFFC }
.Wiki__results9 { background: #BCF6DA }
.searchmatch    { font-family: monospace }

/*............MEDIA QUERIES............*/
@media only screen
  and (max-device-width: 520px)
  and (orientation: portrait){
    .Wiki {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(6, auto)
    }
    .Wiki__search-icon {
      grid-column: 1 / span 2;
      grid-row: 3 / span 2;
      align-self: center;
    }
    .Wiki__search {
      grid-column: 1 / span 2;
      grid-row: 1;
    }
    .Wiki__options { display: block }
    .Wiki__results { font-size: 0.8em }

}
@media only screen
  and (min-device-width: 540px)
  and (max-device-width: 820px)
  and (orientation: landscape){
    .Wiki {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(6, 1fr)
    }
    .Wiki__search-icon {
      grid-column: 2 / span 1;
      grid-row: 3 / span 2;
      align-self: center;
    }
    .Wiki__search {
      grid-column: 3 / span 1;
      grid-row: 1 / -1;
    }
    .Wiki__options { display: block }
    .Wiki__results { font-size: 0.8rem }
}
/*............ANIMATIONS............*/
@keyframes teaseUser {
  0%, 100% { opacity: 0 }
  50%      { opacity: 1 }
}
.Wiki__hint {
  animation: teaseUser ease 2s infinite;
  font-size: 0.4em;
}
</style>
