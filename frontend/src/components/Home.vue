<template>
  <div class="main-container">
      <div class="container">
          <div class="links">
            <div @click="showPopup()" class="showMobileMenu">{{ $route.name }}</div>
            <div class="links-desktop">
                <router-link v-for="route in getAvailableRoutes()" :key="route.name" :to="route.path" :class="textStyling(route.path)">{{ route.name }}</router-link>
            </div>
          </div>
          <div class="links-mobile" :style="[!this.Popup ? 'display: none' : '']">
            <div class="overlay">
              <router-link v-for="route in getAvailableRoutes()" :key="route.name" @click="showPopup()" :to="route.path" :class="textStyling(route.path)">{{ route.name }}</router-link>
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
      this.Popup = !this.Popup
    },
    getAvailableRoutes() {
      const getAvailable = []
      const routes = this.$router.options.routes
      if (this.isAdmin()) {
        routes.filter(route => route.type === 'admin').map(route => getAvailable.push(route))
      }
      if (this.isSigned()) {
        routes.filter(route => route.type === 'private').map(route => getAvailable.push(route))
      } else {
        this.publicRoutes = routes.filter(route => route.type === 'public').map(route => getAvailable.push(route))
      }
      return getAvailable
    }
  },
  data() {
    return {
      Popup: false,
      lockedRoutes: [],
      publicRoutes: [],
      adminRoutes: []
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
