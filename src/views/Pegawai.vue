<template>
    <b-container>
        <h2>Terimakasih atas kunjungan anda</h2>
        <h4>List pegawai inagata</h4>
        <b-button v-if="isAuth" variant="success" class="my-2" :to="{name: 'pegawaiAdd'}">Tambah Pegawai</b-button>
        <b-row>
            <b-col md="12">
                <b-table striped hover :fields="engineers" :items="engineer">
                    <template v-slot:cell(aksi)="row">
                        <b-button variant="success" class="btn-sm" v-if="!isAuth" :to="{name: 'pegawaiDetail', params: {id: row.item.id}}">Lihat</b-button>
                        <b-button variant="success" class="btn-sm" v-if="isAuth">Ubah</b-button>
                        <b-button variant="danger" class="btn-sm"  v-if="isAuth" @click="hapus(row.item.id)">Hapus</b-button>
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
            engineer: [],
            engineers: [
                {
                key: 'nama',
                label: 'Nama',
                sortable: false,
            }, {
                key: 'nip',
                label: 'NIP',
                sortable: false,
            }, {
                key: 'jabatan',
                label: 'Jabatan',
                sortable: false,
            }, {
                key: 'jenis_kelamin',
                label: 'Gender',
                sortable: false,
            }, {
                key: 'kelahiran',
                label: 'Tempat tanggal lahir',
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
            isAuth: 'auth/isAuth',
            token: 'auth/getToken',
            url: 'api/getUrl'
        })
    },
    created() {
        this.dataPegawai()
    },
    methods: {
        dataPegawai() {
            this.$http.get(`${this.url}pegawai`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            }).then((response) => {
                if(response.data.success === true) {
                    this.engineer = response.data.data
                }
            })
        },
        hapus(id) {
            confirm('Yakin mau dihapus') 
            this.$http.delete(`${this.url}tamu/${id}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }        
            }).then((response) => {
                if(response.data.success === true) {
                    alert('berhasil dihapus')
                    console.log(response)
                } else {
                    alert('Gagal dihapus')
                    console.log(response.data.message)
                }
            })
        
        }
    }
}
</script>