<template>
    <form>
      <input type="text" v-model="name" placeholder="Postauksen nimi"><br>
      <input type="text" v-model="publisher" placeholder="Julkaisijan nimi"><br>
      <textarea v-model="content" placeholder="Sisältö" rows="7" cols="70"></textarea>
      <input type="file" id="file" v-on:change="onFileChange" name="photo" accept="image/png, image/jpeg">
      <button @click.prevent="sendPost(this.name, this.publisher, this.content, this.file)">Lähetä postaus</button>
    </form>
    <div :class="this.formSent ? 'success' : 'failure'">
      <p>{{ this.showMessage }}</p>
    </div>
</template>

<script>

import axios from 'axios'

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
      let response = await axios.post(process.env.VUE_APP_UPLOAD, formData)
      const data = await response.data
      console.log(data.path)

      return data.path
    },
    async sendPost(name, publisher, content, file) {

      if (name === "" || content === "" || publisher === "" || file === null) {
        this.formSent = false
        this.showMessage = "Täytäthän kaikki kentät"
      } else {
        const path = await this.sendFile(file)
        try {
          const response = await axios({
            method: 'post',
            url: process.env.VUE_APP_SEND_POST,
            data: {
                "name": name, 
                "publisher": publisher, 
                "content": content,
                "photo": path
            }
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
        setTimeout(() => {
            this.showMessage = ""
        }, 5000)
      }
    }
  },
   created() {
    axios.get(process.env.VUE_APP_GET_POSTS)
        .then(response => console.log(response.data))
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
  form {
    width: 100%;
    font-family: 'Montserrat';
  }
  form *{
    width: 70%;
    box-sizing: border-box;
    margin: 5px;
    font-size: 18px;
  }
  form > div {
    text-align: center;
    padding-bottom: 50px;
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
    border: 1px solid black;
    font-family: 'Montserrat';
    font-size: 16px;
  }
  h1 {
    padding: 30px;
  }

</style>
