<template>
  <div class="nav-container">
      <router-link to="/" :style="this.$route.fullPath === '/' ? {textDecorationLine: 'underline'} : {textDecorationLine: 'none'}">Postaukset</router-link>
      <router-link to="/createpost" :style="this.$route.fullPath === '/createpost' ? {textDecorationLine: 'underline'} : {textDecorationLine: 'none'}">Luo postaus</router-link>
  </div>
  <div class="mobilemenu">
    <img src="../../public/dashboard.png">
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .nav-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 70px;
        justify-content: space-around;
        background-color: #D3D3D3;
        align-items: center;
        border-bottom: 1px solid black;
    }
    .nav-container * {
        color: black;
        text-decoration-line: none;
    }
</style>
