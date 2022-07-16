<template>
  <div class="post-container">
    <p>Sinun postauksesi</p>
    <div class="posts">
      <Overlay v-for="post in posts" :key="post.id" :name="post.name" :publisher="post.publisher" :content="post.content" :photo="post.photo"/>
        <p v-if="posts.length === 0">Sinulla ei ole postauksia</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
import Overlay from './Overlay.vue'
import authHeader from '@/helpers/auth';

export default {
    name: "MyPosts",
    data() {
        return {
            posts: []
        };
    },
    created() {
        axios.get(`${process.env.VUE_APP_API_URL}/posts/my-posts`, { headers: authHeader() })
            .then(response => {
              this.posts = response.data
            });
    },
    components: { Overlay }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

p {
  font-family: 'Montserrat';
  margin: 0;
  height: 10%;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.post-container {
  width: 70%;
  margin: 0 auto;
  padding: 0;
  height: 100%;
  background-color: white;
  font-family: 'Montserrat';
}
.posts {
  height: 85%;
  display: block;
  border-radius: 10px;
  overflow-y: scroll;
  margin: 0;
}
@media screen and (max-width: 600px) {
    .posts-container {
      width: 90%;
    }
  }

</style>
