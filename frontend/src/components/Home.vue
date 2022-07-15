<template>
  <div class="main-container">
      <div class="container">
          <div class="links">
            <router-link to="/" v-if="isSigned()" :class="textStyling('/')">Postaukset</router-link>
            <router-link to="/createpost" v-if="isSigned()" :class="textStyling('/createpost')">Luo postaus</router-link>
            <router-link to="/login" v-if="!isSigned()" :class="textStyling('/login')">Kirjaudu</router-link>
            <router-link to="/signup" v-if="!isSigned()" :class="textStyling('/signup')">Luo käyttäjä</router-link>
            <router-link to="/myinformation" v-if="isSigned()" :class="textStyling('/myinformation')">Minun tietoni</router-link>
            <router-link to="/myposts" v-if="isSigned()" :class="textStyling('/myposts')">Minun postaukseni</router-link>
            <router-link to="/changelocation" v-if="isAdmin()" :class="textStyling('/changelocation')">Käyttäjien sijainnin hallinta</router-link>
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
    isAdmin() {
      return localStorage.getItem('admin')
    },
    isSigned() {
      return localStorage.getItem('user')
    },
    textStyling(path) {
      return this.$route.fullPath === path ? "underline" : "noline"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .underline {
      text-decoration-line: underline;
    }
    .noline {
      text-decoration-line: none;
    }
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
