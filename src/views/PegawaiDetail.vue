<template>
    <b-container>
        <h3>Tamu dengan nama {{ name }}</h3>
        <b-row>
            <b-col>
                <p class="font-weight-bold">Nama <span class="font-weight-normal">{{ name }}</span></p>
                <p class="font-weight-bold">Nip <span class="font-weight-normal">{{ nip }}</span></p>
                <p class="font-weight-bold">Jabatan <span class="font-weight-normal">{{ jabatan }}</span></p>
                <p class="font-weight-bold">gambar <span class="font-weight-normal">{{ gambar }}</span></p>
                <p class="font-weight-bold">Gender <span class="font-weight-normal">{{ gender }}</span></p>
                
                <p class="font-weight-bold">kelahiran <span class="font-weight-normal">{{ kelahiran }}</span></p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      name: "",
      nip: "",
      jabatan: "",
      gambar: "",
      gender: "",
      kelahiran: ""
    }
  },
  computed: {
    ...mapGetters({
      isAuth: 'auth/isAuth',
      url: 'api/getUrl',
      token: 'auth/getToken',
    })
  },
  watch: {
    "$route.params.id" : {
      deep: true,
      immediate: true,
      handler: function(value) {
        this.$http.get(`${this.url}pegawai/${value}`).then((response) => {
          console.log(response)
          if(response.data.success === true) {
            this.name = response.data.data.nama
            this.nip = response.data.data.nip
            this.jabatan = response.data.data.jabatan
            this.gambar = response.data.data.gambar
            this.gender = response.data.data.jenis_kelamin
            this.kelahiran = response.data.data.kelahiran
          }
        })
      }  
    }
  }    
}
</script>