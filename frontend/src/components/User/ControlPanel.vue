<template>
  <div class="panel-container">
    <div :class="this.formSent ? 'success' : 'failure'">
      <p>{{ this.showMessage }}</p>
    </div>
    <section class="content">
      <Popup title="Anna uusille käyttäjille sijainti">
        <form>
          <select v-model="username" name="Kayttaja">
              <option value="" selected hidden disabled>Valitse käyttäjä</option>
              <option class="option" v-for="user in UsersWithNoLocation" :value="user.username"  :key="user.username">{{ user.username }}</option>
          </select>
          <select v-model="location" name="Sijainti">
              <option value="" selected hidden disabled>Valitse sijainti</option>
              <option class="option" v-for="location in allLocations" :value="location.locationname"  :key="location.locationname">{{ location.locationname }}</option>
          </select>
          <button @click.prevent="changeLocation(this.username, this.location)">Vaihda sijaintia</button>
        </form>
      </Popup>
      <Popup title="Lisää uusi sijainti">
        <form>
          <input type="text" v-model="locationName" placeholder="Sijainnin nimi"><br>
          <input type="text" v-model="locationAddress" placeholder="Sijainnin osoite"><br>
          <button @click.prevent="addLocation(this.locationName, this.locationAddress)">Luo sijainti</button>
        </form>
      </Popup>
      <Popup title="Näytä kaikki käyttäjät">
        <table>
          <tr>
            <td>Käyttäjänimi</td>
            <td>Sijainti</td>
          </tr>
          <tr v-for="user in allUsers" :key="user.username">
            <td>{{ user.username }}</td>
            <td>{{ user.location }}</td>
          </tr>
        </table>
      </Popup>
      <Popup title="Näytä kaikki sijainnit">
        <table>
          <tr>
            <td>Sijainti</td>
            <td>Osoite</td>
            <td>Pääkäyttäjä</td>
          </tr>
          <tr v-for="location in allLocations" :key="location.locationname">
            <td>{{ location.locationname }}</td>
            <td>{{ location.address }}</td>
            <td>{{ location.locationadmin }}</td>
          </tr>
        </table>
      </Popup>
    </section>
  </div>
</template>

<script>

import axios from 'axios'
import authHeader from '@/helpers/auth';
import Popup from './Popup.vue'

/* eslint-disable */
export default {
  name: 'ControlPanel',
  components: {
    Popup
  },
  data() {
    return {
        username: '',
        location: '',
        usernames: [],
        locations: [],
        formSent: false,
        showMessage: '',
        locationAddress: '',
        locationName: '',
        UsersWithNoLocation: [],
        allLocations: [],
        allUsers: []
    }
  },
  methods: {
    async changeLocation(username, location) {
      if (username === "" || location === "") {
        this.formSent = false
        this.showMessage = "Täytäthän kaikki kentät"
      } else {
            try {
              await axios({
                  method: 'put',
                  url: `${process.env.VUE_APP_API_URL}/users/setlocation`,
                  data: {
                      "username": username, 
                      "location": location
                  },
                  headers: authHeader()
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
    },
    async addLocation(locationName, locationAddress) {
      if (locationName === "" || locationAddress === "") {
        this.formSent = false
        this.showMessage = "Täytäthän kaikki kentät"
      } else {
            try {
              await axios({
                  method: 'post',
                  url: `${process.env.VUE_APP_API_URL}/locations/`,
                  data: {
                      "name": locationName, 
                      "address": locationAddress
                  },
                  headers: authHeader()
              })
              this.formSent = true
              this.username = ""
              this.location = ""
              this.showMessage = "Lisäsit onnistuneesti uuden sijainnin!"
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
    const responseLocations = await axios.get(`${process.env.VUE_APP_API_URL}/locations/`, { headers: authHeader() })
    this.allLocations = await responseLocations.data

    const responseUsersWithNoLocation = await axios.get(`${process.env.VUE_APP_API_URL}/users/?location=null`, { headers: authHeader() })
    this.UsersWithNoLocation = await responseUsersWithNoLocation.data

    const responseAllUsers = await axios.get(`${process.env.VUE_APP_API_URL}/users/`, { headers: authHeader() })
    this.allUsers = await responseAllUsers.data
  }
}
</script>

<style scoped>

  .panel-container {
    height: 100%;
  }
  .content {
    height: 90%;
    display: block;
    overflow-y: scroll;
  }
  .success {
    color: green;
    height: 5%;
  }
  .failure {
    color: red;
    height: 5%;
  }
  form {
    width: 100%;
    font-family: 'Montserrat';
  }
  table {
    width: 50%;
    margin: 0 auto;
  }
  form *, table *{
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
  td {
    border-bottom: 1px solid black;
    width: 20%;
  }

</style>
