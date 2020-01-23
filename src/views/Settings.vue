<template>
    <b-container>
        <b-row>
            <b-col md="12" class="pt-4">
                <h2>User</h2>
                <b-row class="text-left">
                    <b-col md="4">
                        <b-img-lazy :src="`http://localhost/buku_tamu/public/uploads/pegawai/${user.gambar}`" class="w-100"></b-img-lazy>
                    </b-col>
                    <b-col md="4">
                        <p class="font-weight-bold">Nama <span class="font-weight-normal">{{ user.nama }}</span></p>
                    </b-col>
                    <b-col md="4">
                        <p class="font-weight-bold">Nip <span class="font-weight-normal">{{ user.nip }}</span></p>
                    </b-col>
                </b-row>
                <b-row class="text-left">
                    <b-col md="4">
                        <p class="font-weight-bold">Jabatan <span class="font-weight-normal">{{ user.jabatan }}</span></p>
                    </b-col>                    
                    <b-col md="4">
                        <p class="font-weight-bold">Username <span class="font-weight-normal">{{ user.username }}</span></p>
                    </b-col>
                    <b-col md="4">
                        <p class="font-weight-bold">Gender <span class="font-weight-normal">{{ user.jenis_kelamin }}</span></p>
                    </b-col>
                </b-row>
                <b-row class="text-left">
                    <b-col md="4">
                        <p class="font-weight-bold">Tanggal Lahir <span class="font-weight-normal">{{ user.tgl_lahir }}</span></p>
                    </b-col>
                    <b-col md="4">
                        <p class="font-weight-bold">Tempat Lahir <span class="font-weight-normal">{{ user.kelahiran }}</span></p>
                    </b-col>
                </b-row>
                <div class="text-left">
                    <div class="text-center">
                        <b-button-group class="my-4">
                            <b-button variant="success" class="btn-sm" v-b-modal.form_user>Edit</b-button>
                            <b-button variant="success" class="btn-sm" v-b-modal.form_reset>Change Password</b-button>
                        </b-button-group>
                    </div>

                    <b-button class="d-block w-100" variant="primary" :to="{name: 'video'}">Management Video</b-button>

                    <b-modal id="form_reset" title="Reset your password" hide-footer size="lg" scrollable>
                        <b-form>
                            <div class="text-left">
                                <b-form-group
                                    label="Your Password"
                                    label-for="my_password">
                                    <b-form-input id="my_password" type="password" v-model="my_password"></b-form-input>    
                                </b-form-group>
                                <b-form-group
                                    label="New Password"
                                    label-for="new_password">
                                    <b-form-input id="new_password" type="password" v-model="new_password"></b-form-input>    
                                </b-form-group>
                                <b-form-group
                                    label="Confirm New Password"
                                    label-for="knew_password">
                                    <b-form-input id="knew_password" type="password" v-model="knew_password"></b-form-input>    
                                </b-form-group>
                                <b-button variant="primary" class="w-100" @click="changePas">Ganti</b-button>
                                <b-button variant="primary" class="w-100 mt-3" @click="reset">Reset</b-button>
                            </div>
                        </b-form>
                    </b-modal>
                    <b-modal id="form_user" title="Form User" size="lg" hide-footer scrollable>
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
                            <b-form-radio v-model="jenis_kelamin" value="Laki-Laki">Laki - Laki</b-form-radio>
                            <b-form-radio v-model="jenis_kelamin" value="Perempuan">Perempuan</b-form-radio>
                        </b-form-group>
                        <b-button variant="primary" class="w-100" @click="onTambah">Ganti</b-button>
                        </div>
                        </b-form>
                    </b-modal>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return {
            nama: "",
            nip: "",
            jabatan: "",
            username: "",
            gender: "",
            jenis_kelamin: "",
            tgl_lahir: "",
            file: "",
            select_provinsi: null,
            select_kabupaten: null,
            select_kecamatan: null,
            date: "",
            my_password: "",
            new_password: "",
            knew_password: "",
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
            isAuth: 'auth/isAuth',
            url: 'api/getUrl',
            token: 'auth/getToken',
            user: 'auth/getUser',
        })
    },
    created() {
        console.log(this.user)
        if(this.isAuth) {
            this.dataProvinsi();
        } else {
            this.$router.push({name: "login"})
        }
        this.dataUser()
    },
    methods: {
    ...mapMutations("auth", ["set_user", "set_token"]),
    dataUser() {
        this.$http.get(`${this.url}user`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).then((response) => {
            console.log(response)
            if(response.data.success === true) {
                this.nama = response.data.data.nama
                this.nip = response.data.data.nip
                this.jabatan = response.data.data.jabatan
                this.username = response.data.data.username
                this.file = response.data.data.file
                this.tgl_lahir = response.data.data.tgl_lahir
                this.select_provinsi = response.data.data.tmpl_province_id
                this.select_kabupaten = response.data.data.tmpl_city_id
                this.select_kabupaten = response.data.data.tmpl_district_id
                this.jenis_kelamin = response.data.data.jenis_kelamin
            }
        })
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
                console.log(response)
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
         let formData = new FormData();
         formData.append('nama', this.nama);
         formData.append('nip', this.nip);
         formData.append('jabatan', this.jabatan)
         formData.append('username', this.username)
         formData.append('gambar', this.file)
         formData.append('tgl_lahir', this.tgl_lahir)
         formData.append('tmpl_province_id', this.select_provinsi)
         formData.append('tmpl_city_id', this.select_kabupaten)
         formData.append('tmpl_district_id', this.select_kecamatan)
         formData.append('jenis_kelamin', this.jenis_kelamin)
         this.$http.post(`${this.url}user/edit`, formData, {
             headers: {
                 'Authorization': `Bearer ${this.token}`,
                 'Content-Type': 'multipart/form-data'
             }
         }).then((response) => {
             console.log(response)
             if(response.data.success === false) {
                 console.log(response.data.message)
             } else {
                 set_user(null)
                 set_user(formData)
                 set_token(this.token)
             }
         })
     },
     handleFile() {
        this.file = this.$refs.file.files[0]
     },
     changePas(){
            if(this.new_password === this.knew_password) {
            this.$http.post(`${this.url}user/password/edit`, {
                new_password: this.new_password,
                old_password: this.my_password,
            }, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            }).then((response) => {
                if(response.data.success === true) {
                    alert('Berhasil')
                } else {
                    console.log(response.data.message)
                }
            })
        } else {
            alert('konfirmasi password salah')
        }
     },
     reset() {
         this.$http.get(`${this.url}user/password/reset`, {
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