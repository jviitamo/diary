<template>
  <div class="main-container">
      <div class="container">
          <div class="links">
            <router-link to="/" :style="this.$route.fullPath === '/' ? {textDecorationLine: 'underline'} : {textDecorationLine: 'none'}">Postaukset</router-link>
            <router-link to="/createpost" :style="this.$route.fullPath === '/createpost' ? {textDecorationLine: 'underline'} : {textDecorationLine: 'none'}">Luo postaus</router-link>
          </div>
        <router-view />
      </div>
  </div>
</template>

<script>

/* eslint-disable */
export default {
  name: 'Home',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .main-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
    }
    .container {
        background-color: white;
        width: 70vw;
        height: 80vh;
        border-radius: 10px;
    }
    .container * {
        color: black;
        text-decoration-line: none;
    }
    .links {
        display: flex;
        justify-content: space-evenly;
        font-size: 24px;
        font-family: 'Montserrat';
        background-color: #D3D3D3;
        padding: 20px;
        border-radius: 2em;
        width: 65%;
        margin: 50px auto;
    }


  @media screen and (max-width: 600px) {
    .container {
      width: 90vw;
      height: 90vh
    }
    .links {
        font-size: 16px;
        width: 80%;
        margin: 20px auto;  
    }
  }

</style>
