<template>
  <g class="Navigation">
    <transition name="fade">
      <g @click="goToRoute('earthbnb')" v-if="homepage.navigation[1].active">
        <path d="m27.32 359.2h169.8v24.52h-169.8z" class="Navigation__rect"/>
        <text y="377.81876" x="34.72673" class="Navigation__text" xml:space="preserve"><tspan y="377.81876" x="34.72673" class="Navigation_tspan">EARTHBNB APP</tspan></text>
      </g>
    </transition>

    <transition name="fade">
      <g @click="goToRoute('matiz')" v-if="homepage.navigation[1].active">
        <path d="m366 292.2h184.2v29.7h-184.2z" class="Navigation__rect"/>
        <text y="312.9151" x="378.14029" class="Navigation__text" ><tspan y="312.9151" x="378.14029" class="Navigation_tspan">MATIZ WEB APP</tspan></text>
      </g>
    </transition>

    <transition name="fade">
      <g class="Navigation__projects" @click="showSubmenu('projects')">
        <path d="m583.7 666.6h178.4v73.98h-178.4z" class="Navigation__rect"/>
        <text y="691.87537" x="672.33423" class="Navigation__text--dev" xml:space="preserve"><tspan y="691.87537" x="672.33423" class="Navigation__tspan--dev">FRONTEND</tspan><tspan y="711.13257" x="672.33423" class="Navigation__tspan--dev">WEB</tspan><tspan y="730.38965" x="672.33423" class="Navigation__tspan--dev">DEVELOPER</tspan><tspan y="760.38965" x="672.33423" class="Navigation__tspan--dev" v-if="homepage.navigation[1].active">[ p r o j e c t s ]</tspan>
        </text>
      </g>
    </transition>

    <transition name="fade">
      <g @click="goToRoute('twitchtv')" v-if="homepage.navigation[1].active">
        <path d="m339.5 136.1h214.2v21.21h-214.4z" class="Navigation__rect"/>
        <text y="153.11691" x="347.99771" class="Navigation__text" xml:space="preserve"><tspan y="153.11691" x="347.99771" class="Navigation_tspan">TWITCHTV STREAMS</tspan></text>
      </g>
    </transition>

    <transition name="fade">
      <g @click="goToRoute('weather')" v-if="homepage.navigation[1].active">
        <path d="m624.4 203.2h168.5v27.68h-168.5z" class="Navigation__rect"/>
        <text y="223.49936" x="632.33838" class="Navigation__text" xml:space="preserve"><tspan y="223.49936" x="632.33838" class="Navigation_tspan">WEATHERZILLA</tspan></text>
      </g>
    </transition>

    <transition name="fade">
      <g @click="goToRoute('wikiviewer')" v-if="homepage.navigation[1].active">
        <path d="m700.7 259.8h197.3v29.29h-197.3z" class="Navigation__rect"/>
        <text y="280.89813" x="704.90588" class="Navigation__text" xml:space="preserve"><tspan y="280.89813" x="704.90588" class="Navigation_tspan">WIKIPEDIA VIEWER</tspan></text>
      </g>
    </transition>

    <transition name="fade">
      <g @click="goToRoute('rqmachine')" v-if="homepage.navigation[1].active">
        <path d="m385.1 822.4h302.8v26.89h-302.9z" class="Navigation__rect"/>
        <text y="841.0658" x="404.78177" class="Navigation__text" xml:space="preserve"><tspan y="841.0658" x="404.78177" class="Navigation_tspan">RANDOM QUOTE MACHINE</tspan></text>
      </g>
    </transition>

    <transition name="fade">
      <g v-if="!homepage.navigation[2].hidden" @click="showSubmenu('music')">
        <path d="m570.4 245.6h84.17v25.77h-84.2z" class="Navigation__rect"/>
        <text y="264.83002" x="581.07935" class="Navigation__text--welcome" xml:space="preserve"><tspan y="264.83002" x="581.07935" class="Navigation__tspan--welcome">MUSIC</tspan></text>
      </g>
    </transition>

    <transition name="fade">
      <g v-if="!homepage.navigation[0].hidden" @click="showSubmenu('bio')">
        <path d="m86.33 322.5h112.5v23.39h-112.5z" class="Navigation__rect"/>
        <text y="340.4422" x="124.81665" class="Navigation__text--welcome" xml:space="preserve"><tspan y="340.4422" x="124.81665" class="Navigation__tspan--welcome">BIO</tspan></text>
      </g>
    </transition>

    <transition name="fade">
      <g v-if="!homepage.navigation[3].hidden" @click="showSubmenu('contact')">
        <path d="m113.2 580h117v19.72h-117z" class="Navigation__rect"/>
        <text y="596.13416" x="126.45372" class="Navigation__text--welcome" xml:space="preserve"><tspan y="596.13416" x="126.45372" class="Navigation__tspan--welcome">CONTACT</tspan></text>
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
.Navigation__projects:hover {
  fill: red;
}
.Navigation__tspan {
  stroke-width: .3375px;
  fill: #34976c;
}
.Navigation__rect {
  stroke-width:0.36;
  fill:#fff;
  fill-rule:evenodd;
}
.Navigation {
  font-size:18.45px;
}
.Navigation__tspan--dev {
  font-size:21.6px;
  stroke-width:.3375px;
  fill:#31966a;
  font-family: 'montserratmedium', Arial, sans-serif;
  text-anchor:middle;
  font-weight:600;
  text-align:center;
}
.Navigation__text--dev {
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
}
.Navigation__text {
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
.Navigation__text--welcome {
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
}
.Navigation__tspan--welcome {
  font-size:18px;
  stroke-width:.3375px;
  font-weight:600;
  font-family: 'montserratmedium', Arial, sans-serif;
  fill:#31966a;
}
</style>
