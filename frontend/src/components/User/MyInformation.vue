<template>
    <div v-if="user !== null" class="my-information">
        <table>
            <tr>
                <td>Käyttänimi</td>
                <td class="bold">{{ user.username }}</td>
            </tr>
            <tr>
                <td>Sijainti</td>
                <td v-if="user.location !== null" class="bold">{{ user.location }}</td>
                <td v-else class="bold">Sinulle ei ole määritetty sijaintia</td>
            </tr>
        </table>
        <div class="changePassword">
            <p>Vaihda salasana:</p>
            <input type="password" v-model="old_password" placeholder="Vanha salasana"><br>
            <input type="password" v-model="new_password" placeholder="Uusi salasana"><br>
            <p>{{ this.showMessage }}</p>
            <button @click.prevent="ChangePassword(old_password, new_password)">Vaihda salasana</button>
        </div>
        <button class="signout" @click="SignOut()">Kirjaudu ulos</button>
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
            localStorage.removeItem('admin');
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
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        height: 100%;
        font-size: 24px;
    }
    table {
        flex-basis: 20%;
    }
    .changePassword {
        flex-basis: 70%;
        width: 100%;
    }
    .changePassword > input, button {
        border-radius: 10px;
        width: 80%;
        max-width: 500px;
        padding: 20px;
        margin-top: 10px;
        border: 1px solid black;
        font-family: 'Montserrat';
        font-size: 16px;
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

    .signout {
        position: relative;
        bottom: 10px;
    }
    button:hover {
        opacity: 0.7;
    }
    td {
        padding: 20px;
        margin: 0;
        border-bottom: 1px solid black;
    }
    tr {
        border: 1px solid black;
    }
    .bold {
        font-weight: bold;
    }
</style>
