<template>
  <Home />
</template>

<script>

import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    Home
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
  min-height: 100%;
  background-image: url('./assets/bg3.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed; 
}

@media screen and (max-width: 600px) {
  #app {
    height: calc(100vh - 80px);
  }
}
</style>
