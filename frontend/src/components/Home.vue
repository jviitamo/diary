<template>
  <div class="main-container">
      <div class="container">
          <div class="links">
            <router-link to="/" v-if="!isNotSigned()" :style="this.$route.fullPath === '/' ? {textDecorationLine: 'underline'} : {textDecorationLine: 'none'}">Postaukset</router-link>
            <router-link to="/createpost" v-if="!isNotSigned()" :style="this.$route.fullPath === '/createpost' ? {textDecorationLine: 'underline'} : {textDecorationLine: 'none'}">Luo postaus</router-link>
            <router-link to="/login" v-if="isNotSigned()" :style="this.$route.fullPath === '/login' ? {textDecorationLine: 'underline'} : {textDecorationLine: 'none'}">Kirjaudu</router-link>
            <router-link to="/signup" v-if="isNotSigned()" :style="this.$route.fullPath === '/signup' ? {textDecorationLine: 'underline'} : {textDecorationLine: 'none'}">Luo käyttäjä</router-link>
            <router-link to="/myinformation" v-if="!isNotSigned()" :style="this.$route.fullPath === '/myinformation' ? {textDecorationLine: 'underline'} : {textDecorationLine: 'none'}">Minun tietoni</router-link>
          </div>
        <router-view />
      </div>
  </div>
</template>

<script>

/* eslint-disable */
export default {
  name: 'Home',
  methods: {
    SignOut() {
      localStorage.removeItem('user');
      this.$router.push("/login")
    },
    isNotSigned() {
      return !localStorage.getItem('user')
    }
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
    .links > div {
      cursor: pointer;
    }
  }

</style>
