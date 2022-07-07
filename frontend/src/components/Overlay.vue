<template>
    <div class="posts" @click="showPopup()">
      <p class="post-name">{{ name }}</p>
      <p>{{ publisher }}</p>
    </div> 
    <div class="overlay-container" :style="[!this.Popup ? 'display: none' : '']">
      <div class="overlay">
          <div @click="showPopup()" class="closebutton">X</div>
          <h2>{{ name }}</h2>
          <p class="publisher">{{ publisher }}</p>
          <p>{{ content }}</p>
          <img :src="`/photos/${photo}`">
      </div>
  </div>
</template>

<script>

/* eslint-disable */
export default {
  name: 'CompetenceBall',
  props: {
    name: String,
    publisher: String,
    content: String,
    photo: String
  },
  // state
  data() {
    return {
      Popup: false
    }
  },
  // actions
  methods: {
    showPopup() {
      this.Popup = !this.Popup
    }
  }
}
</script>

<style scoped>
    .posts {
      background-color: #FDCA3B;
      border-radius: 10px;
      width: 70%;
      margin: 10px auto 30px auto;
      padding: 20px;
      cursor: pointer;
    }
    .publisher {
      text-decoration-line: underline;
    }
    .post-name {
      font-size: 24px;
    }
    .posts:hover {
        opacity: 0.7
    }
    .overlay-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: black;
        z-index: 1;
        background-color:rgba(0,0,0,.75);
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .overlay {
        background-color: white;
        opacity: 1 !important;
        height: 90%;
        width: 90%;
        border-radius: 2em;
        display: block;
        overflow-y: scroll;
        overflow-wrap: break-word;
    }
    .closebutton {
        position: relative;
        right: 30px;
        top: 20px;
        text-align: right;
        cursor: pointer;
    }
    .overlay h2, p{
      width: 70%;
      margin-left: auto;
      margin-right: auto;
    }
    .closebutton:hover {
        opacity: 0.7;
    }
    .overlay img {
      width: 70%;
    }

    @media screen and (max-width: 600px) {
    .posts {
      height: 50px;
    }
    .posts * {
      margin: auto;
      padding: auto;
    }
  }

</style>
