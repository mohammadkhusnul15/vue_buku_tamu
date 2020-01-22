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
                    <b-form-group
                        label="Upload Foto"
                        label-for="form_upload">
                        <b-form-file
                            id="form_upload"
                            v-model="gambar"
                            :state="Boolean(gambar)"
                            placeholder="Choose a file or drop it here..."
                            drop-placeholder="Drop file here...">
                        </b-form-file>
                    </b-form-group>
                    <div class="mt-3">Selected file: {{ gambar ? gambar.name : '' }}</div>
                    <b-form-group
                        label="Tanggal lahir"
                        class="mt-3"                        
                        label-for="form_date">
                        <b-form-input 
                            type="date"
                            id="form_date"
                            v-model="date"></b-form-input>
                    </b-form-group>
                    <b-form-group
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
                    <b-form-radio v-model="gender" name="genderku" value="Laki - Laki">Laki - Laki</b-form-radio>
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
            gambar: null,
            password: "",
            gender: "",
            select_provinsi: null,
            select_kabupaten: null,
            select_kecamatan: null,
            date: "",
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
    created() {
        if(this.isAuth) {
            this.dataProvinsi();
        } else {
            this.$router.push({name: "login"})
        }
    }, 
    methods: {
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
        this.$http.post(`${this.url}pegawai`, {
            name: this.name,
            nip: this.nip,
            jabatan: this.jabatan,
            username: this.username,
            gambar: this.gambar,
            password: this.password,
            jenis_kelamin: this.gender,
            tmpl_province_id: this.select_provinsi,
            tmpl_city_id: this.select_kabupaten,
            tmpl_district_id: this.select_kecamatan,
            level: "Pegawai",
        },{
            headers: {
                'Authorization': `Bearer ${this.token}`
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
}
</script>