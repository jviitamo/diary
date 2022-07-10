<template>
  <div class="my-information">
        <div v-if="user !== null">
            <p>Käyttänimi: {{ user.username }}</p>
            <p>Vaihda salasana:</p>
            <input type="password" v-model="password" placeholder="Uusi salasana"><br>
            <button @click.prevent="ChangePassword(this.password)">Vaihda salasana</button>
        </div>
        <button @click="SignOut()">Kirjaudu ulos</button>
  </div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
import authHeader from '../helpers/auth'

export default {
    name: "MyInformation",
    data() {
        return {
            user: null,
            password: ''
        };
    },
    methods: {
        SignOut() {
            localStorage.removeItem('user');
            this.$router.push("/login")
        },
        async ChangePassword(password) {
            if (password !== null) {
                const response = await axios({
                method: "post",
                url: process.env.VUE_APP_NEWPASSWORD,
                headers: authHeader(), 
                data: { 
                    "password": password 
                }
            })
            const user = await response.data
            console.log(user)
            }
        }
    },
    async created() {
        const response = await axios.get(process.env.VUE_APP_USER, { headers: authHeader() })
        const user = await response.data
        this.user = user
        console.log(this.user.username)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .my-information {
        font-family: 'Montserrat';
    }
    .my-information * {
        margin-bottom: 30px;
    }

    button {
        padding: 1em;
        border-radius: 10px;
        background-color: #FDCA3B;
        border: 0;
        color: black;
        cursor: pointer;
        font-family: 'Montserrat';
    }
    button:hover {
        opacity: 0.7;
    }
</style>
