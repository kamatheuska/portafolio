<template>
  <div class="Welcome container grid">
    <h1 class="grid__row">Apps for FreeCodeCamp</h1>
    <div class="Welcome__app1 box">
      <router-link to="weather">Weatherzilla</router-link>
    </div>
    <div class="Welcome__app2 box">
      <router-link to="rqmachine">Random Quote Machine</router-link>
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
  grid-template-columns: auto auto;
  grid-template-rows: 4rem auto auto;
}
</style>
