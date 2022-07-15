<template>
  <div class="main-container">
      <div class="container">
          <div class="links">
            <div @click="showPopup()" class="showMobileMenu">{{ currentLocation }}</div>
            <div class="links-desktop">
              <router-link to="/" v-if="isSigned()" :class="textStyling('/')">Postaukset</router-link>
              <router-link to="/createpost" v-if="isSigned()" :class="textStyling('/createpost')">Luo</router-link>
              <router-link to="/login" v-if="!isSigned()" :class="textStyling('/login')">Kirjaudu</router-link>
              <router-link to="/signup" v-if="!isSigned()" :class="textStyling('/signup')">Luo käyttäjä</router-link>
              <router-link to="/myinformation" v-if="isSigned()" :class="textStyling('/myinformation')">Tietoni</router-link>
              <router-link to="/myposts" v-if="isSigned()" :class="textStyling('/myposts')">Postaukseni</router-link>
              <router-link to="/changelocation" v-if="isAdmin()" :class="textStyling('/changelocation')">Hallinta</router-link>
            </div>
          </div>
          <div class="links-mobile" :style="[!this.Popup ? 'display: none' : '']">
            <div class="overlay">
              <router-link to="/" @click="closePopUp('Postaukset')" v-if="isSigned()" :class="textStyling('/')">Postaukset</router-link>
              <router-link to="/createpost" @click="closePopUp('Luo')" v-if="isSigned()" :class="textStyling('/createpost')">Luo</router-link>
              <router-link to="/login" @click="closePopUp('Kirjaudu')" v-if="!isSigned()" :class="textStyling('/login')">Kirjaudu</router-link>
              <router-link to="/signup" @click="closePopUp('Luo käyttäjä')" v-if="!isSigned()" :class="textStyling('/signup')">Luo käyttäjä</router-link>
              <router-link to="/myinformation" @click="closePopUp('Tietoni')"  v-if="isSigned()" :class="textStyling('/myinformation')">Tietoni</router-link>
              <router-link to="/myposts" @click="closePopUp('Postaukseni')" v-if="isSigned()" :class="textStyling('/myposts')">Postaukseni</router-link>
              <router-link to="/changelocation" @click="closePopUp('Hallinta')" v-if="isAdmin()" :class="textStyling('/changelocation')">Hallinta</router-link>
            </div>
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
    },
    showPopup() {
      this.Popup = true
    },
    closePopUp(location) {
      this.Popup = false
      this.currentLocation = location
    }
  },
  data() {
    return {
      Popup: false,
      currentLocation: 'Postaukset'
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
        width: 80vw;
        height: 80vh;
        border-radius: 10px;
    }
    .container * {
        color: black;
    }
    .links {
        border-radius: 2em;
        font-size: 16px;
        font-family: 'Montserrat';
        background-color: #D3D3D3;
        width: 75%;
        margin: 50px auto;
    }
    .links-desktop {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        padding: 20px 0;
        margin: 0;
    }

    .links-mobile {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: black;
        z-index: 1;
        background-color:white;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-family: 'Montserrat';
        font-size: 24px;
    }
    .links-mobile * {
      padding: 40px;
    }
    .showMobileMenu {
      display: none;
      text-align: center;
      padding: 20px 0;
      cursor: pointer;
    }
    .showMobileMenu:hover {
      text-decoration-line: underline; 
    }
    .overlay {
        background-color: white;
        height: 100%;
        width: 100%;
        border-radius: 2em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .closebutton {
        position: relative;
        right: 30px;
        top: 20px;
        text-align: right;
        cursor: pointer;
    }


  @media screen and (max-width: 800px) {
    .container {
      width: 90vw;
      height: 90vh
    }
    .links {
        width: 80%;
    }
    .links-desktop > div {
      cursor: pointer;
    }
  }
  @media screen and (max-width: 600px) {

    .showMobileMenu {
      display: block;
    }
   .links-desktop {
     display: none;
   }
   .links-mobile {
     display: flex;
   }

  }


</style>
