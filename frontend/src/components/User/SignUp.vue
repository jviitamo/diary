<template>
    <form>
      <input type="text" v-model="username" placeholder="Käyttäjänimi"><br>
      <input type="password" v-model="password" placeholder="Salasana"><br>
      <button @click.prevent="SignUp(this.username, this.password)">Luo käyttäjä</button>
    </form>
    <div :class="this.formSent ? 'success' : 'failure'">
      <p>{{ this.showMessage }}</p>
    </div>
</template>

<script>

import axios from 'axios'

/* eslint-disable */
export default {
  name: 'SignUp',
  data() {
    return {
      username: "",
      password: "",
      formSent: false,
      showMessage: ""
    }
  },
  methods: {
    async SignUp(username, password) {
      if (username === "" || password === "") {
        this.formSent = false
        this.showMessage = "Täytäthän kaikki kentät"
      } else {
            try {
              await axios({
                  method: 'post',
                  url: `${process.env.VUE_APP_API_URL}/users/signup`,
                  data: {
                      "username": username, 
                      "password": password
                  }
              })
              this.formSent = true
              this.username = ""
              this.password = ""
              this.showMessage = "Loit onnistuneesti uuden käyttäjän!"
            } catch (error) {
              this.showMessage = error.response.data
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
  input {
    border-radius: 10px;
    padding: 20px;
    border: 1px solid black;
    font-family: 'Montserrat';
    font-size: 16px;
  }

</style>
