<template>
  <NavBar />
  <router-view />
</template>

<script>

import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>

@font-face {
    font-family: "Montserrat";
    src: local("Montserrat"),
    url(./fonts/Montserrat-Regular.ttf);
  }

#app {
  font-family: 'Montserrat';
  text-align: center;
  margin: 0;
  padding: 0;
  height: 100%;
  background-image: url('./assets/bg3.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed; 
}
</style>
