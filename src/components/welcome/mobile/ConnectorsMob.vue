<template>
  <transition name="fade">
    <g>
      <g v-if="!homepage.svgConnectors[0].hidden" id="ConnectorsMobile__welcome">
        <path class="ConnectorsMob__welcome" d="m239 370.3h72.19v-70.31h75"/>
        <path class="ConnectorsMob__welcome" d="m178.1 128.2 146.8-1.334v-78.92h80.65v247.7l-1.127 515.4h-195.8v48.94h-171.3v-664.6h137"/>
        <path class="ConnectorsMob__welcome" d="m178.1 144.9h191.9s-0.2564 11.38 0 12.33c0.2564 0.9569-71.58 0-71.58 0v38.78h101.6"/>
      </g>
      <g v-if="homepage.navigation[1].active" id="ConnectorsMobile__projects">
        <path class="ConnectorsMob__proyects" d="m162.4 682.3h-141.8v-629.8h355.4v81.55h-79.01v84.85h128.6v156.4h-91.48v229.4h83.53v78.22h-64.97v87.43h-38.4v128.1h-274.7v-124.6h133.1"/>
        <path class="ConnectorsMob__proyects" d="m178.3 178.7h14.27v-13.05h27.35"/>
        <path class="ConnectorsMob__proyects" d="m237 369.7h52.04v-105.4h53.7"/>
        <path class="ConnectorsMob__proyects" d="m178.5 721.2h64.14v-82.04h67.62"/>
        <path class="ConnectorsMob__proyects" d="m175.3 773.7h25.33v-34h54.4v-26.7h14.53"/>
      </g>
    </g>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'svg-connectors-mob',
  data () {
    return {

    }
  },
  computed: {
    ...mapState([ 'homepage' ])
  }
}
</script>

<style>
.ConnectorsMob__proyects {
  stroke:#4ee5a4;
  stroke-width:2.437;
  stroke-opacity:.5804;
  fill:none;
}
.ConnectorsMob__rect {
  stroke-width:0.36;
  fill:#fff;
  fill-rule:evenodd;
}
.ConnectorsMob__welcome {
  stroke:#4ee5a4;
  stroke-width:2.812;
  stroke-opacity:.5804;
  fill:none;
}
</style>
