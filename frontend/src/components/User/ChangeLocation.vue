<template>
    <form>
        <select v-model="username" name="Kayttaja">
            <option value="" selected hidden disabled>Valitse käyttäjä</option>
            <option class="option" v-for="username in usernames" :value="username"  :key="username">{{ username }}</option>
        </select>
        <select v-model="location" name="Sijainti">
            <option value="" selected hidden disabled>Valitse sijainti</option>
            <option class="option" v-for="location in locations" :value="location"  :key="location">{{ location }}</option>
        </select>
      <button @click.prevent="SignUp(this.username, this.location)">Vaihda sijaintia</button>
    </form>
    <div :class="this.formSent ? 'success' : 'failure'">
      <p>{{ this.showMessage }}</p>
    </div>
</template>

<script>

import axios from 'axios'
import authHeader from '@/helpers/auth';

/* eslint-disable */
export default {
  name: 'ChangeLocation',
  data() {
    return {
        username: '',
        location: '',
        usernames: [],
        locations: [],
        formSent: false,
        showMessage: "",
    }
  },
  methods: {
    async SignUp(username, location) {
      if (username === "" || location === "") {
        this.formSent = false
        this.showMessage = "Täytäthän kaikki kentät"
      } else {
            try {
              await axios({
                  method: 'post',
                  url: `${process.env.VUE_APP_API_URL}/users/changelocation`,
                  data: {
                      "username": username, 
                      "location": location
                  }
              })
              this.formSent = true
              this.username = ""
              this.location = ""
              this.showMessage = "Vaihdoit onnistuneesti käyttäjän sijaintia!"
            } catch (error) {
              this.showMessage = error.response.data
              this.formSent = false
            }
      }
      setTimeout(() => {
            this.showMessage = ""
        }, 5000)
    }
  },
  async created() {
    const responseLocations = await axios.get(`${process.env.VUE_APP_API_URL}/posts/locations`, { headers: authHeader() })
    const dataLocations = await responseLocations.data
    this.locations = dataLocations.map(location => location.locationname)

    const responseUsers = await axios.get(`${process.env.VUE_APP_API_URL}/users/nolocation`, { headers: authHeader() })
    const dataUsers = await responseUsers.data
    this.usernames = dataUsers.map(user => user.username)
    
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
  input, label, select, .option {
    border-radius: 10px;
    padding: 20px;
    border: 1px solid black;
    font-family: 'Montserrat';
    font-size: 16px;
  }

</style>
