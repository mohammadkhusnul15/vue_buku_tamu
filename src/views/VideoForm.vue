<template>
    <b-container>
        <b-row>
            <b-col md="12" class="pt-4">
                <h2>Form Video</h2>
                <b-form>
                    <label for="file">Upload Video</label>
                    <input type="file" id="file" ref="file" @change="handleFile">
                </b-form>
                <b-button variant="primary" class="w-100" @click="onVideo">Simpan</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            file: "",
            video_src: "",
            isEdit: false,
        }
    }, 
    computed: {
        ...mapGetters({
            isAuth: 'auth/isAuth',
            url: 'api/getUrl',
            token: 'auth/getToken'
        })
    },
    watch: {
        "$route.params.id": {
            deep: true,
            immediate: true,
            handler: function(value) {
                if(value !== undefined) {
                    this.isEdit = true
                    console.log('ini edit data')
                } else {
                    this.isEdit = false
                    console.log('ini tambah data')
                }
            }
        }
    },
    methods: {
        handleFile() {
            this.file = this.$refs.file.files[0]
        },
        onVideo() {
            if(this.isEdit === true) {
                let id = this.$route.params.id
                console.log(id)
                let formData = new FormData()
                formData.append('video', this.file)
                this.$http.post(`${this.url}video/${id}`, formData, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((response) => {
                    console.log(response)
                    if(response.data.success === true) {
                        alert('Berhasil')
                    } else {
                        alert('Gagal')
                        console.log(response.data.message)
                    }
                })
            } else {
                let formData = new FormData()
                formData.append('video', this.file)
                this.$http.post(`${this.url}video`, formData,{
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((response) => {
                    console.log(response)
                    if(response.data.success === true) {
                        alert('Berhasil')
                    } else {
                        alert('Gagal')
                        console.log(response.data.message)
                    }
                })
            }
        }
    }
}
</script>