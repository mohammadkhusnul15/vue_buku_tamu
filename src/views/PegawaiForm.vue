<template>
    <b-container>
        <b-row>
            <b-col md="12">
                <h3 class="mt-4">Pegawai Form</h3>
                <b-form>
                    <div class="text-left">
                    <b-form-group
                        label="Nama"
                        label-for="form_nama">
                        <b-form-input type="text" v-model="nama" id="form_nama"></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Nip"
                        label-for="form_nip">
                        <b-form-input type="text" v-model="nip" id="form_nip"></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Jabatan"
                        label-for="form_jabatan">
                        <b-form-input type="text" v-model="jabatan" id="form_jabatan"></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Username"
                        label-for="form_username">
                        <b-form-input type="text" v-model="username" id="form_username"></b-form-input>
                    </b-form-group>
                    <label for="gambar">Upload Gambar</label>
                    <input type="file" id="file" ref="file" v-on:change="handleFile()">
                    <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
                    <b-form-group
                        label="Tanggal lahir"
                        class="mt-3"                        
                        label-for="form_date">
                        <b-form-input 
                            type="date"
                            id="form_date"
                            v-model="tgl_lahir"></b-form-input>
                    </b-form-group>
                    <b-form-group v-if="!isEdit"
                        label="Password"
                        label-for="form_password">
                        <b-form-input type="password" v-model="password" id="form_password"></b-form-input>
                    </b-form-group>
                    <b-form-group 
                        id="provinsi"
                        label="Provinsi"
                        label-for="form_prov">
                        <b-form-select 
                            id="form_prov"
                            v-model="select_provinsi" 
                            :options="provinces" 
                            :plain="true"
                            class="mb-3"
                            @change="dataKabupaten(select_provinsi)">
                        </b-form-select>
                    </b-form-group>
                    <b-form-group
                        id="kabupaten"
                        label="Kabupaten / Kota"
                        label-for="form_kab">
                    <b-form-select
                        id="form_kab"
                        v-model="select_kabupaten"
                        :options="cities"
                        :plain="true"
                        class="mb-3"
                        @change="dataKecamatan(select_provinsi)">
                    </b-form-select>
                </b-form-group>
                <b-form-group
                    id="kecamatan"
                    label="Kecamatan"
                    label-for="form_kec">
                    <b-form-select
                        id="form_kec"
                        v-model="select_kecamatan"
                        :options="districts"
                        class="mb-3"
                        :plain="true">
                            <option selected value='null'>Pilih Kecamatan</option>
                    </b-form-select>
                </b-form-group>
                <b-form-group label="Gender">
                    <b-form-radio v-model="gender" name="genderku" value="Laki-Laki">Laki - Laki</b-form-radio>
                    <b-form-radio v-model="gender" name="genderku" value="Perempuan">Perempuan</b-form-radio>
                </b-form-group>
                <b-button variant="primary" class="w-100" @click="onTambah">Tambahkan</b-button>
                </div>
                </b-form>
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
            nip: "",
            jabatan: "",
            username: "",
            file: '',
            password: "",
            gender: "",
            select_provinsi: null,
            select_kabupaten: null,
            select_kecamatan: null,
            tgl_lahir: "",
            isEdit: false,
            provinces: [{
                text: 'Pilih Provinsi',
                value: null,
            }],
            cities: [{
                text: 'Pilih Kabupaten / Kota',
                value: null,
            }],
            districts: [{
                text: 'Pilih Kecamatan',
                value: null,
            }],
        }
    },
    computed: {
        ...mapGetters({
            url: 'api/getUrl',
            token: 'auth/getToken',
            isAuth: 'auth/isAuth'
        })
    }, 
    watch: {
        "$route.params.id": {
            deep: true,
            immediate: true,
            handler: function(value) {
                if(value !== undefined) {
                    this.$http.get(`${this.url}pegawai/${value}`, {
                        headers: {
                            'Authorization': `Bearer ${this.token}`
                        }
                    }).then((response) => {
                        console.log(response)
                        this.nama = response.data.data.nama
                        this.nip = response.data.data.nip
                        this.jabatan = response.data.data.jabatan
                        this.username = response.data.data.username
                        this.tgl_lahir = response.data.data.tgl_lahir
                        this.select_provinsi = response.data.data.tmpl_province_id
                        this.select_kabupaten = response.data.data.tmpl_city_id
                        this.select_kecamatan = response.data.data.tmpl_district_id
                        this.gender = response.data.data.jenis_kelamin
                    })
                    this.isEdit = true
                } else {
                    this.isEdit = false
                }
            }
        }
    },
    created() {
        if(this.isAuth) {
            this.dataProvinsi();
        } else {
            this.$router.push({name: "login"})
        }
    }, 
    methods: {
    handleFile() {
        this.file = this.$refs.file.files[0]
    },
    dataProvinsi: function() {
        this.$http.get(`${this.url}provinsi` , {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).then((response) => {
            const my_provinces = response.data.data
            my_provinces.forEach((my_province) => {
                this.provinces.push({
                    text: my_province.name,
                    value: my_province.id
                })
            });
        })
    },
    dataKabupaten: function() {
        // this.cities = []
        // this.districts = []
        if(this.isEdit === true) {
            this.$http.get(`${this.url}kabupaten/${this.select_provinsi}` , {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            }).then((response) => {
                const my_cities = response.data.data
                my_cities.forEach((my_city) => {
                    this.cities.push({
                        text: my_city.name,
                        value: my_city.id
                    })
                })
            })
        } else {
            this.cities = [{
                text: 'Pilih Kabupaten',
                value: null
            }]
            this.districts = [{
                text: 'Pilih Kecamatan',
                value: null
            }]
            if(this.select_provinsi !== null) {
                this.$http.get(`${this.url}kabupaten/${this.select_provinsi}` , {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                }).then((response) => {
                    const my_cities = response.data.data
                    my_cities.forEach((my_city) => {
                        this.cities.push({
                            text: my_city.name,
                            value: my_city.id
                        })
                    })
                })
            } else {
                this.select_kabupaten = null
            }
        }
    }, 
    dataKecamatan: function() {
        this.$http.get(`${this.url}kecamatan/${this.select_kabupaten}` , {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).then((response) => {
            const my_ditricts = response.data.data
            my_ditricts.forEach((my_ditrict) => {
                this.districts.push({
                    text: my_ditrict.name,
                    value: my_ditrict.id,
                })
            })
        })
     },
    onTambah() {
       if(this.isEdit === true) {
           let id = this.$route.params.id
           let formData = new FormData();
            formData.append('gambar', this.file)
            formData.append('nama', this.nama)
            formData.append('nip',this.nip)
            formData.append('jabatan',this.jabatan)
            formData.append('username',this.username)
            formData.append('password',this.password)
            formData.append('jenis_kelamin',this.gender)
            formData.append('tgl_lahir',this.tgl_lahir)
            formData.append('tmpl_province_id',this.select_provinsi)
            formData.append('tmpl_city_id',this.select_kabupaten)
            formData.append('level','pegawai')
            this.$http.post(`${this.url}pegawai/${id}`, formData,{
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                console.log(response)
                if(response.data.success === true) {
                    alert('Berhasil');
                    window.location.href = '/pegawai'
                } else {
                    alert('Gagal');
                    console.log(response.data.message)
                }
            });
       } else {
            let formData = new FormData();
            formData.append('gambar', this.file)
            formData.append('nama', this.nama)
            formData.append('nip',this.nip)
            formData.append('jabatan',this.jabatan)
            formData.append('username',this.username)
            formData.append('password',this.password)
            formData.append('jenis_kelamin',this.gender)
            formData.append('tgl_lahir',this.tgl_lahir)
            formData.append('tmpl_province_id',this.select_provinsi)
            formData.append('tmpl_city_id',this.select_kabupaten)
            formData.append('level','pegawai')
            this.$http.post(`${this.url}pegawai`, formData,{
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                console.log(response)
                if(response.data.success === true) {
                    alert('Berhasil');
                    window.location.href = '/pegawai'
                } else {
                    alert('Gagal');
                    console.log(response.data.message)
                }
            });
       }
    },
    },
}
</script>