<template>
  <g>
    <transition name="fade">
      <g @click="showSubmenu('music')" v-if="!homepage.navigation[2].hidden">
        <path class="NavigationMob__rect" d="m366.1 286.8h84.17v25.77h-84.2z"/>
        <text y="305.98001" x="376.77936" class="NavigationMob__text--welcome"><tspan y="305.98001" x="376.77936" class="NavigationMob__tspan--welcome">MUSIC</tspan></text>
      </g>
    </transition>

    <transition name="fade">
      <g @click="showSubmenu('bio')" v-if="!homepage.navigation[2].hidden">
        <path class="NavigationMob__rect" d="m351.9 83.13h112.5v23.39h-112.5z"/>
        <text y="101.0722" x="390.41666" class="NavigationMob__text--welcome"><tspan y="101.0722" x="390.41666" class="NavigationMob__tspan--welcome">BIO</tspan></text>
      </g>
    </transition>

    <transition name="fade">
      <g @click="showSubmenu('contact')" v-if="!homepage.navigation[2].hidden">
        <path class="NavigationMob__rect" d="m349.7 186.8h117v19.72h-117z"/>
        <text y="202.96417" x="362.95374" class="NavigationMob__text--welcome"><tspan y="202.96417" x="362.95374" class="NavigationMob__tspan--welcome">CONTACT</tspan></text>
      </g>
    </transition>

    <transition name="fade">
      <g class="NavigationMob__projects" @click="showSubmenu('projects')">
        <path d="m246.2 775.6h139.9v73.98h-139.9z" class="NavigationMob__rect"/>
        <text y="800.96143" x="315.65286" class="NavigationMob__text--dev" xml:space="preserve"><tspan y="800.96143" x="315.65286" class="NavigationMob__tspan--dev">FRONTEND</tspan><tspan y="820.21863" x="315.65286" class="NavigationMob__tspan--dev">WEB</tspan><tspan y="839.47571" x="315.65286" class="NavigationMob__tspan--dev">DEVELOPER</tspan><tspan y="859" x="315.65286" class="Navigation__tspan--dev" v-if="homepage.navigation[1].active">[ p r o j e c t s ]</tspan></text>
      </g>
    </transition>

    <transition name="fade">
      <g @click="goToRoute('earthbnb')" v-if="homepage.navigation[1].active">
        <path d="m212.4 153.9h169.8v24.52h-169.8z" class="NavigationMob__rect"/>
        <text y="172.51875" x="219.82674" class="NavigationMob__text"><tspan y="172.51875" x="219.82674" class="NavigationMob__tspan">EARTHBNB APP</tspan></text>
      </g>
    </transition>

    <transition name="fade">
      <g @click="goToRoute('matiz')" v-if="homepage.navigation[1].active">
        <path d="m333.4 250.5h184.2v29.7h-184.2z" class="NavigationMob__rect"/>
        <text y="271.21509" x="345.58029" class="NavigationMob__text"><tspan y="271.21509" x="345.58029" class="NavigationMob__tspan">MATIZ WEB APP</tspan></text>
      </g>
    </transition>

    <transition name="fade">
      <g @click="goToRoute('twitchtv')" v-if="homepage.navigation[1].active">
        <path d="m309.6 624h214.2v26.37h-214.4z" class="NavigationMob__rect"/>
        <text y="643.61688" x="318.08771" class="NavigationMob__text"><tspan y="643.61688" x="318.08771" class="NavigationMob__tspan">TWITCHTV STREAMS</tspan></text>
      </g>
    </transition>

    <transition name="fade">
      <g @click="goToRoute('weather')" v-if="homepage.navigation[1].active">
        <path d="m268.1 701.5h168.5v27.68h-168.5z" class="NavigationMob__rect"/>
        <text y="721.79938" x="276.03839" class="NavigationMob__text"><tspan y="721.79938" x="276.03839" class="NavigationMob__tspan">WEATHERZILLA</tspan></text>
      </g>
    </transition>

    <transition name="fade">
      <g @click="goToRoute('wikiviewer')" v-if="homepage.navigation[1].active">
        <path d="m74.7 883.1h197.3v29.29h-197.3z" class="NavigationMob__rect"/>
        <text y="904.19812" x="78.905884" class="NavigationMob__text"><tspan y="904.19812" x="78.905884" class="NavigationMob__tspan">WIKIPEDIA VIEWER</tspan></text>
      </g>
    </transition>

    <transition name="fade">
      <g @click="goToRoute('rqmachine')" v-if="homepage.navigation[1].active">
        <path d="m35.3 41h302.8v26.89h-302.9z" class="NavigationMob__rect"/>
        <text y="59.665821" x="54.98177" class="NavigationMob__text"><tspan y="59.665821" x="54.98177" class="NavigationMob__tspan">RANDOM QUOTE MACHINE</tspan></text>
      </g>
    </transition>

  </g>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState([ 'homepage' ])
  },
  methods: {
    ...mapActions([ 'showSubmenu' ]),

    goToRoute (route) {
      this.$router.push(route)
    }

  }
}
</script>

