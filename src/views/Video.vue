<template>
    <b-container fluid>
        <h2>Management Video</h2>
        <b-button variant="primary" class="px-5 my-4" :to="{name: 'videoAdd'}">Tambah Video</b-button>
        <b-row>
            <b-col md="12">
                <b-table striped hover :fields="videos" :items="video">
                    <template v-slot:cell(video_name)="row">
                        <video class="video-fluid" style="height: 100px" v-b-modal.form-guest autoplay loop controls muted>
                            <source :src="`http://localhost/buku_tamu/public/uploads/video/${row.item.video_name}`" type="video/mp4"/>
                        </video>
                    </template>
                    <template v-slot:cell(aksi)="row">
                        <b-button-group>
                            <b-button variant="success" :to="{nam: 'videoEdit', params: {id: row.item.id}}">Ganti</b-button>
                            <b-button variant="danger" @click="hapus(row.item.id)">Hapus</b-button>
                            <b-button variant="primary" @click="active(row.item.id)">Aktifkan</b-button>
                        </b-button-group>
                    </template>
                </b-table>
            </b-col>
        </b-row>
    </b-container>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            video: 'http://localhost/buku_tamu/public/uploads/video/1579388560-Ninno.mp4',
            file: '',
            video: [],
            videos: [{
                key: 'video_name',
                label: 'Preview Video',
                sortable: false,
            }, {
                key: 'active',
                label: 'Active',
                sortable: false,
            },{
                key: 'aksi',
                label: 'Aksi',
                sortable: false,
            }]
        }
    },
    computed: {
        ...mapGetters({
            isAuth: 'auth/isAuth',
            url: 'api/getUrl',
            token: 'auth/getToken'
        })
    }, 
    created() {
        if(this.isAuth) {
            this.dataVideo()
        } else {
            this.$router.push({name: 'login'})
        }
    },
    methods: {
        handleFile() {
            this.file = this.$refs.file.files[0]
        }, 
        dataVideo() {
            this.$http.get(`${this.url}video`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            }).then((response) => {
                console.log(response)
                this.video = response.data.data
            })
        },
        hapus(id) {
            confirm('Yakin dihapus ?')
            this.$http.delete(`${this.url}video/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            }).then((response) => {
                if(response.data.success === true) {
                    console.log(response)
                    alert('Berhasil')
                } else {
                    alert('Gagal')
                    console.log(response)
                }
            })
        }, 
        active(id) {
            this.$http.get(`${this.url}video/active/${id}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            }).then((response) => {
                console.log(response)
            })
        }
    }
}
</script>