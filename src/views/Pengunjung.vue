<template>
  <b-container fluid>
      <b-row>
        <b-col md="12 m-0 p-0">
          <video class="video-fluid w-100" v-b-modal.form-guest autoplay loop controls muted :src="video_src"></video>
          <b-modal id="form-guest" v-if="!isAuth" title="Formulir Tamu" size="lg" hide-footer scrollable>
            <b-form>
                <b-row>
                    <b-col md="8">
                        <b-form-group
                            id="nama"
                            label="Isikan nama anda"
                            label-for="form_nama"
                            :invalid-feedback="invalid_name"
                            :valid-feedback="valid_name"
                            :state="nama_state">
                                <b-form-input 
                                    id="form_nama" 
                                    type="text" 
                                    v-model="nama" 
                                    :state="nama_state" 
                                    trim>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    <b-col md="4">
                        <b-form-group
                            id="umur"
                            label="Isikan umur anda"
                            label-for="form_umur"
                            :invalid-feedback="invalid_umur"
                            :valid-feedback="valid_umur"
                            :state="umur_state">
                            <b-form-input id="form_umur" type="number" v-model="umur" :state="umur_state"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <p>Alamat</p>
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
                <b-form-group 
                    id="instansi"
                    label="Instansi"
                    label-for="form_instansi">
                    <b-form-input type="text" id="form_instansi" v-model="instansi"></b-form-input>
                </b-form-group>
                <b-form-group
                    id="no_hp"
                    label="Nomor Handphone"
                    label-for="form_no_hp">
                    <b-form-input type="text" id="form_no_hp" v-model="no_hp"></b-form-input>
                </b-form-group>
                <b-form-group
                    id="tujuan"
                    label="Tujuan Bertamu"
                    label-for="form_tujuan">
                    <b-form-textarea id="form_tujuan" v-model="tujuan" rows="4" max-rows="7"></b-form-textarea>
                </b-form-group>
                <b-form-group label="Gender">
                    <b-form-radio v-model="gender" name="genderku" value="Laki - Laki">Laki - Laki</b-form-radio>
                    <b-form-radio v-model="gender" name="genderku" value="Perempuan">Perempuan</b-form-radio>
                </b-form-group>
                <p>Tanda Tangan</p>
                <VueSignaturePad 
                 :options="{onBegin, onEnd}" 
                 width="100%" 
                 height="200px" 
                 ref="signaturePad"
                 v-model="signature"
                 saveType="image/png"/>
                
                <b-button-group class="mb-3">
                    <b-button variant="danger" @click="onUndo">Undo</b-button>
                    <b-button variant="danger" @click="onClear">Clear</b-button>
                </b-button-group>
            
                <b-button variant="primary" @click="guestSubmit" class="px-5 w-100">Daftar</b-button>
            </b-form>
          </b-modal>
          <b-container>
            <b-row>
              <b-col md="12" v-if="isAuth">
                <h1>Dashboard</h1>
                <b-table style="font-size: .75rem" striped hover :fields="tamufields" :items="tamu"></b-table>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src

import {mapGetters} from 'vuex';
export default {
  name: 'home',
  data() {
    return {
      video_show: false,
      video_src: "",
      tamu: [],
      nama: "", 
      umur: "",
      instansi: "",
      no_hp: "",
      signature: "",
      tujuan: "",
      myVideo: "",
      gender: "",
      select_provinsi: null,
      select_kabupaten: null,
      select_kecamatan: null,
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
      tamufields: [
        {
          key: 'nama',
          label: 'Nama',
          sortable: false,
        }, {
            key: 'jenis_kelamin',
            label: 'Gender',
            sortable: false,
        }, {
            key: 'alamat',
            label: 'Alamat',
            sortable: false
        }, {
            key: 'no_hp',
            label: 'Nomer Handphone',
            sortable: false
        }, {
            key: 'instansi',
            label: 'Instansi',
            sortable: false,
        }, {
            key: 'tujuan',
            label: 'Tujuan bertamu',
            sortable: false
        }
      ],
    }
  },
  computed:{
    ...mapGetters({
      isAuth: 'auth/isAuth',
      url: 'api/getUrl',
      token: 'auth/getToken',
      user: 'auth/getUser',
    }),
    nama_state() {
        return this.nama.length >= 4 ? true : false
    },
    invalid_name() {
        if(this.nama.length > 4 || this.nama.length === 0) {
            return ''
        } else {
            return 'Minimal 4 Karakter'
        }
    },
    valid_name() {
        return this.nama_state === true ? 'Berhasil' : ''
    },
    umur_state() {
        return this.umur > 10 ? true : false
    },
    invalid_umur() {
        if(this.umur <= 10 && this.umur !== '') {
            return 'Anda masih dibawah umur'
        } else {
            return ''
        }
    },
    valid_umur() {
        return this.umur_state === true ? 'Berhasil' : ''
    }
  },
  created() {
    if(this.isAuth) {
        this.ambilTamu(); 
    }
    this.dataProvinsi()
    this.previewActive()
  },
  methods: {
    ambilTamu() {
      this.$http.get(`${this.url}tamu` ,{
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      }).then((response) => {
        this.tamu = response.data.data
      });
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
    onBegin() {
        this.$refs.signaturePad.resizeCanvas()
    },
    onEnd() {
    },
    onClear() {
        this.$refs.signaturePad.clearSignature();
    },
    onUndo() {
        this.$refs.signaturePad.undoSignature();
    },
    guestSubmit() {
        const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
        console.log(data);
        return false;
        this.$refs.signaturePad.toData();
        this.$refs.signaturePad.fromDataURL(data, {penColor: 'black'}, this.onBegin());
        


        if(isEmpty === false) {
                this.$http.post(`${this.url}tamu`, {
                nama: this.nama,
                jenis_kelamin: this.gender,
                umur: this.umur,
                province_id: this.select_provinsi,
                city_id: this.select_kabupaten,
                district_id: this.select_kecamatan,
                instansi: this.instansi,
                no_hp: this.no_hp,
                tujuan: this.tujuan,
                gambar: data
            }, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            }).then((response) => {
                if(response.data.success === true) {
                    alert('Terimakasih')
                    this.$router.push({name: 'pegawai'})
                } else {
                    alert('Gagal')
                }
            })
        } else {
            alert('Tanda tangan dulu');
        }

    }, 
    previewActive() {
        let reader = new FileReader()
        this.$http.get(`${this.url}video/active`).then((response) => {
            console.log(response.data.data.video_name)
            const myVideo = response.data.data.video_name
            this.video_src = `http://localhost/buku_tamu/public/uploads/video/${myVideo}`
        })
    }
},
}

</script>
