<template>
  <div class="post-container">
    <p>Alueen {{ userLocation }} postaukset</p>
    <div class="posts">
      <Overlay v-for="post in posts" :key="post.id" :name="post.name" :publisher="post.publisher" :content="post.content" :photo="post.photo"/>
      <p v-if="posts.length === 0">Sijainnillasi ei ole postauksia</p>
    </div>
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
            posts: [],
            userLocation: ''
        };
    },
    async created() {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/users/user`, { headers: authHeader() })
        this.userLocation= await response.data.location

        const postsResponse = await axios.get(`${process.env.VUE_APP_API_URL}/posts/all`, { headers: authHeader() })
        this.posts = postsResponse.data
    },
    components: { Overlay }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

p {
  font-family: 'Montserrat';
  margin: 0;
  padding: 0;
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
