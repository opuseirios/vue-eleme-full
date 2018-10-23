<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Home from "./views/home/home";

export default {
  components: {
    Home},
  name: 'App'
}
</script>

<style>
body{
  background: #F5F5F5;
}
</style>
