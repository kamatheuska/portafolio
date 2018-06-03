<template>
  <transition name="fade">
    <g>
      <g v-if="!homepage.svgConnectors[0].hidden">
        <path class="Connectors__welcome" d="m79.52 510.1v-36.76h19.24v-84.6h45.04v-127.5l546.8 0.079v38.12l-139-0.9087-280.7-0.8298v50.76h44.86v102.1" />
        <path class="Connectors__welcome" d="m538.3 529.9v35.44h278v135.8l-172.1 0.675-168.1 0.675v22.6l-30.99-0.0324-160.4-0.0324v-16.88h-31.39v-116.9h-157.1v-79.63"/>
        <path class="Connectors__rect"  d="m424 713.3h38.99v21.96h-39z"/>
      </g>
      <g v-if="homepage.navigation[1].active">
        <path class="Connectors__proyects" d="m682.7 513.7v-442.1h114.6v324.1h-114.6"/>
        <path class="Connectors__rect" d="m676.7 406.8h11.8v7.038h-11.88z" />
        <path class="Connectors__proyects" d="m666.6 513v-102.6h243.1v-133.7h-16.87"/>
        <path class="Connectors__proyects" d="m706.5 275h-241.9l0.1866 32.09-65.52-0.042-65.52-0.042v138.6"/>
        <path class="Connectors__proyects" d="m63.22 509.8v-101h91.58v-28.69"/>
        <path class="Connectors__rect" d="m331.1 339.1h4.572v4.889h-4.6z" />
        <path class="Connectors__proyects" d="m154.8 394.2h103.2v-52.49h241c0-11.59-0.04-34.76-0.04-34.76"/>
        <path class="Connectors__rect" d="m564.6 268.8h4.572v11.1h-4.6z" />
        <path class="Connectors__rect" d="m574.4 268.8h4.572v11.1h-4.6z" />
        <path class="Connectors__proyects" d="m611.5 507.6v-180.4h-44.3v-157.2h-80.64v-22.54l-76.25-0.216v-48.82h166v222.7h54.58v189"/>
        <path class="Connectors__proyects" d="m614 521.6v21.53h262.2v322.6h-464.4v-21.6"/>
        <path class="Connectors__proyects" d="m598.1 526.3v20.58h261.3v312h-348.2v-13.36"/>
        <path class="Connectors__proyects" d="m318.1 574.9v236.2h269.7v15.52"/>
        <path class="Connectors__rect" d="m58.18 466.9h10.78v4.414h-10.78z" />
        <path class="Connectors__proyects" d="m129.8 508.7v-39.6h-88.62v-96.52h12.68"/>
      </g>
    </g>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'svg-Connectors',
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
.Connectors__proyects {
  stroke:#4ee5a4;
  stroke-width:2.437;
  stroke-opacity:.5804;
  fill:none;
}
.Connectors__rect {
  stroke-width:0.36;
  fill:#fff;
  fill-rule:evenodd;
}
.Connectors__welcome {
  stroke:#4ee5a4;
  stroke-width:2.812;
  stroke-opacity:.5804;
  fill:none;
}
</style>
