<template>
    <b-container class="pt-4">
        <h3>Data Pengunjung</h3>
        <b-button-group class="mb-4 mt-2">
            <b-button variant="primary" @click="all">Semua pengunjung</b-button>
            <b-button variant="primary" @click="today">Pengunjung hari ini</b-button>
        </b-button-group>
        <b-row>
            <b-col md="12">
                <b-table striped hover :fields="guests" :items="guest">
                    <template v-slot:cell(aksi)="row">
                        <b-button variant="success" class="btn-sm mx-1" :to="{name: 'detailTamu', params: {id: row.item.id}}">Lihat</b-button>
                        <b-button variant="danger" class="btn-sm mx-1" @click="hapus(row.item.id)">Hapus</b-button>
                    </template>
                </b-table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            guest: [],
            guests: [{
                key: 'nama',
                label: 'Nama',
                sortable: false
            }, {
                key: 'instansi',
                label: 'Asal Instansi',
                sortable: false,
            }, {
                key: 'no_hp',
                label: 'Nomor hp',
                sortable: false,
            }, {
                key: 'aksi',
                label: 'Aksi',
                sortable: false,
            }]
        }
    },
    computed: {
        ...mapGetters({
            url: 'api/getUrl',
            token: 'auth/getToken',
            isAuth: 'auth/isAuth'
        })
    },
    created() {
        if(this.isAuth) {
            this.dataTamu()
        } else {
            this.$router.push({name: 'login'})
        }
    },
    methods: {
        dataTamu() {
            this.$http.get(`${this.url}tamu`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            }).then((response) => {
                this.guest = response.data.data
            })
        },
        all() {
            this.guest = null
            this.$http.get(`${this.url}tamu`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            }).then((response) => {
                this.guest = response.data.data
            })
        }, 
        today() {
            this.guest = null
            this.$http.get(`${this.url}tamu/today`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            }).then((response) => {
                this.guest = response.data.data
            })
        },
        hapus(id) {
            confirm('Yakin mau dihapus ?');
            this.$http.delete(`${this.url}tamu/${id}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            }).then((response) => {
                if(response.data.success === true) {
                    alert('berhasil dihapus')
                    window.location.href = '/tamu'
                } else {
                    alert('gagal dihapus')
                    window.location.href = '/tamu'
                }
            })
        }
    }
}
</script>

