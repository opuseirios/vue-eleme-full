<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Home from "./views/home/home";
import MainHeader from "./components/mainHeader/mainHeader";

export default {
  components: {
    MainHeader,
    Home},
  name: 'App'
}
</script>

<style>

</style>
