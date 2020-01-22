<template>
    <b-container>
        <h3>Tamu dengan nama {{ nama }}</h3>
        <b-row>
            <b-col>
                <p class="font-weight-bold">Nama <span class="font-weight-normal">{{ nama }}</span></p>
                <p class="font-weight-bold">Jenis Kelamin <span class="font-weight-normal">{{ jenis_kelamin }}</span></p>
                <p class="font-weight-bold">Umur <span class="font-weight-normal">{{ umur }}</span></p>
                <p class="font-weight-bold">Alamat <span class="font-weight-normal">{{ alamat }}</span></p>
                <p class="font-weight-bold">instansi <span class="font-weight-normal">{{ instansi }}</span></p>
                <p class="font-weight-bold">nomor hp <span class="font-weight-normal">{{ no_hp }}</span></p>
                <p class="font-weight-bold">Tujuan <span class="font-weight-normal">{{ tujuan }}</span></p>
                <p class="font-weight-bold">Waktu bertamu <span class="font-weight-normal">{{ created_at }}</span></p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            nama: "",
            jenis_kelamin: "",
            umur: "",
            alamat: "",
            instansi: "",
            no_hp: "",
            tujuan: "",
            created_at: "",
        }
    }, 
    watch: {
        "$route.params.id": {
            deep: true,
            immediate: true,
            handler: function(value) {
                this.$http.get(`${this.url}tamu/${value}`, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                }).then((response) => {
                    this.nama = response.data.data.nama
                    this.jenis_kelamin = response.data.data.jenis_kelamin
                    this.umur = response.data.data.umur
                    this.instansi = response.data.data.instansi
                    this.no_hp = response.data.data.no_hp
                    this.tujuan = response.data.data.tujuan
                    this.created_at = response.data.data.created_at 
                }).catch((err) => {
                    
                });
            } 
        }
    },
    computed: {
       ...mapGetters({
           isAuth: 'auth/isAuth',
           url: 'api/getUrl',
           token: 'auth/getToken',
       })
    },
    created() {
        if(!this.isAuth) {
            this.$router.push({name: 'login'})
        }
    }
}
</script>