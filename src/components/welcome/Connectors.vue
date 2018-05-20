<template>
  <g id="Connectors" transform="translate(509.8 -57.25)">
    <transition name="fade">
      <g id="Connectors__welcome" v-if="!homepage.svgConnectors[0].hidden" transform="translate(-478.3 36.82)">
        <path id="connectors-up" style="stroke-opacity:.5804;stroke:#4ee5a4;stroke-width:3.75;fill:none" d="m-291.6 1346v-102.1h53.45v-235h125.1v-354.1l1519 0.2197v105.9l-386.1-2.524-779.6-2.305v141h124.6v283.5" transform="translate(478.3 -36.82)"/>
        <path id="connectors-down" style="stroke-opacity:.5804;stroke:#4ee5a4;stroke-width:3.75;fill:none" d="m1057 1431v59.99h454.6v295.7h-576.5v169h-657.1v-60h-171.5v-325.3h-352.1v-221.2" transform="translate(478.3 -36.82)"/>
      </g>
    </transition>
    <transition name="fade">
      <g id="Connectors__projects" v-if="homepage.navigation[1].active">
        <path style="stroke-opacity:.5804;stroke:#4ee5a4;stroke-width:3.75;fill:none" d="m1117 1401v59.99h454.6v295.7h-219.4"/>
        <path style="stroke-opacity:.5804;stroke:#4ee5a4;stroke-width:3.094;fill:none" d="m1450 1314v-1228h318.4v900.3h-318.2"/>
        <g transform="translate(60 -30)">
          <path style="fill:#fff;fill-rule:evenodd" d="m1373 881.6h32.77v19.55h-32.77z"/>
          <path d="m1343 1342v-450h658.3v-95.46h-27.18" style="stroke-opacity:.5804;stroke:#4ee5a4;stroke-width:3.094;fill:none"/>
        </g>
        <path style="stroke-opacity:.5804;stroke:#4ee5a4;stroke-width:3.094;fill:none" d="m1450 692.8h-671.9l0.5184 89.15-182-0.1172-182-0.1172v367.7"/>
        <path style="stroke-opacity:.5804;stroke:#4ee5a4;stroke-width:3.094;fill:none" d="m-276.9 1315v-250.6h194.4v-79.69"/>
        <g transform="translate(60 -30)">
          <path style="fill:#fff;fill-rule:evenodd" d="m347.2 900.9h12.7v13.58h-12.7z"/>
          <path d="m-142.4 1054h286.8v-145.8h669.4c0.002-32.19-0.1096-96.56-0.1096-96.56" style="stroke-opacity:.5804;stroke:#4ee5a4;stroke-width:3.094;fill:none"/>
        </g>
        <g transform="translate(60 -30)">
          <path style="fill:#fff;fill-rule:evenodd" d="m995.8 705.7h12.7v30.82h-12.7z"/>
          <path style="fill:#fff;fill-rule:evenodd" d="m1023 705.7h12.7v30.82h-12.7z"/>
          <path d="m1192 1328v-460.1h-189v-436.8h-224v-62.6l-211.8-0.6v-135.6h461.2v618.7h217.3v483.9" style="stroke-opacity:.5804;stroke:#4ee5a4;stroke-width:3.094;fill:none"/>
        </g>
        <path style="stroke-opacity:.5804;stroke:#4ee5a4;stroke-width:3.094;fill:none" d="m1193 1350v88.3h507v928.1h-870.3v-91.88"/>
        <path style="stroke-opacity:.5804;stroke:#4ee5a4;stroke-width:3.094;fill:none" d="m1149 1368v80.37h493.3v866.8h-661v-37.12"/>
        <path style="stroke-opacity:.5804;stroke:#4ee5a4;stroke-width:3.094;fill:none" d="m412.5 1507v656.2h749.1v43.12"/>
        <g transform="translate(60 -30)">
          <path style="fill:#fff;fill-rule:evenodd" d="m-350.9 1225h29.94v12.26h-29.94z"/>
          <path d="m-151.7 1342v-110h-306.4v-238.1h35.22" style="stroke-opacity:.5804;stroke:#4ee5a4;stroke-width:3.094;fill:none"/>
        </g>
      </g>
    </transition>
  </g>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'svg-connectors',
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
</style>
