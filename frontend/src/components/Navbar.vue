<template>
    <div class="links">
        <router-link class="links-desktop" v-for="route in getAvailableRoutes()" :key="route.name" :to="route.path" :class="textStyling(route.path)">{{ route.name }}</router-link>
        <div class="links-mobile" @click="showPopup()">{{ $route.name }}</div>
    </div>
    <div class="overlay" :style="[!this.Popup ? 'display: none' : '']">
        <div class="overlay-content">
            <router-link v-for="route in getAvailableRoutes()" :key="route.name" @click="showPopup()" :to="route.path" :class="textStyling(route.path)">{{ route.name }}</router-link>
        </div>
    </div>
</template>

<script>


/* eslint-disable */
export default {
  name: 'Navbar',
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
    .links {
        width: 75%;
        height: 10%;
        margin: 20px auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #D3D3D3;
        border-radius: 2em;
    }
    .links * {
      display: flex;
      justify-content: space-evenly;
      width: 90%;
      font-family: 'Montserrat';
    }
    .links-mobile {
        display: none;
        font-size: 24px;
        color: black;
    }
    .links-desktop {
        color: black;
        font-size: 16px;
    }
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1;
    }
    .overlay-content {
        background-color: white;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: 'Montserrat';
        font-size: 24px;
    }
    .overlay-content * {
      padding: 40px;
    }
    .closebutton {
        position: relative;
        right: 30px;
        top: 20px;
        text-align: right;
        cursor: pointer;
    }

  @media screen and (max-width: 600px) {
   .links-desktop {
     display: none;
   }
   .links-mobile {
     display: flex;
   }
  }


</style>
