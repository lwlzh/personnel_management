<template>
  <div id="app">
    <IndexPage></IndexPage>
  </div>
</template>

<script>
import IndexPage from './components/IndexPage.vue'

export default {
  name: 'App',
  components: {
    IndexPage
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*{
  margin: 0px;
  padding: 0px;
}
</style>
