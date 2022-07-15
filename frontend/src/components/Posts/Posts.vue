<template>
  <div class="posts">
    <Overlay v-for="post in posts" :key="post.id" :name="post.name" :publisher="post.publisher" :content="post.content" :photo="post.photo"/>
    <p v-if="posts.length === 0">Sijainnillasi ei ole postauksia</p>
  </div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
import Overlay from './Overlay.vue'
import authHeader from '@/helpers/auth';

export default {
    name: "Posts",
    data() {
        return {
            posts: []
        };
    },
    created() {
        axios.get(`${process.env.VUE_APP_API_URL}/posts/all`, { headers: authHeader() })
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

.posts {
  background-color: white;
  display: block;
  width: 70%;
  margin: 50px auto;
  height: 55vh;
  border-radius: 10px;
  overflow-y: scroll;
}
@media screen and (max-width: 600px) {
    .posts-container {
      width: 90%;
    }
    .posts {
      height: 65vh;
    }
  }
</style>
