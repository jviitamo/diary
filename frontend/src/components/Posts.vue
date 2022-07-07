<template>
  <section class="posts-container">
    <h1>Mökkipäiväkirjan postaukset</h1>
    <div class="posts-list">
      <Overlay v-for="post in posts" :key="post.id" :name="post.name" :publisher="post.publisher" :content="post.content" :photo="post.photo"/>
    </div>
  </section>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
import Overlay from './Overlay.vue'

export default {
    name: "Posts",
    data() {
        return {
            posts: []
        };
    },
    created() {
        axios.get(process.env.VUE_APP_GET_POSTS)
            .then(response => {
              this.posts = response.data
              console.log(response.data)
            });
    },
    components: { Overlay }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.posts-container {
  background-color: white;
  width: 70%;
  margin: 100px auto;
  height: 70vh;
  border-radius: 10px;
}
.posts-list {
    display: block;
    height: 50vh;
    overflow-y: scroll;
}
  h1 {
    margin: 0;
    padding: 50px 0;
  }
</style>
