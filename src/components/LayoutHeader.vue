<template>
    <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand :to="{ name: 'home' }">Inagata Guest</b-navbar-brand>
        <b-navbar-toggle v-if="isAuth" target="nav-collapse"></b-navbar-toggle>
        <b-collapse v-if="isAuth" id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item class="my-1" :to="{name: 'home'}">Dashboard</b-nav-item>
                <b-nav-item class="my-1" :to="{name: 'pegawai'}">Pegawai</b-nav-item>
                <b-nav-item class="my-1" :to="{name: 'tamu'}">Tamu</b-nav-item>
                <b-nav-item class="my-1" :to="{name: 'setting'}">Setting</b-nav-item>
                <b-nav-item>
                    <b-button class="btn-sm px-4 mb-1" variant="light" :to="{name: 'logout'}">Logout</b-button>
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
        <b-navbar-toggle v-if="!isAuth" target="nav-collapse1"></b-navbar-toggle>
        <b-collapse v-if="!isAuth" id="nav-collapse1" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item class="my-1" :to="{name: 'pegawai'}">Pegawai</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'LayoutHeader',
    data() {
        return {

        }
    }, 
    computed: {
        ...mapGetters({
            isAuth: 'auth/isAuth',
            token: 'auth/getToken',
            url: 'api/getUrl',
            user: 'auth/getUser',
        })
    }
}
</script>