<template>
  <g @click="hideSubmenu()">
    <path style="opacity:.8710;fill-rule:evenodd;stroke:#4de6a3;stroke-linecap:round;stroke-width:19.23;fill:#fff" d="m351.5 392.6h222v221.9h-222z"/>
    <path style="font-variant-ligatures:normal;shape-padding:0;font-variant-alternates:normal;text-decoration-color:#000000;font-variant-position:normal;font-feature-settings:normal;text-indent:0;text-orientation:mixed;text-decoration-line:none;dominant-baseline:auto;font-variant-caps:normal;font-variant-numeric:normal;white-space:normal;stroke-width:0.36;text-transform:none;text-decoration-style:solid" d="m494.4 494.5v51.84h-13.8v-51.8q0-11.28-3.96-16.59-3.96-5.306-12.4-5.306-9.637 0-14.87 6.872-5.155 6.8-5.155 19.58v47.3h-13.75v-83.7h13.75v12.55q3.661-7.171 9.936-10.83 6.275-3.737 14.87-3.737 12.78 0 19.05 8.442 6.35 8.37 6.35 25.41z"/>
    <path style="font-variant-ligatures:normal;shape-padding:0;font-variant-alternates:normal;text-decoration-color:#000000;font-variant-position:normal;font-feature-settings:normal;text-indent:0;text-orientation:mixed;text-decoration-line:none;dominant-baseline:auto;font-variant-caps:normal;font-variant-numeric:normal;white-space:normal;stroke-width:.3369px;text-transform:none;text-decoration-style:solid" d="m455.7 553.2v10.33h-21.43v8.006h-3.136v-20.05h3.136v8.006h18.29v-6.296zm9.562 6.296v4.036h-5.112v-4.036z"/>
    <path style="font-variant-ligatures:normal;shape-padding:0;font-variant-alternates:normal;text-decoration-color:#000000;font-variant-position:normal;font-feature-settings:normal;text-indent:0;text-orientation:mixed;text-decoration-line:none;dominant-baseline:auto;font-variant-caps:normal;font-variant-numeric:normal;white-space:normal;stroke-width:.3369px;text-transform:none;text-decoration-style:solid" d="m465.3 579.8v4.169h-19.76l10.2 10.59v4.914l-9.256-9.673-15.31 11.19v-4.936l12.68-9.079-2.829-3.005h-9.85v-4.169z"/>
    <path style="font-variant-ligatures:normal;shape-padding:0;font-variant-alternates:normal;text-decoration-color:#000000;font-variant-position:normal;font-feature-settings:normal;text-indent:0;text-orientation:mixed;text-decoration-line:none;dominant-baseline:auto;font-variant-caps:normal;font-variant-numeric:normal;white-space:normal;stroke-width:.3369px;text-transform:none;text-decoration-style:solid" d="m443.5 616.9v-1.338q0-3.531-1.25-5.328-1.228-1.777-3.686-1.777-2.216 0-3.443 1.338-1.228 1.338-1.228 3.708 0 3.334 2.303 5.242 2.325 1.908 6.404 1.93h0.8992zm1.667 7.83h-14.01v-4.057h3.64q-2.193-1.294-3.246-3.268-1.031-1.952-1.031-4.759 0-3.751 2.106-5.987 2.128-2.237 5.681-2.237 4.1 0 6.228 2.742 2.128 2.764 2.128 8.093v5.418h0.6361q2.939-0.022 4.255-1.491 1.338-1.47 1.338-4.694 0-2.062-0.5922-4.169-0.5922-2.106-1.733-4.1h4.036q0.8554 2.237 1.272 4.277 0.4388 2.062 0.4388 3.992 0 3.049-0.8993 5.198-0.8993 2.172-2.698 3.509-1.097 0.8334-2.72 1.184-1.601 0.351-4.824 0.351z"/>
    <path style="font-variant-ligatures:normal;shape-padding:0;font-variant-alternates:normal;text-decoration-color:#000000;font-variant-position:normal;font-feature-settings:normal;text-indent:0;text-orientation:mixed;text-decoration-line:none;dominant-baseline:auto;font-variant-caps:normal;font-variant-numeric:normal;white-space:normal;stroke-width:.3369px;text-transform:none;text-decoration-style:solid" d="m453.2 643.3q1.579 0.7459 2.325 1.886 0.7675 1.162 0.7675 2.786 0 2.961-2.303 4.169-2.281 1.228-8.618 1.228h-14.23v-3.686h14.06q5.198 0 6.448-0.5922 1.272-0.5702 1.272-2.106 0-1.755-1.36-2.413-1.338-0.6361-6.361-0.6361h-14.06v-3.686h14.06q5.263 0 6.491-0.6362 1.228-0.6141 1.228-2.237 0-1.601-1.36-2.237-1.338-0.6142-6.361-0.6142h-14.06v-3.661h24.57v3.661h-2.106q1.316 0.7237 1.996 1.799 0.702 1.096 0.702 2.479 0 1.667-0.7675 2.764-0.7675 1.119-2.325 1.733z"/>
    <path style="font-variant-ligatures:normal;shape-padding:0;font-variant-alternates:normal;text-decoration-color:#000000;font-variant-position:normal;font-feature-settings:normal;text-indent:0;text-orientation:mixed;text-decoration-line:none;dominant-baseline:auto;font-variant-caps:normal;font-variant-numeric:normal;white-space:normal;stroke-width:.3369px;text-transform:none;text-decoration-style:solid" d="m444.5 680.3h-1.974v-17.48h-0.1317q-4.014 0-6.206 2.084-2.194 2.106-2.194 5.922 0 1.93 0.6142 4.036t1.864 4.496h-4.014q-0.9432-2.303-1.404-4.453-0.4824-2.128-0.4824-4.122 0-5.724 3.421-8.95 3.443-3.224 9.475-3.224 5.879 0 9.389 3.158 3.509 3.158 3.509 8.424 0 4.694-3.18 7.391-3.18 2.72-8.687 2.72zm1.184-4.036q3.553-0.088 5.396-1.689 1.864-1.579 1.864-4.561 0-2.917-1.93-4.802-1.93-1.886-5.353-2.237z"/>
    <path style="font-variant-ligatures:normal;shape-padding:0;font-variant-alternates:normal;text-decoration-color:#000000;font-variant-position:normal;font-feature-settings:normal;text-indent:0;text-orientation:mixed;text-decoration-line:none;dominant-baseline:auto;font-variant-caps:normal;font-variant-numeric:normal;white-space:normal;stroke-width:.3369px;text-transform:none;text-decoration-style:solid" d="m440.5 687.3h15.22v4.036h-15.2q-3.312 0-4.871 1.162-1.557 1.184-1.557 3.64 0 2.851 1.996 4.363 2.018 1.514 5.767 1.514h13.89v4.057h-24.52v-4.057h3.686q-2.128-1.075-3.224-2.939-1.097-1.842-1.097-4.32 0-3.773 2.457-5.616 2.479-1.842 7.481-1.842z"/>
    <path style="font-variant-ligatures:normal;shape-padding:0;font-variant-alternates:normal;text-decoration-color:#000000;font-variant-position:normal;font-feature-settings:normal;text-indent:0;text-orientation:mixed;text-decoration-line:none;dominant-baseline:auto;font-variant-caps:normal;font-variant-numeric:normal;white-space:normal;stroke-width:.3369px;text-transform:none;text-decoration-style:solid" d="m454.9 731.3h-3.949q1.009-1.733 1.514-3.487 0.5043-1.755 0.5043-3.575 0-2.742-0.8992-4.1-0.8774-1.338-2.698-1.338-1.645 0-2.457 1.009-0.8115 1.009-1.579 5.022l-0.3071 1.623q-0.5703 3.005-2.281 4.54-1.711 1.557-4.453 1.557-3.64 0-5.702-2.588-2.04-2.588-2.04-7.193 0-1.82 0.3949-3.816 0.3729-1.996 1.14-4.32h4.169q-1.162 2.259-1.755 4.32-0.5702 2.062-0.5702 3.902 0 2.676 1.075 4.147 1.096 1.47 3.049 1.47 2.808 0 3.881-5.375l0.044-0.1755 0.3071-1.514q0.68-3.487 2.281-5.087 1.623-1.601 4.41-1.601 3.531 0 5.44 2.391 1.93 2.391 1.93 6.822 0 1.974-0.3729 3.794-0.351 1.82-1.075 3.575z"/>
    <path style="font-variant-ligatures:normal;shape-padding:0;font-variant-alternates:normal;text-decoration-color:#000000;font-variant-position:normal;font-feature-settings:normal;text-indent:0;text-orientation:mixed;text-decoration-line:none;dominant-baseline:auto;font-variant-caps:normal;font-variant-numeric:normal;white-space:normal;stroke-width:.3369px;text-transform:none;text-decoration-style:solid" d="m446.4 760.3h-15.22v-4.057h15.22q3.312 0 4.871-1.162 1.557-1.162 1.557-3.64 0-2.829-2.018-4.363-1.996-1.514-5.746-1.514h-13.89v-4.036h34.13v4.036h-13.25q2.106 1.075 3.18 2.917 1.097 1.842 1.097 4.363 0 3.751-2.479 5.594-2.457 1.864-7.456 1.864z"/>
  </g>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'svg-logo',
  data () {
    return {

    }
  },
  computed: {
    ...mapState([ 'homepage' ])
  },
  methods: {
    ...mapActions([ 'hideSubmenu' ])
  }
}
</script>

<style>

</style>
