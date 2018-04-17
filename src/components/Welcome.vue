<template>
  <div class="Welcome grid">
    <div class="grid__row">
      <h1>APPS FOR FREECODECAMP</h1>
      <h5>IN CONSTRUCTION</h5>
    </div>
    <div class="Welcome__app1 box">
      <router-link to="weather"><h3>Weatherzilla</h3></router-link>
    </div>
    <div class="Welcome__app2 box">
      <router-link to="rqmachine"><h3>Random Quote Machine</h3></router-link>
    </div>
    <div class="Welcome__app3 box">
      <router-link to="wikiviewer"><h3>Wikipedia Viewer</h3></router-link>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style>
.Welcome {
  text-align: center;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 4.5rem repeat(2, 1fr);
  align-items: center;
  justify-items: center;
}
.Welcome .box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
  width: 80%;
}
@media only screen
  and (max-device-width: 520px)
  and (orientation: portrait) {
    .Welcome {
      grid-template-columns: auto;
      grid-template-rows: repeat(4, auto);
      grid-gap: 0;
    }
  }

@media only screen
  and (min-device-width: 540px)
  and (max-device-width: 820px)
  and (orientation: landscape) {
    .Welcome {
      grid-template-columns: repeat(3, auto);
      grid-template-rows: repeat(3, auto);
      grid-gap: 0;
    }
  }
</style>
