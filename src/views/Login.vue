<template>
    <b-container fluid 
                 class="bg-primary position-relative">
        <h2 class="text-white pt-5">Login Pegawai</h2>
        <b-row>
            <b-col  md="6" 
                    offset-md="3" 
                    class="text-dark rounded p-3 text-left shadow position-relative mb-5" 
                    style="background-color: white; bottom: -80px">
                <b-form>
                    <b-form-group 
                        label="username"
                        label-for="form_username">
                    <b-form-input type="text" v-model="username"></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="password"
                        label-for="form_password">
                        <b-form-input type="password" v-model="password"></b-form-input>
                    </b-form-group>
                    <p><a href="">Lupa Password ?</a></p>
                    <b-button variant="primary" class="w-100" @click="onSubmit">Masuk</b-button>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
    data() {
        return {
            name: 'Login',
            username: "",
            password: "",
        }
    },
    watch: {
        "$route.name": {
            deep: true,
            immediate: true,
            handler: function(value) {
                if(value === 'logout') {
                    localStorage.removeItem("token")
                    window.location.href = '/login'
                } else {
                    console.log('ini login')
                }
            }
        }
    },
    computed: {
        ...mapGetters({
            token: 'auth/getToken',
            url: 'api/getUrl'
        })
    },
    methods: {
        ...mapMutations("auth", ["set_user", "set_token"]),
        onSubmit() {
            this.$http.post(`${this.url}login`, {
                username: this.username,
                password: this.password
            }).then((response) => {
                if(response.data.success === true) {
                    alert('Berhasil Login')
                    this.set_user = response.data.data
                    localStorage.setItem("token", response.data.data.api_token)
                    console.log(response)
                    window.location.href = '/'
                } else {
                    alert('Berhasil Login')
                    console.log(response)
                }
            })
        }
    }
}
</script>