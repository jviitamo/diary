<template>
    <div class="form-container">
      <form>
        <input type="text" v-model="name" placeholder="Postauksen nimi">
        <input type="text" v-model="publisher" placeholder="Julkaisijan nimi">
        <textarea v-model="content" placeholder="Sisältö" rows="7" cols="70"></textarea>
        <input type="file" id="file" v-on:change="onFileChange" name="photo" accept="image/png, image/jpeg">
        <button @click.prevent="sendPost(this.name, this.publisher, this.content, this.file)">Lähetä postaus</button>
      </form>
      <div :class="this.formSent ? 'success' : 'failure'">
        <p>{{ this.showMessage }}</p>
      </div>
    </div>
</template>

<script>

import axios from 'axios'
import authHeader from '@/helpers/auth'

/* eslint-disable */
export default {
  name: 'CreatePost',
  props: {
    msg: String
  },
  data() {
    return {
      name: "",
      content: "",
      publisher: "",
      file: null,
      showMessage: "",
      formSent: false,
    }
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0]
    },
    async sendFile(file) {
      const formData = new FormData();
      // Update the formData object
      formData.append('title', file.filename);
      formData.append('file', file);

      // Details of the uploaded file
      let response = await axios({
        method: "post",
        url: `${process.env.VUE_APP_API_URL}/posts/upload`,
        headers: authHeader(),
        data: formData
      })
      const data = await response.data
      
      return data.path
    },
    async sendPost(name, publisher, content, file) {

      const user = JSON.parse(localStorage.getItem('user'))

      if (name === "" || content === "" || publisher === "" || file === null) {
        this.formSent = false
        this.showMessage = "Täytäthän kaikki kentät"
      } else if (typeof user.location === "undefined") {
          this.showMessage === "Tarvitset sijainnin lisätäksesi postauksen"
      } else {
        this.showMessage = "Ladataan tiedostoa..."
        const path = await this.sendFile(file)
        try {
          const response = await axios({
            method: 'post',
            url: `${process.env.VUE_APP_API_URL}/posts/?location=${user.location}&username=${user.username}`,
            data: {
                "name": name, 
                "publisher": publisher, 
                "content": content,
                "photo": path
            },
            headers: authHeader()
          })
          const data = await response.data
          console.log(data)

          this.formSent = true
          this.name = ""
          this.publisher = ""
          this.content = ""
          this.file = null
          this.showMessage = "Postaus lähetetty onnistuneesti!"
        } catch (error) {
          this.showMessage = error
          this.formSent = false
        }
      }
      setTimeout(() => {
            this.showMessage = ""
        }, 5000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .success {
    color: green;
  }
  .failure {
    color: red;
  }
  .form-container {
    width: 100%;
    height: 100%;
    font-family: 'Montserrat';
  }
  .form-container > div {
    height: 10%;
  }
  form {
    height: 80%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:flex-start;
  }
  form *{
    width: 70%;
    box-sizing: border-box;
    font-size: 18px;
  }

  button {
    padding: 1em;
    border-radius: 10px;
    background-color: #FDCA3B;
    border: 0;
    color: black;
    cursor: pointer;
  }
  button:hover {
    opacity: 0.7;
  }
  input, textarea {
    border-radius: 10px;
    padding: 20px;
    margin: 10px;
    border: 1px solid black;
    font-family: 'Montserrat';
    font-size: 16px;
  }

</style>
