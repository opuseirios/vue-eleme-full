<template>
  <div id="app">
    <home></home>
    <router-view/>
  </div>
</template>

<script>
import Home from "./views/home/home";

export default {
  components: {Home},
  name: 'App'
}
</script>

<style>

</style>
