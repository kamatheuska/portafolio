<template>
  <div class="Browser grid">
    <div class="Browser__container grid">
      <header class="Browser__header">
        <router-link to="/">HOME</router-link>
        <h1>TWITCH STREAMERS</h1>
        <div class="Browser__controls">
          <button class="button--state-alert"
                  @click="toggleStreams('all')">
            ALL
          </button>
          <button class="button--primary"
                  @click="toggleStreams('online')">
            ONLINE
          </button>
          <button class="button--danger"
                  @click="toggleStreams('offline')">
            OFFLINE
          </button>
        </div>
      </header>
      <div v-for="(user, i) in twitch.users.streams"
           :key="`user#${i}`"
           v-if="twitch.users.show"
           class="Browser__stream">
          <div class="Stream__thumbnail">
            <h4 class="Stream__type h--bold">{{ user.display_name }}</h4>
            <img :src="user.profile_image_url"
                 :alt="user.login"
                 class="Stream__thumbnail-img">
          </div>
        <a :href="`https://www.twitch.tv/${user.login}`"
           title="go to stream"
           target="_blank" class="Stream__title">
           {{ user.description | sliceString }}</a>
        <h4>TOTAL VIEWS: {{ user.view_count}}</h4>
      </div>
      <div v-for="(stream, i) in online.streams"
           :key="`stream#${i}`"
           v-if="online.show"
           class="Browser__stream">
          <div class="Stream__thumbnail">
            <h4 class="Stream__type h--bold">{{ stream.display_name }}</h4>
            <img :src="stream.profile_image_url"
                 :alt="stream.login"
                 class="Stream__thumbnail-img">
          </div>
        <a :href="`https://www.twitch.tv/${stream.login}`"
           title="go to stream"
           target="_blank" class="Stream__title">
           {{ stream.description | sliceString }}</a>
        <h4>VIEWERS: {{ stream.viewer_count }}</h4>
        <h4>LANGUAGE: {{ stream.language | checkLanguage }}</h4>
      </div>
      <div v-for="(stream, i) in offline.streams"
           :key="`stream#${i}`"
           v-if="offline.show"
           class="Browser__stream">
          <div class="Stream__thumbnail"
              @click="goToStream()">
            <h4 class="Stream__type h--bold">{{ stream.display_name }}</h4>
            <img :src="stream.profile_image_url"
                 :alt="stream.login"
                 class="Stream__thumbnail-img">
          </div>
        <a :href="`https://www.twitch.tv/${stream.login}`"
           title="go to stream"
           target="_blank" class="Stream__title">
           {{ stream.description | sliceString }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      online: {
        show: false,
        streams: []
      },
      offline: {
        show: false,
        streams: []
      },
      twitch: {
        users: {
          show: false,
          streams: [],
          url: 'https://www.twitch.tv/'
        },
        online: null
      }
    }
  },
  methods: {
    ...mapActions([
      'requestApi'
    ]),

    toggleStreams (cmd) {
      switch (cmd) {
        default:
          this.twitch.users.show = true
          this.online.show = false
          this.offline.show = false
          break
        case 'online':
          this.twitch.users.show = false
          this.online.show = true
          this.offline.show = false
          break
        case 'offline':
          this.online.show = false
          this.offline.show = true
          this.twitch.users.show = false
          break
      }
    },

    // setStreamOnlineData (idArray) {
    //   Object.assign({}, this.online.streams)
    // }
    setStreamOnlineStatus () {
      let streamData = this.twitch.online.map(obj => {
        return {
          user_id: obj.user_id,
          title: obj.title,
          started_at: obj.started_at,
          viewer_count: obj.viewer_count,
          language: obj.language
        }
      })
      console.log(streamData)
      streamData.forEach(dataObj => {
        this.twitch.users.streams.forEach((stream, i) => {
          if (stream.id === dataObj.user_id) {
            stream.online = true
            this.online.streams.push(Object.assign({}, stream, dataObj))
          } else {
            stream.online = false
            this.offline.streams.push(stream)
          }
        })
      })
    },

    fetchAndSetData () {
      this.requestApi({ service: 'twitch/users' })
        .then((res) => {
          this.twitch.users.streams = res.data.data
          this.twitch.users.show = true
          return Promise.resolve()
        })
        .then(() => this.requestApi({ service: 'twitch/recommended' }))
        .then((res) => {
          this.twitch.online = res.data.data
          return Promise.resolve()
        })
        .then(() => this.setStreamOnlineStatus())
        .catch(err => {
          console.log('Error in created() promise', err)
        })
    }

  },
  filters: {
    sliceString (str) {
      if (str.length === 0) {
        return '***NO DESCRIPTION***'
      }
      return str.slice(0, 60) + '...'
    },

    checkLanguage (str) {
      return str === 'fr' ? 'French'
        : str === 'en' ? 'English' : str
    }
  },

  created () {
    this.fetchAndSetData()
  }
}
</script>

<style>
.Browser {
  grid-template-columns: auto 400px auto;
  background: #5F5F5E;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  color: white;
  font-family: 'Oswald', sans-serif;
}
.Browser__container {
  overflow: visible;
  grid-template-rows: auto repeat(5, 1fr);
  grid-auto-rows: auto;
  grid-column: 2 / span 1;
  height: 100%;
  width: 100%;
}

/*............BUTTON CONTROLS............*/
.Browser__controls .button--primary {
  color: #09EAAE;
  background: none;
}
.Browser__controls .button--danger {
  color: #FF8B8B;
  background: none;
}
.Browser__controls .button--danger:hover {
  background: #FF8B8B;
  color: #FFF;
}
.Browser__controls .button--danger:focus       { background: #FF8B8B }
.Browser__controls .button--primary:hover      { background: #06B083 }
.Browser__controls .button--primary:focus      { background: #09EAAE }
.Browser__controls .button--state-alert:focus  { background: #DBD3B8 }
.Browser__controls .button--state-submit:focus { background: #C2DCE2 }

.Browser__controls .button--danger:focus,
.Browser__controls .button--primary:focus,
.Browser__controls .button--state-alert:focus,
.Browser__controls .button--state-submit:focus { color: #3C3C3B }

.Browser__controls button { width: 100% }
.Browser__controls { display: flex }

/*............HEADER............*/
.Browser__header a       { display: inline-block }
.Browser__header a:hover { color: #C2DCE2 }

.Browser__header h1 { font-size: 3.3rem}
.Browser__header {
  text-align: center;
  padding-top: 2rem;
}

/*............STREAMS............*/
.Browser .Browser__stream {
  display: grid;
  grid-template-columns: 160px auto;
  padding: 0.5rem;
  border: none;
  background-color: #3C3C3B;
  box-shadow: 1px 1px 5px #070607 inset;
  align-items: center;
  text-align: center;
}
.Stream__title {
  height: max-content;
}
.Stream__thumbnail {
  text-align: center;
  grid-column: span 1;
}
.Stream__thumbnail-img {
  max-width: 8vh;
  max-height: 8vh;
  margin-top: 5px;
  border: 2px #DDD solid;
  border-radius: 50%;
}

/*............MEDIA QUERIES............*/
@media only screen
  and (min-device-width: 320px)
  and (orientation: portrait) {
    .Browser {
      display: block;
      padding: 1rem 0.8rem;
    }
    .Browser__header { padding-top: 0 }

}

@media only screen
  and (min-device-width: 320px)
  and (max-device-width: 812px)
  and (orientation: landscape) {
    .Browser {
      display: block;
      padding: 1rem 0.8rem;
    }
    .Browser__header { padding-top: 0 }
}
</style>