<style scoped>
.NavigationMob__tspan {
  stroke-width: .3375px;
  fill: #34976c;
}
.NavigationMob__rect {
  stroke-width:0.36;
  fill:#fff;
  fill-rule:evenodd;
}
.NavigationMob {
  font-size:18.45px;
}
.NavigationMob__tspan--dev {
  font-size:21.6px;
  stroke-width:.3375px;
  fill:#31966a;
  font-family: 'montserratmedium', Arial, sans-serif;
  text-anchor:middle;
  font-weight:600;
  text-align:center;
}
.NavigationMob__text--dev {
  font-weight:600;
  font-size:13.5px;
  line-height:125%;
  font-family: 'montserratmedium', Arial, sans-serif;
  font-variant-ligatures:normal;
  font-variant-position:normal;
  font-variant-caps:normal;
  font-variant-numeric:normal;
  font-variant-alternates:normal;
  font-feature-settings:normal;
  text-indent:0;
  text-decoration:none;
  text-decoration-line:none;
  text-decoration-style:solid;
  text-decoration-color:#000000;
  letter-spacing:0px;
  word-spacing:0px;
  text-transform:none;
  text-orientation:mixed;
  dominant-baseline:auto;
  white-space:normal;
  shape-padding:0;
  fill:#31966a;
  stroke-width:0.36000001
}
/*.NavigationMob__text--dev {
  font-size:13.5px;
  text-decoration-color:#000000;
  font-variant-numeric:normal;
  letter-spacing:0px;
  font-variant-ligatures:normal;
  text-decoration-line:none;
  stroke-width:0.36;
  fill:#31966a;
  font-variant-position:normal;
  font-feature-settings:normal;
  font-weight:600;
  shape-padding:0;
  font-variant-alternates:normal;
  word-spacing:0px;
  text-indent:0;
  dominant-baseline:auto;
  font-variant-caps:normal;
  white-space:normal;
  font-family: 'montserratmedium', Arial, sans-serif;
  text-decoration-style:solid;
  text-orientation:mixed;
  text-transform:none;
  line-height:125%;
  cursor: pointer;
}*/
.NavigationMob__text {
  cursor: pointer;
  text-decoration-color:#000000;
  font-variant-numeric:normal;
  letter-spacing:0px;
  font-variant-ligatures:normal;
  text-decoration-line:none;
  stroke-width:0.36;
  fill:#34976c;
  font-variant-position:normal;
  font-feature-settings:normal;
  font-weight:600;
  shape-padding:0;
  font-variant-alternates:normal;
  word-spacing:0px;
  text-indent:0;
  dominant-baseline:auto;
  font-variant-caps:normal;
  white-space:normal;
  font-family: 'montserratmedium', Arial, sans-serif;
  text-decoration-style:solid;
  text-orientation:mixed;
  text-transform:none;
  line-height:125%;
}
.NavigationMob__text--welcome {
  font-size:18px;
  text-decoration-color:#000000;
  font-variant-numeric:normal;
  letter-spacing:0px;
  font-variant-ligatures:normal;
  text-decoration-line:none;
  stroke-width:0.36;
  fill:#31966a;
  font-variant-position:normal;
  font-feature-settings:normal;
  font-weight:600;
  shape-padding:0;
  font-variant-alternates:normal;
  word-spacing:0px;
  text-indent:0;
  dominant-baseline:auto;
  font-variant-caps:normal;
  white-space:normal;
  font-family: 'montserratmedium', Arial, sans-serif;
  text-decoration-style:solid;
  text-orientation:mixed;
  text-transform:none;
  line-height:125%;
  cursor: pointer;
}
.NavigationMob__tspan--welcome {
  font-size:18px;
  stroke-width:.3375px;
  font-weight:600;
  font-family: 'montserratmedium', Arial, sans-serif;
  fill:#31966a;
}
</style>
