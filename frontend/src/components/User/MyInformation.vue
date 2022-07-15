<template>
  <div class="my-information">
        <div v-if="user !== null">
            <div>
                <p>Käyttänimi: {{ user.username }}</p>
                <p v-if="user.location !== null">Sijainti: {{ user.location }}</p>
                <p v-else>Sinulle ei ole määritetty sijaintia</p>
            </div>
            <p>Vaihda salasana:</p>
            <input type="password" v-model="old_password" placeholder="Vanha salasana"><br>
            <input type="password" v-model="new_password" placeholder="Uusi salasana"><br>
            <p>{{ this.showMessage }}</p>
            <button @click.prevent="ChangePassword(old_password, new_password)">Vaihda salasana</button>
        </div>
        <button @click="SignOut()">Kirjaudu ulos</button>
  </div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
import authHeader from '@/helpers/auth';

export default {
    name: "MyInformation",
    data() {
        return {
            user: null,
            old_password: '',
            new_password: '',
            showMessage: ''
        };
    },
    methods: {
        SignOut() {
            localStorage.removeItem('user');
            this.$router.push("/login")
        },
        async ChangePassword(old_password, new_password) {
            if (new_password !== '' && new_password !== '') {
                try {
                    const response = await axios({
                    method: "post",
                    url: `${process.env.VUE_APP_API_URL}/users/newpassword`,
                    headers: authHeader(), 
                    data: { 
                        "old_password": old_password,
                        "new_password": new_password
                    }
                })
                    this.showMessage = 'Salasana vaihdettu onnistuneesti'
                } catch(error) {
                    this.showMessage = 'Salasana ei täsmää'
                }
            } else {
                this.showMessage = 'Täytä salasanakenttä'
            }
            setTimeout(() => {
            this.showMessage = ""
            }, 5000)
        }
    },
    async created() {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/users/user`, { headers: authHeader() })
        const user = await response.data
        this.user = user
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
